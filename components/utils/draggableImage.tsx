import React, { useState, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, PanResponder, TouchableOpacity, ImageSourcePropType } from 'react-native';

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
    imageInfo: ImageInfo;
  }

const DraggableImage = ({ imageInfo }: DraggableImageProps) => { // may need to take another type of thing in for iamgeoinfo

    const [position, setPosition] = useState({ x: 0, y: 0 }); // Minimal State Updates: The use of useState for position ensures that only the necessary part of the component re-renders. Since position is a lightweight object (just two numbers), updating it is very fast and doesn't involve expensive operations.
    const lastPosition = useRef({ x: 0, y: 0 }); // coordinates where the image was positioned after the last drag operation (not live)

    const handleTap = () => {
        console.log('Image tapped!');
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => { // ONLY FOR MOVEMENT NOT FOR TAPS
                console.log('IN onPanResponderGrant');
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log('IN onPanResponderMove');
                console.log(lastPosition.current.x - gestureState.dx)
                setPosition({ 
                    x: lastPosition.current.x + gestureState.dx,
                    y: lastPosition.current.y + gestureState.dy, 
                });
            },
            onPanResponderRelease: (evt, gestureState) => {
                lastPosition.current = {
                    x: lastPosition.current.x + gestureState.dx,
                    y: lastPosition.current.y + gestureState.dy,
                };
            },
          })
        ).current;
    return (
        <View
        // GPU Acceleration: The transform property is often GPU-accelerated in mobile environments. This means that the translation happens directly on the GPU, which can handle these kinds of operations very efficiently, resulting in smooth animations and transformations.
        style={[ styles.imageContainer, { transform: [{ translateX: position.x }, { translateY: position.y }] },]}
        {...panResponder.panHandlers} 
        >
            <TouchableOpacity onPress={handleTap} activeOpacity={.5}>
                <Image
                    source={{ uri: imageInfo.uri }}
                    style={styles.image}
                />
            </TouchableOpacity>
    </View>
    );
};

export default DraggableImage;

const styles = StyleSheet.create({
    imageContainer: {
      position: 'absolute', // Make sure the container is absolutely positioned
      zIndex: 9999999
    },
    image: {
      width: 100, // Set appropriate width
      height: 100, // Set appropriate height
    },
  });