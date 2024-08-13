import { useRef, useState } from 'react';
import { PanResponder } from 'react-native';

const useDragPanResponder = (initialX = 0, initialY = 0) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const lastPosition = useRef({ x: initialX, y: initialY });

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

    return { panHandlers: panResponder.panHandlers, position };
};

export default useDragPanResponder;
