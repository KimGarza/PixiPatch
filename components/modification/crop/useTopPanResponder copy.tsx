import { useRef, RefObject, Dispatch, SetStateAction } from 'react';
import { PanResponder } from 'react-native';

interface Props {
    imageMaxDimensions: { width: number, height: number };
    positionRef: RefObject<{top: number, bottom: number, left: number, right: number}>;
    initialPositionsRef: RefObject<{top: number, bottom: number, left: number, right: number}>;
    setPosition: Dispatch<SetStateAction<{top: number, bottom: number, left: number, right: number}>>;
    dimensRef: RefObject<{width: number, height: number}>;
    initialDimensRef: RefObject<{width: number, height: number}>;
    setDimens: Dispatch<SetStateAction<{width: number, height: number}>>;
}

// positive values as moving downward and negative as moving upward
function useTopPanResponder({ imageMaxDimensions, positionRef, initialPositionsRef, setPosition, dimensRef, initialDimensRef, setDimens}: Props) { 

    const usePanResponder = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            if ( positionRef.current != null && initialPositionsRef.current != null && dimensRef.current != null && initialDimensRef.current ) {
            
                // this means the user is swiping down and if up, not past 0 but what about too far down but need to protect against cropping past the images max height
                if (initialPositionsRef.current.top + gestureState.dy >= 0 && initialPositionsRef.current.top + gestureState.dy <= (imageMaxDimensions.height - 15)) {
                    console.log("position top data ", positionRef.current.top)
                    positionRef.current.top = initialPositionsRef.current.top + gestureState.dy; // current top position ref will change by equating to gestureState. dy + the initial (left off) value
                    setPosition(positionRef.current);
                    dimensRef.current.height = initialDimensRef.current.height - gestureState.dy;
                    setDimens({ width: dimensRef.current.width, height: dimensRef.current.height });
                }
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if ( positionRef.current != null && initialPositionsRef.current != null && dimensRef.current != null && initialDimensRef.current ) {

                if (initialPositionsRef.current.top + gestureState.dy >= 0) { 

                    // the image dimension height in quantity is able to be used for determining max scaling of cropping using y location
                    let y;
                    let height;

                    // checking that the user is not trying to crop beyond the images height, if so, the new initial value leaves off at the max cropped amount
                  if (initialPositionsRef.current.top + gestureState.dy <= (imageMaxDimensions.height - 15)) { // leaving some room for the cropped image
                    y = imageMaxDimensions.height - 10;
                    height = imageMaxDimensions.height - 10;
                  } else { // otherwise however far they cropped
                    y = gestureState.dy + initialPositionsRef.current.top;
                    height = initialDimensRef.current.height - gestureState.dy;
                  }

                    initialPositionsRef.current.top = y;
                    initialDimensRef.current.height = height;
                }
            }
        }
        })
    ).current;

    return { topPanHandlers: usePanResponder.panHandlers }
}

export default useTopPanResponder;
