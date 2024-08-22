import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import useDragPanResponder from './useDragPanResponder';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ViewModifyImageToolbox from '../views/viewModifyImageToolbox';

interface ImageInfo {
    uri: string;
    width: number;
    height: number;
    type: string | undefined;
}

interface ImageData {
    imageInfo: ImageInfo;
    top: number;
    left: number;
    width: number;
    height: number;
}

interface DraggableImageProps {
    image: ImageData; // image to act as draggableImage
    activateImage: (image: ImageData | null) => void; // activates this image, sends to parent which is ViewImages and then is sent to parent which is EditorContent so that image editing menu can be toggled.
    isAnotherImageActive: boolean; // is there a different image already active, if so, deactivate this image.
    deleteImage: (image: ImageData) => void; // delete function callback passes to parent since parent has access to ImageCtx (delete funciton in context)
}

// Represents an image with complex capabilities to be dragged around. (Holds image within). Uses panResponder to evaluate x and y movement coordinates.
const MutableImage = ({ image, activateImage, isAnotherImageActive, deleteImage }: DraggableImageProps) => {

    const [thisImage, setThisImage] = useState<ImageData>(image);
    const [activedImage, setActivedImage] = useState<ImageData |  null>(null);
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
        if (isAnotherImageActive) {
            setActivedImage(null);
        }
    }, [isAnotherImageActive])

    const handleTap = (event: GestureResponderEvent) => {

        const { locationX, locationY } = event.nativeEvent;
        setTapCoordinates({x: locationX, y: locationY});

        if (image.imageInfo.uri == activedImage?.imageInfo.uri) {
            setActivedImage(null);
            activateImage(null);
            setTapCoordinates({x: 0, y: 0});

        } else {
            setActivedImage(image);
            activateImage(image);
        }

    }

    const handleRemoveImage = () => {
        deleteImage(image);
        setActivedImage(null);
        activateImage(null);
    }


    return (
        <GestureDetector gesture={Gesture.Simultaneous(rotationGesture, pinchGesture)}>
            <Animated.View 
                style={[styles.imageContainer, { width: image.width, height: image.height, top: image.top, left: image.left }, animatedStyle]}
                {...panHandlers} // Apply PanResponder only when the image is not active
            >
                {activedImage && !isAnotherImageActive &&
                <View >

                    <View style={{position: 'absolute', top: - 10, left: - 10 + image.width}}>
                        <TouchableOpacity onPress={handleRemoveImage}> 
                            <Fontisto name={'close'} size={20} color={'#c0b9ac'} style={styles.editingIcon}/>
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
                        }, activedImage?.imageInfo.uri == image.imageInfo.uri && styles.imageSelected,]}
                    />
                </TouchableOpacity>

                {/* little popup toolbox for editing options on a specific image */}
                {image && tapCoordinates.x > 0 && tapCoordinates.y > 0 && <ViewModifyImageToolbox image={image}/>}
            </Animated.View>
        </GestureDetector>
    );
};

export default MutableImage;

const styles = StyleSheet.create({
    imageContainer: {
      zIndex: 4,
      position: 'relative', // Ensure container is absolutely positioned
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