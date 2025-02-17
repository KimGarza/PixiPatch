import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import GlobalTheme from '@/src/components/global/GlobalTheme';
import ViewModifyImageToolbox from '../views/viewModifyImageToolbox';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';
import { useLayoutCtx } from '@/src/hooks/contexts/useLayoutCtx';
import { useInteractiveLayoutCtx } from '@/src/hooks/contexts/useInteractiveCtx';
import useMutableGestures from '@/src/hooks/contexts/useMutableGestures';
import { Item } from '@/src/customTypes/itemTypes';

const { colors } = GlobalTheme();

interface Props {
  item: Item;
}

const MutableItem = ({ item }: Props) => {
  const { activeItemCtx, items } = useItemCtx();
  const { layout } = useLayoutCtx();
  const { setFirstSelected, setSecondSelected } = useInteractiveLayoutCtx();
  const [tapCoordinates, setTapCoordinates] = useState({ x: 0, y: 0 });

  const {
    positionX,
    positionY,
    rotation,
    scale,
    handleTap,
    gestures,
    handSparklesDragGesture,
    tapCoordinatesX,
    tapCoordinatesY,
  } = useMutableGestures(item, setTapCoordinates);

  // this is required in order to prevent temporary inaccurate depictions of translation during layout config selection, over or underscaling due to changes being doubled since
  // animated values and context values are being combined.
  useEffect(() => {
    if (layout) {
      positionX.value = 0;
      positionY.value = 0;
      rotation.value = 0;
    } else {
      scale.value = 1;
      positionX.value = item.translateX;
      positionY.value = item.translateY;
    }
  }, [item.height, item.translateY, layout])

  const handStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 / scale.value }], // Inverse scaling
  }));

  // Animated styles for item transformation
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
      { rotateZ: `${rotation.value}rad` },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={gestures}>
      <Animated.View
        style={[
          styles.itemContainer,
          { width: item.width, height: item.height, zIndex: item.zIndex },
          animatedStyle,
        ]}>

        <TouchableOpacity
          onPress={(evt) => handleTap(evt, item, layout, setFirstSelected, setSecondSelected, setTapCoordinates, tapCoordinatesX, tapCoordinatesY)}
          activeOpacity={0.9}>

          {activeItemCtx?.id === item.id && (
            <GestureDetector gesture={handSparklesDragGesture}>
              <Animated.View style={[styles.hand, { left: item.width - 20, top: -20 }, handStyle]}>
                <FontAwesome5 name={'hand-sparkles'} size={30} color={colors.FireyPink} style={styles.sparkleHand}/>
              </Animated.View>
            </GestureDetector>
          )}
          
          {item.type !== 'text' ? (
            <Image source={{ uri: item.imageInfo.uri }} style={[{ width: item.width, height: item.height, zIndex: item.zIndex }, activeItemCtx?.id == item.id && styles.itemSelected]} />
          ) : (
            <Text style={[styles.text, { fontFamily: item.font, color: item.color }]}>{item.text}</Text>
          )}
        </TouchableOpacity>

        {/* Toolbox for modifying images */}
        {(item.type === 'image' && activeItemCtx?.id === item.id && tapCoordinates.x !== 0 && tapCoordinates.y !== 0) && (
          <Animated.View style={[styles.toolbox, { transform: [{ translateX: tapCoordinatesX.value - 30 }, { translateY: tapCoordinatesY.value - 30 }] }]}>
            <ViewModifyImageToolbox />
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  itemContainer: { position: 'absolute' },
  itemSelected: {
    borderWidth: 2,
    borderColor: colors.FireyPink,
    zIndex: 999,
  },
  sparkleHand: {
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
    fontSize: 30
  },
  hand: {
    position: 'absolute',
    zIndex: 9999999,
  },
  toolbox: { position: 'absolute', zIndex: 999 },
  text: {
    zIndex: 9,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
  }
});

export default MutableItem;
