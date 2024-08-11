import React, { useState, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, PanResponder, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as ImageManipulator from 'expo-image-manipulator';

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
    image: ImageData;
    activateImage: (image: ImageData | null) => void;
    isAnotherImageActive: boolean;
    deleteImage: (image: ImageData) => void;
  }

const DraggableImage = ({ image, activateImage, isAnotherImageActive, deleteImage }: DraggableImageProps) => { // may need to take another type of thing in for iamgeoinfo

    const [position, setPosition] = useState({ x: 0, y: 0 }); // Minimal State Updates: The use of useState for position ensures that only the necessary part of the component re-renders. Since position is a lightweight object (just two numbers), updating it is very fast and doesn't involve expensive operations.
    const lastPosition = useRef({ x: 0, y: 0 }); // coordinates where the image was positioned after the last drag operation (not live)

    const rotateStartAngle = useRef(0);
    const [rotation, setRotation] = useState(0); // State to store the rotation angle

    const [activeImage, setActiveImage] = useState<ImageData |  null>(null);

    useEffect(() => {
        if (isAnotherImageActive) {
            setActiveImage(null);
        }
    }, [isAnotherImageActive])

    const handleTap = () => {
        if (image.imageInfo.uri == activeImage?.imageInfo.uri) {
            setActiveImage(null);
            activateImage(null);

        } else {
            setActiveImage(image);
            activateImage(image);
        }
    }

    const handleRemoveImage = () => {
        deleteImage(image);
    }

    const handleRotateImage = () => {
        console.log("rotate")
    }

    // const calculateAngle = (x: number, y: number) => {
    //     const centerX = image.left + image.width / 2;
    //     const centerY = image.top + image.height / 2;
    //     const radians = Math.atan2(y - centerY, x - centerX);
    //     return radians * (180 / Math.PI);
    // };

    // const rotatePanResponder = useRef(
    //     PanResponder.create({
    //         onStartShouldSetPanResponder: () => true,
    //         onMoveShouldSetPanResponder: () => true,
    //         onPanResponderGrant: (evt, gestureState) => { // ONLY FOR MOVEMENT NOT FOR TAPS
    //             const { pageX, pageY } = evt.nativeEvent;
    //             rotateStartAngle.current = calculateAngle(pageX, pageY) - rotation;
    //         },
    //         onPanResponderMove: (evt, gestureState) => {
    //             const { pageX, pageY } = evt.nativeEvent;
    //             const currentAngle = calculateAngle(pageX, pageY);
    //             setRotation(currentAngle - rotateStartAngle.current);
    //         },
    //         onPanResponderRelease: () => {
    //             rotateStartAngle.current = 0;
    //         },
    //       })
    //     ).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => { // ONLY FOR MOVEMENT NOT FOR TAPS
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log(lastPosition.current.x - gestureState.dx)
                setPosition({ 
                    x: lastPosition.current.x + gestureState.dx,
                    y: lastPosition.current.y + gestureState.dy, 
                });
            },
            onPanResponderRelease: (evt, gestureState) => {
                lastPosition.current = {
                    x: lastPosition.current.x + gestureState.dx,
                    y : lastPosition.current.y + gestureState.dy,
                };
            },
            })
        ).current;


    return (
        <View
            // GPU Acceleration: The transform property is often GPU-accelerated in mobile environments. This means that the translation happens directly on the GPU, which can handle these kinds of operations very efficiently, resulting in smooth animations and transformations.
            style={[ styles.imageContainer, { transform: [{ translateX: position.x }, { translateY: position.y }, { translateX: position.x },
                { translateY: position.y },
                { rotate: `${rotation}deg` },] },]}
            {...panResponder.panHandlers}
        >
            {activeImage && !isAnotherImageActive &&
            <View style={{zIndex: 99999999}}>
                <View style={{
                    position: 'absolute',
                    top: image.top - 10,
                    left: image.left - 10 + image.width,
                }}>
                    <TouchableOpacity onPress={handleRemoveImage}> 
                        <Fontisto name={'close'} size={20} color={'#fc0026'} 
                            style={{backgroundColor: 'white',
                            borderRadius: 100}}/>
                    </TouchableOpacity>
                </View>
                <View style={{
                    position: 'absolute',
                    top: image.top - 10,
                    left: image.left - 10,
                }}
                // {...rotatePanResponder.panHandlers}
                >
                    <FontAwesome6 name={'rotate-left'} size={20} color={'#fc0026'} 
                    style={{backgroundColor: 'white',
                    borderRadius: 100}}/>
                </View>
            </View>
            }
            <TouchableOpacity onPress={handleTap} activeOpacity={.9}>
                <Image
                    source={{ uri: image.imageInfo.uri }}
                    style={[{
                        width: image.width,
                        height: image.height,
                        top: image.top,
                        left: image.left,
                    }, activeImage?.imageInfo.uri == image.imageInfo.uri && styles.imageSelected,]}
                />
            </TouchableOpacity>
        </View>
    );
};

export default DraggableImage;

const styles = StyleSheet.create({
    imageContainer: {
      position: 'relative', // Make sure the container is absolutely positioned
      zIndex: 9999999
    },
    image: {
        position: 'absolute',
        flexDirection: 'column', // idk why but this helps with the scattering
        zIndex: 2
    },
    imageSelected: {
        borderWidth: 2,
        borderColor: '#fc0026',
        zIndex: 4
    },
    selectedImageContainer: {
        borderWidth: 3, borderColor: 'blue',
        position: 'absolute',
    },
    selectableImage: {
        zIndex: 3
    },
    close: {
        position: 'absolute',
        borderWidth: 3, borderColor: 'blue',
    }
  });