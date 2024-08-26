import { useRef, RefObject, Dispatch, SetStateAction } from 'react';
import { PanResponder } from 'react-native';

interface Props {
    TRPositionRef: RefObject<{x: number, y: number}>;
    dimensRef: RefObject<{width: number, height: number}>;
    setTRPosition: Dispatch<SetStateAction<{x: number, y: number}>>
    setDimens: Dispatch<SetStateAction<{width: number, height: number}>>

    TRinitialPositionRef: RefObject<{x: number, y: number}>;
    initialDimensRef: RefObject<{width: number, height: number}>;
}

function useTopRightPanResponder({ TRPositionRef, dimensRef, setTRPosition, setDimens, TRinitialPositionRef, initialDimensRef }: Props) { 

    const topRightPanHandlers = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            if ( TRPositionRef.current != null && dimensRef.current != null && initialDimensRef.current != null && TRinitialPositionRef.current != null) {
                // 1. we add the initial count of everything as we equate dx and dy to the new x and y with considering whatever the initial dimensions are
                // 2. now when we start moving again, it will equate the value to the gesture state but simply add or subtract initial to start it in the correct location rather than 0,0 full h and w
                // TRPositionRef.current.x = TRinitialPositionRef.current.x + gestureState.dx;
                // TRPositionRef.current.y = TRinitialPositionRef.current.y + gestureState.dy;

                // dimensRef.current.width = initialDimensRef.current.width + gestureState.dx; // for right must add bc dx is negative which adding - assists with retaining negative value
                // dimensRef.current.height = initialDimensRef.current.height - gestureState.dy;

                // setTRPosition({ x: TRPositionRef.current.x, y: TRPositionRef.current.y });
                // setDimens({ width: dimensRef.current.width, height: dimensRef.current.height });
                if (TRinitialPositionRef.current.x - gestureState.dx <= 0) {
                    TRPositionRef.current.x = TRinitialPositionRef.current.x + gestureState.dx;
                    dimensRef.current.width = initialDimensRef.current.width + gestureState.dx;
                    setDimens({ width: dimensRef.current.width, height: dimensRef.current.height });
               }
               if (TRinitialPositionRef.current.y + gestureState.dy >= 0) {
                    TRPositionRef.current.y = TRinitialPositionRef.current.y + gestureState.dy;
                    dimensRef.current.height = initialDimensRef.current.height - gestureState.dy;
                    setTRPosition({ x: TRPositionRef.current.x, y: TRPositionRef.current.y });
                }
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if ( initialDimensRef.current != null && TRinitialPositionRef.current != null) {
                // 1. whatever the initial value was that we started at will now add the current dx, dy bc that is the new "left off" value subtracting from the initial
                // 2. so now we continue to stack values but only on initial dimens and initial touch
                const x = gestureState.dx + TRinitialPositionRef.current.x;
                const y = gestureState.dy + TRinitialPositionRef.current.y;

                const w = initialDimensRef.current.width + gestureState.dx; // have to add here!
                const h = initialDimensRef.current.height - gestureState.dy;

                // TRinitialPositionRef.current.x = x;
                // TRinitialPositionRef.current.y = y;

                // initialDimensRef.current.width = w;
                // initialDimensRef.current.height = h;

                
                if (TRinitialPositionRef.current.x + gestureState.dx <= 0) {
                    TRinitialPositionRef.current.x = x;
                    initialDimensRef.current.width = w;
               }
                if (TRinitialPositionRef.current.y + gestureState.dy >= 0) {
                    TRinitialPositionRef.current.y = y;
                    initialDimensRef.current.height = h;
                }
            }
        }
        })
    ).current;

    return { topRight: topRightPanHandlers }
}

export default useTopRightPanResponder;
