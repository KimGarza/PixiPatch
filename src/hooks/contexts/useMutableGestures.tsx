import { useSharedValue, runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { Item } from '@/src/customTypes/itemTypes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';
import { LayoutConfig } from '@/src/customTypes/itemTypes';
import { useLayoutCtx } from './useLayoutCtx';

const useMutableGestures = (item: Item, setTapCoordinates: Dispatch<SetStateAction<{x: number, y: number}>>) => {
  const { addPendingChanges } = useItemCtx();
  const { activeItemCtx, setActiveItemCtx, bringToFront, frontItem, setFrontItem } = useItemCtx();
  const { layout, tempScales } = useLayoutCtx();
  const [tapCount, setTapCount] = useState(0);
  
  const positionX = useSharedValue(item?.translateX ?? 0);
  const positionY = useSharedValue(item?.translateY ?? 0);
  const savedPositionX = useSharedValue(positionX.value);
  const savedPositionY = useSharedValue(positionY.value);
  const scale = useSharedValue(tempScales[item.id] ?? 1)
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(item?.rotation ?? 0);
  const savedRotation = useSharedValue(rotation.value);
  const tapCoordinatesX = useSharedValue(0);
  const tapCoordinatesY = useSharedValue(0);

  // adds the current positioning into context to later be officially changed (not immediately due to app crashing issues)
  const updateTransformState = () => {
    addPendingChanges(item.id, {
      positionX: positionX.value,
      positionY: positionY.value,
      rotation: rotation.value,
      scale: scale.value,
    });
  };

  // listens for layout toggle
  useEffect(() => {
    if (item.type == "image" && layout) { // have to be 0 so that the x,y location can be starting at 0 while
      positionX.value = 0;
      positionY.value = 0;
      savedPositionX.value = 0;
      savedPositionY.value = 0;

    } else {
      positionX.value = item?.translateX;
      positionY.value = item?.translateY;
      savedPositionX.value = item?.translateX;
      savedPositionY.value = item?.translateY;
      scale.value = 1;
    }

    rotation.value = item?.rotation ?? rotation.value;
    savedRotation.value = item?.rotation ?? savedRotation.value;
  }, [layout])

  // check for updates to front and active items to rerender upon change
  useEffect(() => {
    if (tempScales[item.id]) {
      scale.value = tempScales[item.id];
    }
  }, [tempScales]);
  
  // keeps tabs on if another item is now the frontItem or activeItem causing this item tap count to go back to 0
  useEffect(() => {
    if (frontItem?.id !== item.id || activeItemCtx?.id !== item.id) { 
      setTapCount(0);
    }
  }, [frontItem, activeItemCtx])

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      positionX.value = event.translationX + savedPositionX.value;
      positionY.value = event.translationY + savedPositionY.value;
    })
    .onEnd(() => {
      savedPositionX.value = positionX.value;
      savedPositionY.value = positionY.value;
      runOnJS(updateTransformState)();
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      runOnJS(updateTransformState)();
    });

  // rotation gesture includes altering the actual rotation angle to snap at 90 increment
  // when near 90 degrees within about 5 degrees (could not use runOnJS or app would still crash)
  const ROTATION_SNAP_THRESHOLD = Math.PI / 36; // 5 degrees threshold
  const SNAP_ANGLES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI]; // 0, 90, 180, 270, 360
  
  const rotationGesture = Gesture.Rotation()
    .onUpdate((event) => {
      let newRotation = savedRotation.value + event.rotation;
  
      // ✅ Keep rotation within 0 to 360 degrees (radians)
      if (newRotation < 0) newRotation += 2 * Math.PI; 
      if (newRotation > 2 * Math.PI) newRotation -= 2 * Math.PI;
  
      // ✅ Fix: Snaps in BOTH directions (clockwise & counterclockwise)
      for (let snapAngle of SNAP_ANGLES) {
        if (Math.abs(newRotation - snapAngle) < ROTATION_SNAP_THRESHOLD) {
          newRotation = snapAngle;
          break;
        }
      }
  
      rotation.value = newRotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value; // ✅ Only save the final rotation after gesture ends
      runOnJS(updateTransformState)();
    });

    const handSparklesDragGesture = Gesture.Pan()
    .onStart(() => {
      // Save initial values at the start of the gesture
      savedScale.value = scale.value;
      savedRotation.value = rotation.value;
    })
    .onUpdate((event) => {
      // Adjust scale based on Y-axis drag (inverted for natural feel)
      const scaleChange = 1 - event.translationY * 0.007;
      scale.value = savedScale.value * scaleChange;
  
      // Adjust rotation based on X-axis drag
      const rotationChange = event.translationX * 0.007;
      let newRotation = savedRotation.value + rotationChange;
  
      // Ensure rotation stays within 0 - 360 degrees (radians)
      if (newRotation < 0) newRotation += 2 * Math.PI;
      if (newRotation > 2 * Math.PI) newRotation -= 2 * Math.PI;
  
      // Snap to 90-degree increments if within threshold
      for (let snapAngle of SNAP_ANGLES) {
        if (Math.abs(newRotation - snapAngle) < ROTATION_SNAP_THRESHOLD) {
          newRotation = snapAngle;
          break;
        }
      }
  
      // Update the shared rotation value safely
      rotation.value = newRotation;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedRotation.value = rotation.value;
      runOnJS(updateTransformState)(); // Store updated values
    });

  const handleTap = (
    evt: GestureResponderEvent,  // The tap event from React Native
    item: Item,  // The item being tapped (Image, Sticker, Drawing, Text)
    layout: LayoutConfig | null,  // Whether layout mode is active
    setFirstSelected: Dispatch<SetStateAction<string | null>>,  // State setter for first selected item
    setSecondSelected: Dispatch<SetStateAction<string | null>>,  // State setter for second selected item
    setTapCoordinates: Dispatch<SetStateAction<{ x: number; y: number }>>, // State setter for tap coordinates
    tapCoordinatesX: { value: number }, // Shared value for tap X coordinate
    tapCoordinatesY: { value: number } // Shared value for tap Y coordinate
  ) => {
    if (layout) {
      // setFirstSelected(null);
      // setSecondSelected(null);
    }
    if (!activeItemCtx && item.id == frontItem?.id) { // if THIS item IS in the front and is NOT currently active...
      setActiveItemCtx(item);
    } else if (tapCount == 0) { // if THIS item is NOT in front and user tapped: they wish to bring to front...
      setTapCount(1);
      bringToFront(item.id, item.type);
    } else if (tapCount == 1) { // if THIS item was brought to front but not yet activated: user wishes to active...
      tapCoordinatesX.value = evt.nativeEvent.locationX;
      tapCoordinatesY.value = evt.nativeEvent.locationY;
      setTapCoordinates({ x: tapCoordinatesX.value, y: tapCoordinatesY.value });
      setTapCount(2);
      setActiveItemCtx(item);
    } else if (tapCount == 2) { // if THIS item is activated, user taps again: they wish to deactivate
      setTapCoordinates({ x: 0, y: 0 });
      setActiveItemCtx(undefined);
      setFrontItem(undefined);
      setTapCount(0);
    };
  };

  return {
    positionX,
    positionY,
    rotation,
    scale,
    handleTap,
    gestures: Gesture.Simultaneous(panGesture, pinchGesture, rotationGesture), handSparklesDragGesture,
    tapCoordinatesX,
    tapCoordinatesY
  };
};

export default useMutableGestures;
