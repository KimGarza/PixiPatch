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
    image: ImageData;
    activateImage: (image: ImageData | null) => void
  }

const DraggableImage = ({ image, activateImage }: DraggableImageProps) => { // may need to take another type of thing in for iamgeoinfo

    const [position, setPosition] = useState({ x: 0, y: 0 }); // Minimal State Updates: The use of useState for position ensures that only the necessary part of the component re-renders. Since position is a lightweight object (just two numbers), updating it is very fast and doesn't involve expensive operations.
    const lastPosition = useRef({ x: 0, y: 0 }); // coordinates where the image was positioned after the last drag operation (not live)
    const [activeImage, setActiveImage] = useState<ImageData |  null>(null);


    const handleTap = () => {
        
        if (image.imageInfo.uri == activeImage?.imageInfo.uri) {
            setActiveImage(null);
            activateImage(null);

        } else {
            setActiveImage(image);
            activateImage(image);

        }

    }

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
        style={[ styles.imageContainer, { transform: [{ translateX: position.x }, { translateY: position.y }] },]}
        {...panResponder.panHandlers} 
        >
            <TouchableOpacity onPress={handleTap} activeOpacity={.9}>
                <Image
                    source={{ uri: image.imageInfo.uri }}
                    style={[{
                            width: image.width,
                            height: image.height,
                            top: image.top,
                            left: image.left,
                    }, activeImage?.imageInfo.uri == image.imageInfo.uri && styles.imageSelected,]}
                    // 
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
        position: 'absolute',
        flexDirection: 'column', // idk why but this helps with the scattering
        zIndex: 2
    },
    imageSelected: {
        borderWidth: 2,
        borderColor: '#fc0026',
        zIndex: 4
      },
    selectableImage: {
        zIndex: 3
    }
  });