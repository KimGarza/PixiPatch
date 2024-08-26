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

  const initialTouch = useRef({ x: 0, y: 0 });

  const panResponderLeftCorner = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // Capture the initial touch point
        initialTouch.current = { x: gestureState.x0, y: gestureState.y0 };
      },
      onPanResponderMove: (evt, gestureState) => {
        // Calculate the displacement from the initial touch
        const dx = gestureState.moveX - initialTouch.current.x;
        const dy = gestureState.moveY - initialTouch.current.y;

        // Apply the displacement
        const newX = positionRef.current.x + dx;
        const newY = positionRef.current.y + dy;

        const newWidth = Math.max(0, dimensRef.current.width - dx);
        const newHeight = Math.max(0, dimensRef.current.height - dy);

        // Update the refs and state
        positionRef.current = { x: newX, y: newY };
        dimensRef.current = { width: newWidth, height: newHeight };

        setPosition({ x: newX, y: newY });
        setDimens({ width: newWidth, height: newHeight });
      },
      onPanResponderRelease: () => {
        // Reset initial touch
        initialTouch.current = { x: 0, y: 0 };
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
