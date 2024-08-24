import { useRef, useContext, useState } from 'react';
import { PanResponder, PanResponderInstance, GestureResponderEvent, PanResponderGestureState } from 'react-native';

interface Props {
    // imageData: ImageData;
    cropBox: { x: number, y: number, width: number, height: number }
    // setCropBox: React.Dispatch<React.SetStateAction<{
    //     x: number;
    //     y: number;
    //     width: number;
    //     height: number;
    // }>>
}

// pan responder hook for each cordner and each side to be returned, otherwise may need to create a few seperate pan responders
function useCropPanResponder({ cropBox }: Props) { 

    // PASS IN IMAGE FOR WIDHT AN DHEIGH  IF THIS DONESNT WORK
    // max dimensions are essentially barrowing the actual image width and height form cropCoords since you can't crop bigger than the image
    const [maxDimensions, setMaxDimensions] = useState<{maxWidth: number, maxHeight: number}>({maxWidth: cropBox.width, maxHeight: cropBox.height});

    // Initialize PanResponders
    const panResponderTopLeft = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
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
            if (newWidth <= maxDimensions.maxWidth && newHeight <= maxDimensions.maxHeight && newX >= 0 && newY >= 0) {
                console.log("good to move");
            // setCropBox({
            //     ...cropBox,
            //     width: newWidth,
            //     height: newHeight,
            //     x: newX,
            //     y: newY,
            // });
            }

            console.log("pan handlers crop box value: ", cropBox);

        },
        })
    ).current;

    return panResponderTopLeft.panHandlers;
}

export default useCropPanResponder;
