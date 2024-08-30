import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, GestureResponderEvent, Text } from 'react-native';
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
    const { setActiveItemCtx, activeItemCtx, deleteItems, bringToFront, frontItem } = useItemCtx(); // to track and update the currently active image to avoid props drilling to the modify image
    const [ tapCount, setTappedCount ] = useState<number>(0);
    let activeImageCast = activeItemCtx as ImageItem; // cast item as ImageItem so it's drillable for checking parts of ImageItem specifically since item could be other item types
    let frontImageCast = frontItem as ImageItem; // cast item as ImageItem so it's drillable for checking parts of ImageItem specifically since item could be other item types

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
        frontImageCast = frontItem as ImageItem;
        if (frontItem != undefined) {
            console.log("frontImageCast ", frontImageCast.id)
            if ( frontImageCast.id != image.id ) { // if frontItem from context was updated, but it is no the current image, that means another image was tapped, so let's not store tap count anymore for the current image
                setTappedCount(0);
            } 
        }
        
    }, [activeItemCtx, frontItem])

    // when user taps image, it gets coordniates for location to display image modification toolbox.
    // checks if the image tapped was already active, if so, deactivates it, otherwise activates it including setting it as the new "activeImage" in ctx

    // need to make it so it recognizes if another image was tapped and if so, set tapcount back to 0
    const handleTap = (event: GestureResponderEvent) => {

        if (tapCount == 0 && frontImageCast != undefined && frontImageCast.id == image.id) { // if the image is already in the foreground but user clicks it, they want to activate it
            setActiveItemCtx(image);
        }
        if (tapCount == 0) {

            console.log("first tap, bringing to front", tapCount)
            setTappedCount(1); 
            bringToFront(image.id, 'image');
            console.log("tapped image's zIndex", image.zIndex)

        }
        else if (tapCount == 1) {

            console.log("second tap, activating", tapCount)
            setTappedCount(2);

            const { locationX, locationY } = event.nativeEvent;
            setTapCoordinates({x: locationX, y: locationY});
            setActiveItemCtx(image);
        } else if (tapCount == 2) {
            if (image.imageInfo.uri == activeImageCast?.imageInfo.uri) {
                console.log("should be here, tap 3 ", tapCount)

                setTapCoordinates({x: 0, y: 0});
                setActiveItemCtx(undefined);

                setTappedCount(0);
            }
        }
        
    }

    return (
        <GestureDetector gesture={Gesture.Simultaneous(rotationGesture, pinchGesture)}>
            <Animated.View 
                style={[styles.imageContainer, { width: image.width, height: image.height, top: image.top, left: image.left, zIndex: image.zIndex }, animatedStyle]}
                {...panHandlers} // Apply PanResponder only when the image is not active
            >
                {activeItemCtx && activeImageCast.imageInfo.uri == image.imageInfo.uri &&
                <View >
                    <View style={{position: 'absolute', top: - 10, left: - 10 + image.width}}>
                        <TouchableOpacity onPress={() => {deleteItems(image.id, 'image')}}>
                            <Fontisto name={'close'} size={40} color={'#c0b9ac'} style={styles.editingIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
                }
                <TouchableOpacity onPress={handleTap} activeOpacity={.9} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} style={{zIndex: image.zIndex}}>
                    <Image
                        source={{ uri: image.imageInfo.uri }}
                        style={[{
                            width: image.width,
                            height: image.height,
                            zIndex: image.zIndex,
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
      position: 'absolute',
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
    },
    imageSelected: {
        borderWidth: 2, borderColor: '#c0b9ac',
        zIndex: 999,
    },
  });