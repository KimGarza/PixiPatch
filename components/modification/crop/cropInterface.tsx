import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import useTopLeftPanResponder from './useTopLeftPanResponder';
import useTopRightPanResponder from './useTopRightPanResponder';

interface Props {
    imageMaxDimensions: { width: number, height: number }
}

const CropInterface = ({ imageMaxDimensions }: Props) => {

  // TL - top left, BR - bottom right, etc...
  const TLPositionRef = useRef({ x: 0, y: 0 });
  const [TLPosition, setTLPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const dimensRef = useRef({ width: imageMaxDimensions.width, height: imageMaxDimensions.height });
  const [dimens, setDimens] = useState<{ width: number, height: number }>({ width: dimensRef.current.width, height: dimensRef.current.height });

  const TRPositionRef = useRef({ x: 0, y: 0 });
  const [TRPosition, setTRPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  // 1. starting off before the first touch we are at 0, 0 and max h and w
  // 2. Now after the first gesture, these values will add x, y or subtract amount to reflect new last position/left off
  const TLinitialPositionRef = useRef({ x: 0, y: 0 });
  const TRinitialPositionRef = useRef({ x: 0, y: 0 });
  const initialDimensRef = useRef({ width: imageMaxDimensions.width, height: imageMaxDimensions.height });

  const { topLeft }= useTopLeftPanResponder(
    {TLPositionRef, dimensRef, setTLPosition, setDimens, TLinitialPositionRef, initialDimensRef}
  );

  const { topRight }= useTopRightPanResponder(
    {TRPositionRef, dimensRef, setTRPosition, setDimens, TRinitialPositionRef, initialDimensRef}
  );

  return (
    <View style={{
      position: 'absolute',
      top: TLPosition.y,
      left: TLPosition.x,
      right: TRPosition.x,
      width: dimens.width,
      height: dimens.height,
      borderWidth: 2, borderColor: 'blue', borderStyle: 'solid'
    }}>
      <View style={[styles.corner, { left: -5, top: -5 }]} {...topLeft.panHandlers } />
      <View style={[styles.corner, { right: -5, top: -5 }]} {...topRight.panHandlers } />
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
