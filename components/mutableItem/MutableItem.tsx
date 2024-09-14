import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import { useItemCtx } from '@/hooks/contexts/useItemCtx';
import { DrawingItem, ImageItem, StickerItem } from '@/customTypes/itemTypes';
import Feather from '@expo/vector-icons/Feather';
import ViewModifyImageToolbox from '../views/viewModifyImageToolbox';
interface Props {
    item: ImageItem | StickerItem | DrawingItem;
}

const MutableItem = ({ item }: Props) => {
    const { setActiveItemCtx, activeItemCtx, deleteItems, addPendingChanges, bringToFront, frontItem, setFrontItem } = useItemCtx();
    const [ tapCount, setTapCount ] = useState<number>(0);
    const [tapCoordinates, setTapCoordinates] = useState<{x: number, y: number}>({x: 0, y: 0});

    // positionX, positionY, scale, rotation all related to how you can mutate an item, and all of which will be saved as pending changes, at which point upon useRouter screen change to another screen, it will take effect to execute those changes
    // the allows the ctx of the item/image/sticker/drawing to retain the new translateY, translateX, rotation, height and width values without mutating the item while mutating in real time since it crashes.
    const positionX = useSharedValue(item.translateX);
    const positionY = useSharedValue(item.translateY);
    const savedPositionX = useSharedValue(item.translateX);
    const savedPositionY = useSharedValue(item.translateY);
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const rotation = useSharedValue(item.rotation);
    const savedRotation = useSharedValue(item.rotation);
    // state value which saves each mutatable value (this is defaulted to the useRefs and set in the updateTransformState which occurs on end of the gestures using runOnJS(updateTransformState)() which prevents crashing)
    const [transformState, setTransformState] = useState<{
        positionX: number,
        positionY: number,
        rotation: number,
        scale: number,
      }>({
        positionX: item.translateX,
        positionY: item.translateY,
        rotation: rotation.value,
        scale: scale.value,
      });

    const updateTransformState = () => {
        setTransformState({
        positionX: positionX.value,
        positionY: positionY.value,
        rotation: rotation.value,
        scale: scale.value,
        });
    };

    // syncs the transform state with pending changes for this item in context when the state changes
    useEffect(() => {
        addPendingChanges(
        item.id,
        {
            positionX: transformState.positionX,
            positionY: transformState.positionY,
            rotation: transformState.rotation,
            scale: transformState.scale
        });
    }, [transformState]);

    // this value will update after switch statement checks which itemType and will be THAT item type
    let activeItemCast: ImageItem | StickerItem | DrawingItem | undefined = activeItemCtx;
    let frontItemCast: ImageItem | StickerItem | DrawingItem | undefined = frontItem;
    let itemCast: ImageItem | StickerItem | DrawingItem = item;

    // if there is a frontItem set, and it is not THIS current item, then reset the tapCounter so that it doesn't store the memory of how many even though another item has been brought to front
    useEffect(() => {
        if (frontItem != undefined) {
            if ( frontItem.id != item.id ) {
                setTapCount(0);
            }
        }
    }, [activeItemCtx, frontItem]) // has to keep checking if frontItem has been set, and active image for updating styling

    // sets the casted versions of item coming in and items in ctx as their respective item types
    switch (item.type) {
        case 'image':
            itemCast = item as ImageItem;
            if (frontItem) {
                frontItemCast = frontItem as ImageItem;
            }
            if (activeItemCtx) {
                activeItemCast = activeItemCtx as ImageItem;
            }
            break;
        case 'sticker':
            itemCast = item as StickerItem;
            if (frontItem) {
                frontItemCast = frontItem as StickerItem;
            }
            if (activeItemCtx) {
                activeItemCast = activeItemCtx as StickerItem;
            }
            break;
        case 'drawing':
            itemCast = item as DrawingItem;
            if (frontItem) {
                frontItemCast = frontItem as DrawingItem;
            }
            if (activeItemCtx) {
                activeItemCast = activeItemCtx as DrawingItem;
            }
            break;
    }

    const panGesture = Gesture.Pan() // drag item
    .onUpdate((event) => {
        positionX.value = event.translationX + savedPositionX.value;
        positionY.value = event.translationY + savedPositionY.value;
    })
    .onEnd(() => {
        savedPositionX.value = positionX.value;
        savedPositionY.value = positionY.value;
        runOnJS(updateTransformState)(); // sync the new position with the state
    });

    const pinchGesture = Gesture.Pinch() // scale item
        .onUpdate((event) => {
            scale.value = savedScale.value * event.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
            runOnJS(updateTransformState)();
        });

    const rotationGesture = Gesture.Rotation() // rotate item
        .onUpdate((event) => {
            rotation.value = savedRotation.value + event.rotation;
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
            runOnJS(updateTransformState)();
        });

        const animatedStyle = useAnimatedStyle(() => { // animates item based on gesure changes which effect useRef
            return {
                transform: [
                    { translateX: positionX.value },
                    { translateY: positionY.value },
                    { rotateZ: `${rotation.value}rad` },
                    { scale: scale.value }
                ],
            };
        });

        const trashIconAnimated = useAnimatedStyle(() => {
            return {
                transform: [
                    { rotateZ: `${-rotation.value}rad` },  // invert the rotation to prevent trashcan icon from rotating with image (like a counter balance)
                    { scale: 1 / scale.value }  // invert the scale
                ],
            };
        });

        const toolBoxAnimated = useAnimatedStyle(() => {
            return {
                transform: [
                    { translateX: tapCoordinates.x },
                    { translateY: tapCoordinates.y },
                    { rotateZ: `${-rotation.value}rad` },  // invert the rotation to prevent trashcan icon from rotating with image (like a counter balance)
                    { scale: 1 / scale.value }  // invert the scale
                ],
            };
        });

    
    const handleOnTap = (evt: GestureResponderEvent) => {
        if (tapCount == 0 && frontItem == undefined) { // if this item is already in the foreground but user clicks it again, they want to activate it
            setActiveItemCtx(item);
        }
        if (tapCount == 0) { // in ctx, frontItem is set to this item - which since useEffect array contains frontItemCtx, this item will now have highest zIndex // CHECK THAT ACTIVE IMAGE IS ALSO CONSIDERED IN BRINGTOFRONT

            setTapCount(1);
            bringToFront(item.id, item.type);

        } else if (tapCount == 1) { // now item is in foreground and user wishes to activate it

            setTapCount(2);

            const { locationX, locationY } = evt.nativeEvent; // get coordinates to track where on image user tapped for purposes of toolbox
            console.log("location xy" , locationX, locationY)
            
            setTapCoordinates({x: locationX, y: locationY}); // whereever the user tapped, assign the toolbox to show up here IF IMAGE
            setActiveItemCtx(item);

        } else if (tapCount == 2) { // the user is deactivating, or selecting it but not selecting another image // CONSIDER THIS TO OCCUR WHEN USER CLICKS OFF OF THE IAMGE ANYWHERE AS WELL?

            setTapCoordinates({x: 0, y: 0});
            setActiveItemCtx(undefined);
            setFrontItem(undefined);
            setTapCount(0);
        }
    }

    return (
        <GestureDetector gesture={Gesture.Simultaneous(rotationGesture, pinchGesture, panGesture)}>
            <Animated.View
                style={[styles.itemContainer, { 
                    width: item.width, 
                    height: item.height, 
                    zIndex: item.zIndex }, 
                    animatedStyle]}
                >
                {/* trash icon to remove item from editor icon */}
                {activeItemCtx && activeItemCtx.id == item.id && // if there is an active image currently and the current item's id matches the activeItem's id
                <View >
                    <View style={[styles.trash, {left: - 15 + item.width, bottom: item.height * -1 - 10}]}>
                        <TouchableOpacity onPress={() => {deleteItems(item.id, item.type)}}>
                        <Animated.View style={trashIconAnimated}>
                            <Feather name={'trash'} size={30} color={'#ff0847'} style={styles.editingIcon}/>
                        </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
                }
                {/* Tapping item */}
                <TouchableOpacity onPress={handleOnTap} activeOpacity={.9} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={{zIndex: item.zIndex}}>
                    <Image
                        source={{ uri: item.imageInfo.uri }}
                        style={[{
                            width: item.width,
                            height: item.height,
                            zIndex: item.zIndex,
                        }, activeItemCast?.imageInfo.uri == item.imageInfo.uri && styles.itemSelected,]} // checking the casted ImageItem which is active in ctx against the current image
                    />
                </TouchableOpacity>

                {/* little popup toolbox for editing options on a specific image only appears for images */}
                {item.type == 'image' && activeItemCtx?.imageInfo.uri == item.imageInfo.uri ? (
                    item && tapCoordinates.x > 0 && tapCoordinates.y > 0 &&
                    <Animated.View style={toolBoxAnimated}>
                        <ViewModifyImageToolbox/>
                    </Animated.View>
                ) : (<></>)}
            </Animated.View>
        </GestureDetector>
    );
};

export default MutableItem;

const styles = StyleSheet.create({
    itemContainer: {
      position: 'absolute',
    },
    closeContainer: {
        position: 'absolute',
        zIndex: 5,
    },
    editingIcon: {
        backgroundColor: 'white',
        borderRadius: 30,
        overflow: 'hidden',
    },
    image: {
        position: 'absolute',
        flexDirection: 'column',
    },
    itemSelected: {
        borderWidth: 2, borderColor: '#ff0847',
        zIndex: 999,
    },
    trash: {
        position: 'absolute',
        zIndex: 9999999999999999999999999999999,
    }
  });