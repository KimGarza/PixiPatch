import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';

interface Props {
    imageMaxDimensions: { width: number, height: number }
}

const CropInterface = ({ imageMaxDimensions }: Props) => {
  const positionRef = useRef({ x: 0, y: 0 });
  const dimensRef = useRef({ width: imageMaxDimensions.width, height: imageMaxDimensions.height });

  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [dimens, setDimens] = useState<{ width: number, height: number }>({ width: imageMaxDimensions.width, height: imageMaxDimensions.height });

  // 1. starting off before the first touch we are at 0, 0 and max h and w
  // 2. Now after the first gesture, these values will add x, y or subtract amount to reflect new last position/left off
  const initialTouch = useRef({ x: 0, y: 0 });
  const initialDimens = useRef({ width: imageMaxDimensions.width, height: imageMaxDimensions.height });

  const panResponderLeftCorner = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {

        // 1. we add the initial count of everything as we equate dx and dy to the new x and y with considering whatever the initial dimensions are
        // 2. now when we start moving again, it will equate the value to the gesture state but simply add or subtract initial to start it in the correct location rather than 0,0 full h and w
        positionRef.current.x = initialTouch.current.x + gestureState.dx;
        positionRef.current.y = initialTouch.current.y + gestureState.dy;

        dimensRef.current.width = initialDimens.current.width - gestureState.dx;
        dimensRef.current.height = initialDimens.current.height - gestureState.dy;

        setPosition({ x: positionRef.current.x, y: positionRef.current.y });
        setDimens({ width: dimens.width, height: dimens.height });
      },
      onPanResponderRelease: (evt, gestureState) => {

        // 1. whatever the initial value was that we started at will now add the current dx, dy bc that is the new "left off" value subtracting from the initial
        // 2. so now we continue to stack values but only on initial dimens and initial touch
        const x = gestureState.dx + initialTouch.current.x;
        const y = gestureState.dy + initialTouch.current.y;

        const w = initialDimens.current.width - gestureState.dx;
        const h = initialDimens.current.height - gestureState.dy;

        initialTouch.current = { x: x, y: y };
        initialDimens.current = { width: w, height: h };
      }
    })
  ).current;

  return (
    <View style={{
      position: 'absolute',
      top: position.y,
      left: position.x,
      width: dimens.width,
      height: dimens.height,
      borderWidth: 5, borderColor: 'blue', borderStyle: 'solid'
    }}>
      <View style={[styles.corner, { left: -5, top: -5 }]} {...panResponderLeftCorner.panHandlers} />
      {/* Add other corners */}
    </View>
  );
};

const styles = StyleSheet.create({
  corner: {
    position: 'absolute',
    maxWidth: 20,
    maxHeight: 20,
    minWidth: 20,
    minHeight: 20,
    borderWidth: 2, borderColor: 'white', borderStyle: 'solid',
  },
});

export default CropInterface;
