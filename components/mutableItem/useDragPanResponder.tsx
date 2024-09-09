import { useSharedValue } from 'react-native-reanimated';
import { useRef } from 'react';
import { PanResponder } from 'react-native';

const useDragPanResponder = (initialPosition: {initialX: number, initialY: number}) => {
    // Use shared values instead of useState
    const newPositionX = useSharedValue(initialPosition.initialX);
    const newPositionY = useSharedValue(initialPosition.initialY);
    
    const lastPosition = useRef({ x: initialPosition.initialX, y: initialPosition.initialY });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false, 
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
            },
            onPanResponderGrant: () => {},
            onPanResponderMove: (evt, gestureState) => {

                // Update the shared values directly
                newPositionX.value = lastPosition.current.x + gestureState.dx;
                newPositionY.value = lastPosition.current.y + gestureState.dy;
            },
            onPanResponderRelease: (evt, gestureState) => {

                lastPosition.current = {
                    x: lastPosition.current.x + gestureState.dx,
                    y: lastPosition.current.y + gestureState.dy,
                };
            },
        })
    ).current;

    return { panHandlers: panResponder.panHandlers, newPositionX, newPositionY };
};

export default useDragPanResponder;
