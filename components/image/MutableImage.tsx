import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import useDragPanResponder from './useDragPanResponder';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ViewModifyImageToolbox from '../views/viewModifyImageToolbox';
import { useItemCtx } from '@/hooks/contexts/useItemCtx';
import { ImageItem } from '@/customTypes/itemTypes';

interface MutablbleImageProps {
    image: ImageItem;
}

// Represents an image with complex capabilities such as draggable, rotatable, etc... (actual ImageItem is an attribute).
// Uses panResponder to evaluate x and y movement coordinates.
const MutableImage = ({ image }: MutablbleImageProps) => {

    // quick note on active item. Active item can be sticker, drawing or an image. Whichever at the root level of each sticker, image, etc... if tapped, then it is the new activated
    // item, which now everything is using context and will check for state updates with useEffect to keep up with which item is active
    const { setActiveItemCtx, activeItemCtx, deleteItems } = useItemCtx(); // to track and update the currently active image to avoid props drilling to the modify image
    let activeImageCast = activeItemCtx as ImageItem; // cast item as ImageItem so it's drillable for checking parts of ImageItem specifically since item could be other item types

    const [tapCoordinates, setTapCoordinates] = useState<{x: number, y: number}>({x: 0, y: 0});
    const { panHandlers, positionX, positionY  } = useDragPanResponder();

    const rotation = useSharedValue(0);
    const savedRotation = useSharedValue(0);

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const rotationGesture = Gesture.Rotation()
        .onUpdate((event) => {
            rotation.value = savedRotation.value + event.rotation;
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
        });

        const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = savedScale.value * event.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    { translateX: positionX.value },
                    { translateY: positionY.value },
                    { rotateZ: `${rotation.value}rad` },
                    { scale: scale.value }
                ],
            };
        });

    useEffect(() => {
        activeImageCast = activeItemCtx as ImageItem;
    }, [activeItemCtx])

    // when user taps image, it gets coordniates for location to display image modification toolbox.
    // checks if the image tapped was already active, if so, deactivates it, otherwise activates it including setting it as the new "activeImage" in ctx
    const handleTap = (event: GestureResponderEvent) => {

        const { locationX, locationY } = event.nativeEvent;
        setTapCoordinates({x: locationX, y: locationY});

        if (image.imageInfo.uri == activeImageCast?.imageInfo.uri) {
            setTapCoordinates({x: 0, y: 0});
            setActiveItemCtx(undefined);
        } else {
            setActiveItemCtx(image); // ctx
        }
    }

    return (
        <GestureDetector gesture={Gesture.Simultaneous(rotationGesture, pinchGesture)}>
            <Animated.View 
                style={[styles.imageContainer, { width: image.width, height: image.height, top: image.top, left: image.left }, animatedStyle]}
                {...panHandlers} // Apply PanResponder only when the image is not active
            >
                {activeItemCtx && activeImageCast.imageInfo.uri == image.imageInfo.uri &&
                <View >
                    <View style={{position: 'absolute', top: - 10, left: - 10 + image.width}}>
                        <TouchableOpacity onPress={() => {deleteItems({id: image.id, itemType: 'image'})}}> 
                            <Fontisto name={'close'} size={40} color={'#c0b9ac'} style={styles.editingIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
                }
                <TouchableOpacity onPress={handleTap} activeOpacity={.9} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                    <Image
                        source={{ uri: image.imageInfo.uri }}
                        style={[{
                            width: image.width,
                            height: image.height,
                        }, activeImageCast?.imageInfo.uri == image.imageInfo.uri && styles.imageSelected,]} // checking the casted ImageItem which is active in ctx against the current image
                    />
                </TouchableOpacity>

                {/* little popup toolbox for editing options on a specific image */}
                {activeItemCtx && activeImageCast.imageInfo.uri == image.imageInfo.uri ? (
                    image && tapCoordinates.x > 0 && tapCoordinates.y > 0 && <ViewModifyImageToolbox/>
                ) : (<></>)}
            </Animated.View>
        </GestureDetector>
    );
};

export default MutableImage;

const styles = StyleSheet.create({
    imageContainer: {
      zIndex: 4,
      position: 'relative',
      borderWidth: 1, borderColor: 'green'
    },
    closeContainer: {
        position: 'absolute',
        zIndex: 5,
    },
    editingIcon: {
        backgroundColor: 'white',
        borderRadius: 100,
    },
    image: {
        position: 'absolute',
        flexDirection: 'column', // idk why but this helps with the scattering
        zIndex: 2,
    },
    imageSelected: {
        borderWidth: 2, borderColor: '#c0b9ac',
        zIndex: 4,
    },
  });