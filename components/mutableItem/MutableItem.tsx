import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import { useItemCtx } from '@/hooks/contexts/useItemCtx';
import { DrawingItem, ImageItem, StickerItem, TextItem } from '@/customTypes/itemTypes';
import Feather from '@expo/vector-icons/Feather';
import ViewModifyImageToolbox from '../views/viewModifyImageToolbox';
interface Props {
  item: ImageItem | StickerItem | DrawingItem | TextItem;
}

const MutableItem = ({ item }: Props) => {

  // prettier-ignore
  const { setActiveItemCtx, setFrontItem, addPendingChanges, activeItemCtx, deleteItems, bringToFront, frontItem } = useItemCtx();

  const [tapCount, setTapCount] = useState(0);
  const [tapCoordinates, setTapCoordinates] = useState({ x: 0, y: 0 });
  const tapCoordinatesX = useSharedValue(0);
  const tapCoordinatesY = useSharedValue(0);

  const positionX = useSharedValue(item?.translateX ?? 0);
  const positionY = useSharedValue(item?.translateY ?? 0);
  const savedPositionX = useSharedValue(item?.translateX ?? 0);
  const savedPositionY = useSharedValue(item?.translateY ?? 0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(item?.rotation ?? 0);
  const savedRotation = useSharedValue(item?.rotation ?? 0);

const updateTransformState = () => {
    addPendingChanges(item.id, {
      positionX: positionX.value,
      positionY: positionY.value,
      rotation: rotation.value,
      scale: scale.value,
    });
  }

  // if there is a frontItem set, and it is not THIS current item,
  // then reset the tapCounter so that it doesn't store the memory of tap counts since another item has been brought to front
  useEffect(() => {
    if (frontItem != undefined && frontItem.id != item.id) {
        setTapCount(0);
    }
  }, [activeItemCtx, frontItem]);

  useEffect(() => {
  }, [item]);

  const panGesture = Gesture.Pan() // drag item
    .onUpdate((event) => {
      positionX.value = event.translationX + savedPositionX.value;
      positionY.value = event.translationY + savedPositionY.value;
    })
    .onEnd(() => {
      savedPositionX.value = positionX.value;
      savedPositionY.value = positionY.value;
      console.log("positions x", positionX.value, "y ", positionY.value)
      runOnJS(updateTransformState)(); // sync the new position with the state
    });

  const pinchGesture = Gesture.Pinch() // scale item
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      runOnJS(updateTransformState)();
    });

  // rotation gesture includes altering the actual rotation angle to snap at 90 increment
  // when near 90 degrees within about 5 degrees (could not use runOnJS or app would still crash)
  const ROTATION_SNAP_THRESHOLD = Math.PI / 36;
  const SNAP_ANGLES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI]; // 90, 180, 270, 360 in radians

  const rotationGesture = Gesture.Rotation() // rotate item
    .onUpdate((event) => {
      rotation.value = savedRotation.value + event.rotation;
      for (let snapAngle of SNAP_ANGLES) {
        if (Math.abs(rotation.value - snapAngle) < ROTATION_SNAP_THRESHOLD) {
          rotation.value = snapAngle;
          break;
        }
      }
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
      runOnJS(updateTransformState)();
    });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: positionX.value },
          { translateY: positionY.value },
          { rotateZ: `${rotation.value}rad` },
          { scale: scale.value },
        ],
      };
    });

// item animatedStyle
  const toolBoxAnimated = useAnimatedStyle(() => { // item animatedStyle
    return {
      transform: [
        { translateX: tapCoordinatesX.value - 30 },
        { translateY: tapCoordinatesY.value - 30 },
        { rotateZ: `${-rotation.value}rad` },
        { scale: 1 / scale.value },
      ],
    };
  });

  const trashIconAnimated = useAnimatedStyle(() => { // trashcan animatedStyle
    return {
      transform: [
        // inverting the rotation & scale to prevent trashcan icon from rotating with image (like a counter balance)
        { rotateZ: `${-rotation.value}rad` }, 
        { scale: 1 / scale.value },
      ],
    };
  });

  // **check for efficicey**
  const handleOnTap = (evt: GestureResponderEvent) => {
    
    if (tapCount == 0 && frontItem == undefined) { // if this item is already in the front even if not in ctx, user clicks it, they want to activate it **state issues with this, may consider useRef?**

      setActiveItemCtx(item); 
    }
    if (tapCount == 0) { // set to frontItem in ctx, (useEffect checks)

      setTapCount(1);
      bringToFront(item.id, item.type);
      const { locationX, locationY } = evt.nativeEvent; // get coordinates to track where on image user tapped for purposes of toolbox
      tapCoordinatesX.value = locationX;
      tapCoordinatesY.value = locationY;

    } else if (tapCount == 1) { // item is in foreground and user wishes to activate it

      setTapCount(2);
      const { locationX, locationY } = evt.nativeEvent; // get coordinates to track where on image user tapped for purposes of toolbox
      tapCoordinatesX.value = locationX;
      tapCoordinatesY.value = locationY;
      setTapCoordinates({ x: tapCoordinatesX.value, y: tapCoordinatesY.value }); // if image, activate editing pencil popup
      setActiveItemCtx(item);

    } else if (tapCount == 2) { // deactivate by tapping this activated image again **want to do this if user clicks outside of any image too **

      setTapCoordinates({ x: 0, y: 0 });
      setActiveItemCtx(undefined);
      setFrontItem(undefined);
      setTapCount(0);

    }
  };

  return (
    <GestureDetector gesture={Gesture.Simultaneous(rotationGesture, pinchGesture, panGesture)}>
      <Animated.View
        style={[
          styles.itemContainer,
          {
            width: item.width,
            height: item.height,
            zIndex: item.zIndex,
          },
          animatedStyle,
        ]}
      >

        {/* Tapping item */}
        <TouchableOpacity onPress={handleOnTap} style={{ zIndex: item.zIndex }} activeOpacity={0.9}>
          {item.type !== 'text' ? (
            <Image source={{ uri: item.imageInfo.uri }} style={[{ width: item.width, height: item.height, zIndex: item.zIndex },
              activeItemCtx?.id == item.id &&
              styles.itemSelected
            ]} />
          ) : (
            <Text style={[{ borderWidth: 1, fontFamily: item.font, width: item.width, height: item.height, fontSize: 42, textAlignVertical: 'center', textAlign: 'center', color: item.color, zIndex: item.zIndex }, styles.text]}>{item.text}</Text>
          )}
        </TouchableOpacity>

        {/* pencil popup for editing options on a specific image only for images */}
        {(item.type === 'image' && activeItemCtx?.id === item.id && tapCoordinates.x && tapCoordinates.y) ? (
          <Animated.View style={[styles.toolbox, toolBoxAnimated]}>
            <ViewModifyImageToolbox />
          </Animated.View>
        ) : (<></>)}
      </Animated.View>
    </GestureDetector>
  );
};

export default MutableItem;

const styles = StyleSheet.create({
  itemContainer: { position: 'absolute' },
  itemSelected: {
    borderWidth: 2,
    borderColor: '#ff0847',
    zIndex: 999,
  },
  trash: { 
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'white',
    borderRadius: 30,
    overflow: 'hidden',
  },
  toolbox: { position: 'absolute', zIndex: 999 },
  text: {
    zIndex: 9,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute'
}
});
