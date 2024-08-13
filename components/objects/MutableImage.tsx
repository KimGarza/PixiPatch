import React, { useState, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import useDragPanResponder from './useDragPanResponder';
import { RotationGestureHandler, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';


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

    const { panHandlers, position } = useDragPanResponder();

    const [activedImage, setActivedImage] = useState<ImageData |  null>(null);


    const rotation = useSharedValue(0);
    const savedRotation = useSharedValue(0);


    const rotationGesture = Gesture.Rotation()
        .onUpdate((event) => {
            if (activedImage?.imageInfo.uri === image.imageInfo.uri) {
                rotation.value = savedRotation.value + event.rotation;
            }
        })
        .onEnd(() => {
            if (activedImage?.imageInfo.uri === image.imageInfo.uri) {
                savedRotation.value = rotation.value;
            }
        });


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}rad` }],
        };
    });


    useEffect(() => {
        if (isAnotherImageActive) {
            setActivedImage(null);
        }
    }, [isAnotherImageActive])

    const handleTap = () => {
        if (image.imageInfo.uri == activedImage?.imageInfo.uri) {
            setActivedImage(null);
            activateImage(null);
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
            <View
                style={[ styles.imageContainer, { width: image.width, height: image.height, top: image.top,
                    left: image.left, transform: [{ translateX: position.x }, { translateY: position.y } ]},]}
                {...panHandlers}
            >
                <GestureDetector gesture={rotationGesture}>
                    <Animated.View style={[styles.imageContainer, animatedStyle]}>
                        {activedImage && !isAnotherImageActive &&
                        <View style={styles.container}>

                            <View style={{position: 'absolute', top: - 10, left: - 10 + image.width}}>
                                <TouchableOpacity onPress={handleRemoveImage}> 
                                    <Fontisto name={'close'} size={20} color={'#fc0026'} style={styles.editingIcon}/>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{ position: 'absolute', top: - 10, left: - 10 }}>
                                <FontAwesome6 name={'rotate-left'} size={20} color={'#fc0026'} style={styles.editingIcon}/>
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
                    </Animated.View>
                </GestureDetector>
            </View>
    );
};

export default MutableImage;

const styles = StyleSheet.create({
    container: {
      zIndex: 9999999,
    },
    imageContainer: {
      zIndex: 9999999,
      borderWidth: 3, borderColor: 'purple',
      position: 'relative', // Ensure container is absolutely positioned
    },
    closeContainer: {
        position: 'absolute',
        borderWidth: 3, borderColor: 'pink',
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
        borderWidth: 2, borderColor: '#fc0026',
        zIndex: 4
    },
  });