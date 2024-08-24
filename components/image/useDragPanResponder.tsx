import { useSharedValue } from 'react-native-reanimated';
import { useRef } from 'react';
import { PanResponder } from 'react-native';

const useDragPanResponder = (initialX = 0, initialY = 0) => {
    // Use shared values instead of useState
    const positionX = useSharedValue(initialX);
    const positionY = useSharedValue(initialY);
    
    const lastPosition = useRef({ x: initialX, y: initialY });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false, 
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
            },
            onPanResponderGrant: () => {},
            onPanResponderMove: (evt, gestureState) => {

                // Update the shared values directly
                positionX.value = lastPosition.current.x + gestureState.dx;
                positionY.value = lastPosition.current.y + gestureState.dy;
            },
            onPanResponderRelease: (evt, gestureState) => {

                lastPosition.current = {
                    x: lastPosition.current.x + gestureState.dx,
                    y: lastPosition.current.y + gestureState.dy,
                };
            },
        })
    ).current;

    return { panHandlers: panResponder.panHandlers, positionX, positionY };
};

export default useDragPanResponder;
