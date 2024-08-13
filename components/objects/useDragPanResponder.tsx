import { useRef, useState } from 'react';
import { PanResponder } from 'react-native';

const useDragPanResponder = (initialX = 0, initialY = 0) => {

    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const lastPosition = useRef({ x: initialX, y: initialY });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false, // Prevent PanResponder from taking over on a simple tap
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;  // Only start the pan if there’s some movement
            },
            onPanResponderGrant: () => { // ONLY FOR MOVEMENT NOT FOR TAPS
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log("pan responder move")

                setPosition({ 
                    x: lastPosition.current.x + gestureState.dx,
                    y: lastPosition.current.y + gestureState.dy, 
                });
            },
            onPanResponderRelease: (evt, gestureState) => {
                console.log("pan responder release")

                lastPosition.current = {
                    x: lastPosition.current.x + gestureState.dx,
                    y : lastPosition.current.y + gestureState.dy,
                };
            },
            })
        ).current;

    return { panHandlers: panResponder.panHandlers, position };
};

export default useDragPanResponder;
