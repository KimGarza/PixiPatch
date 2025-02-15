import React, { useState } from 'react';
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
import { useEffect } from 'react';

const { colors } = GlobalTheme();

interface Props {
  item: Item;
}

const MutableItemRF = ({ item }: Props) => {
  const { activeItemCtx, setActiveItemCtx, bringToFront, frontItem } = useItemCtx();
  const { layout } = useLayoutCtx();
  const { firstSelected, secondSelected, setFirstSelected, setSecondSelected } = useInteractiveLayoutCtx();
  const [tapCoordinates, setTapCoordinates] = useState({ x: 0, y: 0 });

  const {
    positionX,
    positionY,
    rotation,
    scale,
    handleTap,
    gestures,
    tapCoordinatesX,
    tapCoordinatesY
  } = useMutableGestures(item, setTapCoordinates);


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
          { width: item.width, height: item.height, zIndex: item.zIndex,
             overflow: item.type == "image" && item.layoutActive ? 'hidden' : 'visible'
           },
          animatedStyle,
        ]}>
        
        <TouchableOpacity onPress={(evt) => handleTap(evt, item, layout, setFirstSelected, setSecondSelected, setTapCoordinates, tapCoordinatesX, tapCoordinatesY)} activeOpacity={0.9}>
          {/* <MutableItemRenderer item={item} active={activeItemCtx?.id === item.id} /> */}
           {item.type !== 'text' ? (
            <Image source={{ uri: item.imageInfo.uri }} style={[{ opacity: 1, width: item.width, height: item.height, zIndex: item.zIndex, objectFit: 'fill' },
              activeItemCtx?.id == item.id &&
              styles.itemSelected
            ]} />
            ) : (
              <Text style={[{ borderWidth: 1, fontFamily: item.font, width: item.width, height: item.height, fontSize: 42, textAlignVertical: 'center', textAlign: 'center', color: item.color, zIndex: item.zIndex }, styles.text]}>{item.text}</Text>
            )}
        </TouchableOpacity>

          {(!layout && item.type === 'image' && activeItemCtx?.id === item.id && tapCoordinates.x && tapCoordinates.y) && (
          <Animated.View style={[styles.toolbox, { transform: [{ translateX: tapCoordinatesX.value - 30 }, { translateY: tapCoordinatesY.value - 30 }] }]}>  
            <ViewModifyImageToolbox />
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

// const MutableItemRenderer = ({ item, active }: { item: Props['item'], active: boolean }) => {
//   return item.type !== 'text' ? (
//     <Image source={{ uri: item.imageInfo.uri }} style={[styles.image, active && styles.itemSelected]} />
//   ) : (
//     <Text style={[styles.text, { fontFamily: item.font, color: item.color }]}>{item.text}</Text>
//   );
// };

const styles = StyleSheet.create({
  itemContainer: { position: 'absolute' },
  image: { objectFit: 'fill' },
  itemSelected: { borderWidth: 2, borderColor: colors.FireyPink },
  toolbox: { position: 'absolute', zIndex: 999 },
  text: { textAlign: 'center', textAlignVertical: 'center', position: 'absolute', fontSize: 42 }
});

export default MutableItemRF;