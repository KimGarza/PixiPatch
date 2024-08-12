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
    image: ImageData; // image to act as draggableImage
    activateImage: (image: ImageData | null) => void; // activates this image, sends to parent which is ViewImages and then is sent to parent which is EditorContent so that image editing menu can be toggled.
    isAnotherImageActive: boolean; // is there a different image already active, if so, deactivate this image.
    deleteImage: (image: ImageData) => void; // delete function callback passes to parent since parent has access to ImageCtx (delete funciton in context)
}

// Represents an image with complex capabilities to be dragged around. (Holds image within). Uses panResponder to evaluate x and y movement coordinates.
const DraggableImage = ({ image, activateImage, isAnotherImageActive, deleteImage }: DraggableImageProps) => {

    const [position, setPosition] = useState({ x: 0, y: 0 }); // Minimal State Updates: The use of useState for position ensures that only the necessary part of the component re-renders. Since position is a lightweight object (just two numbers), updating it is very fast and doesn't involve expensive operations.
    const lastPosition = useRef({ x: 0, y: 0 }); // coordinates where the image was positioned after the last drag operation (not live)

    const rotateStartAngle = useRef(0);
    const [rotation, setRotation] = useState(0); // State to store the rotation angle

    const [activedImage, setActivedImage] = useState<ImageData |  null>(null);

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

    const handleRotateImage = () => {
        console.log("rotate")
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => { // ONLY FOR MOVEMENT NOT FOR TAPS
            },
            onPanResponderMove: (evt, gestureState) => {
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
            style={[ styles.imageContainer, { transform: [{ translateX: position.x }, { translateY: position.y } ]},]}
            {...panResponder.panHandlers}
        >
            {activedImage && !isAnotherImageActive &&
            <View style={styles.container}>

                <View style={{position: 'absolute', top: image.top - 10, left: image.left - 10 + image.width}}>
                    <TouchableOpacity onPress={handleRemoveImage}> 
                        <Fontisto name={'close'} size={20} color={'#fc0026'} style={styles.editingIcon}/>
                    </TouchableOpacity>
                </View>
                
                <View style={{ position: 'absolute', top: image.top - 10, left: image.left - 10 }}>
                {/* // {...rotatePanResponder.panHandlers} */}
                    <FontAwesome6 name={'rotate-left'} size={20} color={'#fc0026'} style={styles.editingIcon}/>
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
                    }, activedImage?.imageInfo.uri == image.imageInfo.uri && styles.imageSelected,]}
                />
            </TouchableOpacity>
        </View>
    );
};

export default DraggableImage;

const styles = StyleSheet.create({
    container: {
      zIndex: 9999999
    },
    imageContainer: {
      zIndex: 9999999
    },
    closeContainer: {
        position: 'absolute',
    },
    editingIcon: {
        backgroundColor: 'white',
        borderRadius: 100
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
  });