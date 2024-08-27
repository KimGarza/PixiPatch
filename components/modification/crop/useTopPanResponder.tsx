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
    updatePositionCallback: (position: {top: number, bottom: number, left: number, right: number}) => void;
    setDimensCallback: (dimensions:  { width: number, height: number }) => void;
}

// positive values as moving downward and negative as moving upward
function useTopPanResponder({ imageMaxDimensions, positionRef, initialPositionsRef, setPosition, dimensRef, initialDimensRef, setDimens, setDimensCallback, updatePositionCallback}: Props) { 

    const usePanResponder = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            if ( positionRef.current != null && initialPositionsRef.current != null && dimensRef.current != null && initialDimensRef.current ) {
            
                // this means the user is swiping down and if up, not past 0 but what about too far down but need to protect against cropping past the images max height
                if (initialPositionsRef.current.top + gestureState.dy >= 0 && initialPositionsRef.current.top + gestureState.dy <= (imageMaxDimensions.height - 10)) { // 80% of image can be cropped
                    console.log("position top data ", positionRef.current.top)
                    positionRef.current.top = initialPositionsRef.current.top + gestureState.dy; // current top position ref will change by equating to gestureState. dy + the initial (left off) value
                    setPosition(positionRef.current);
                    // updatePositionCallback(positionRef.current);
                    dimensRef.current.height = initialDimensRef.current.height - gestureState.dy;
                    setDimens({ width: dimensRef.current.width, height: dimensRef.current.height });
                    console.log("setDimensCallback ", setDimensCallback);
                    console.log("dimens would be set to ", { width: dimensRef.current.width, height: dimensRef.current.height });
                    try {
                        setDimensCallback({ width: dimensRef.current.width, height: dimensRef.current.height });
                    } catch ( error ) {
                        console.log("error ", error)
                    }

                }
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if ( positionRef.current != null && initialPositionsRef.current != null && dimensRef.current != null && initialDimensRef.current ) {

                if (initialPositionsRef.current.top + gestureState.dy >= 0) { // 80% of image can be cropped

                    const y = gestureState.dy + initialPositionsRef.current.top;
                    const h = initialDimensRef.current.height - gestureState.dy;

                    if (initialPositionsRef.current.top + gestureState.dy >= 0) {
                        initialPositionsRef.current.top = y;
                        initialDimensRef.current.height = h;
                    }
                }
            }
        }
        })
    ).current;

    return { topPanHandlers: usePanResponder.panHandlers }
}

export default useTopPanResponder;
