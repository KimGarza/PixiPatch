import { useRef, useContext, useState } from 'react';
import { PanResponder, PanResponderInstance, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import React, {useEffect} from 'react';

interface Props {
    cropBox: { x: number, y: number, width: number, height: number }
    setCropBox: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>>
    imageMaxDimensions: {width: number, height: number}
}

// pan responder hook for each cordner and each side to be returned, otherwise may need to create a few seperate pan responders
function useCropPanResponder({ cropBox, setCropBox, imageMaxDimensions }: Props) { 
    useEffect(() => {
        console.log("cropbox in panresponder ", cropBox)
    }, [cropBox])
    const panResponderTopLeft = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {


            console.log("gesturestate dx = cropBox.x ", gestureState.dx, cropBox.x)
            // Calculate new crop box dimensions for top-left handle
            let newWidth = cropBox.width - gestureState.dx;
            let newHeight = cropBox.height - gestureState.dy;
            let newX = cropBox.x + gestureState.dx; // ???
            let newY = cropBox.y + gestureState.dy; // ???
            console.log("newWidth, ", newWidth);
            console.log("newHeight, ", newHeight);
            console.log("newX, ", newX);
            console.log("newY, ", newY);

            // Ensure the crop box stays within the image boundaries
            if (newWidth <= imageMaxDimensions.width && newHeight <= imageMaxDimensions.height && newX >= 0 && newY >= 0) {

                setCropBox({
                    ...cropBox,
                    width: newWidth,
                    height: newHeight,
                    x: newX,
                    y: newY,
                });

            }
        },
        })
    ).current;

    return panResponderTopLeft.panHandlers;
}

export default useCropPanResponder;
