import { useRef, RefObject, Dispatch, SetStateAction } from 'react';
import { PanResponder } from 'react-native';

interface Props {
    TLPositionRef: RefObject<{x: number, y: number}>;
    dimensRef: RefObject<{width: number, height: number}>;
    setTLPosition: Dispatch<SetStateAction<{x: number, y: number}>>
    setDimens: Dispatch<SetStateAction<{width: number, height: number}>>

    TLinitialPositionRef: RefObject<{x: number, y: number}>;
    initialDimensRef: RefObject<{width: number, height: number}>;

    positionYRef: RefObject<{y: number}>;
    initialPositionYRef: RefObject<{y: number}>;
    setPositionY: Dispatch<SetStateAction<{y: number}>>
}

function useTopLeftPanResponder({ TLPositionRef, dimensRef, setTLPosition, setDimens, TLinitialPositionRef, initialDimensRef, setPositionY, positionYRef, initialPositionYRef}: Props) { 

    const panResponderTopLeft = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            if ( TLPositionRef.current != null && dimensRef.current != null && initialDimensRef.current != null && TLinitialPositionRef.current != null && positionYRef.current != null && initialPositionYRef.current != null) {
               
               if (TLinitialPositionRef.current.x + gestureState.dx >= 0) {
                    // 1. we add the initial count of everything as we equate dx and dy to the new x and y with considering whatever the initial dimensions are
                    // 2. now when we start moving again, it will equate the value to the gesture state but simply add or subtract initial to start it in the correct location rather than 0,0 full h and w
                    TLPositionRef.current.x = TLinitialPositionRef.current.x + gestureState.dx;
                    dimensRef.current.width = initialDimensRef.current.width - gestureState.dx;
                    setDimens({ width: dimensRef.current.width, height: dimensRef.current.height });
                    setTLPosition({x: TLPositionRef.current.x, y: TLPositionRef.current.y })
               }
                if (initialPositionYRef.current.y + gestureState.dy >= 0) {
                    // TLPositionRef.current.y = TLinitialPositionRef.current.y + gestureState.dy;
                    // dimensRef.current.height = initialDimensRef.current.height - gestureState.dy;
                    // setTLPosition({ x: TLPositionRef.current.x, y: TLPositionRef.current.y });

                    positionYRef.current.y = initialPositionYRef.current.y + gestureState.dy;
                    dimensRef.current.height = initialDimensRef.current.width - gestureState.dy;
                    setDimens({ width: dimensRef.current.width, height: dimensRef.current.height });
                    setPositionY({y: positionYRef.current.y}) 
                    
                }
            }
        },
        onPanResponderRelease: (evt, gestureState) => {

            if ( initialDimensRef.current != null && TLinitialPositionRef.current != null && initialPositionYRef.current != null) {
                // 1. whatever the initial value was that we started at will now add the current dx, dy bc that is the new "left off" value subtracting from the initial
                // 2. so now we continue to stack values but only on initial dimens and initial touch
                const x = gestureState.dx + TLinitialPositionRef.current.x;
                const y = gestureState.dy + TLinitialPositionRef.current.y;

                const w = initialDimensRef.current.width - gestureState.dx;
                const h = initialDimensRef.current.height - gestureState.dy;

                if (TLinitialPositionRef.current.x + gestureState.dx >= 0) {
                    TLinitialPositionRef.current.x = x;
                    initialDimensRef.current.width = w;
               }
                if (initialPositionYRef.current.y + gestureState.dy >= 0) {
                    initialPositionYRef.current.y = y;
                    initialDimensRef.current.height = h;
                }
            }
        }
        })
    ).current;

    return { topLeft: panResponderTopLeft }
}

export default useTopLeftPanResponder;
