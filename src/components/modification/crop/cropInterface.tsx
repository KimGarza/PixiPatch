import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import useTopPanResponder from './useTopPanResponder';
import useBottomPanResponder from './useBottomPanResponder';

interface Props {
    imageMaxDimensions: { width: number, height: number },
    updatePositionCallback: (position: {top: number, bottom: number, left: number, right: number}) => void,
    setDimensCallback: (dimensions:  { width: number, height: number }) => void,
}

const CropInterface = ({ imageMaxDimensions, setDimensCallback, updatePositionCallback }: Props) => {

  const positionRef = useRef({top: 0, bottom: 0, left: 0, right: 0});
  const initialPositionsRef = useRef({top: 0, bottom: 0, left: 0, right: 0});
  const [position, setPosition] = useState<{top: number, bottom: number, left: number, right: number}>({top: 0, bottom: 0, left: 0, right: 0});

  const dimensRef = useRef({ width: imageMaxDimensions.width, height: imageMaxDimensions.height });
  const [dimens, setDimens] = useState<{ width: number, height: number }>({ width: imageMaxDimensions.width, height: imageMaxDimensions.height });
  const initialDimensRef = useRef({ width: imageMaxDimensions.width, height: imageMaxDimensions.height });

  const { topPanHandlers } = useTopPanResponder({imageMaxDimensions, positionRef, initialPositionsRef, setPosition, dimensRef, initialDimensRef, setDimens, setDimensCallback, updatePositionCallback});
  const { bottomPanHandlers } = useBottomPanResponder({imageMaxDimensions, positionRef, initialPositionsRef, setPosition, dimensRef, initialDimensRef, setDimens, setDimensCallback, updatePositionCallback});

  return (
    <View style={{
      display: 'flex',
      position: 'absolute',
      top: position.top,
      bottom: position.bottom,
      // left: position.left,
      // right: position.right,
      width: dimens.width,
      height: dimens.height,
      borderWidth: 2, borderColor: 'blue', borderStyle: 'solid'
    }}>
      {/* 10% NOT 50% FOR LEFT? */}
      {/* //TOP */}
      <View style={[styles.handle, { top: -5, left: '10%', }]} {...topPanHandlers } />
      {/* BOTTOM */}
      <View style={[styles.handle, { bottom: -5, left: '10%', }]} {...bottomPanHandlers } />
      {/* Add other corners */}
    </View>
  );
};

const styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    maxWidth: '80%',
    maxHeight: 30,
    minWidth: '100%',
    minHeight: 20,
    borderWidth: 2, borderColor: 'white', borderStyle: 'solid',
  },
});

export default CropInterface;
