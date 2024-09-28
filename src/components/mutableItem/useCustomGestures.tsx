// useHandSparklesDragGesture.ts
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

const ROTATION_SNAP_THRESHOLD = Math.PI / 36;
const SNAP_ANGLES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI]; // 0°, 90°, 180°, 270°, 360°

const useCustomGestures = (
  scale: any, 
  rotation: any,
  positionX: any,
  positionY: any,
  updateTransformState: () => void) => {

  const savedPositionX = useSharedValue(positionX.value);
  const savedPositionY = useSharedValue(positionY.value);
  const savedScale = useSharedValue(scale.value);
  const savedRotation = useSharedValue(rotation.value);

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

    const rotationGesture = Gesture.Rotation()
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

  const handSparklesDragGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Adjust the scaling
      const scaleChange = 1 - event.translationY * 0.005;
      scale.value = savedScale.value * scaleChange;

      // Adjust rotation
      const rotationChange = event.translationX * 0.006;
      rotation.value = savedRotation.value + rotationChange;

      // Snap rotation
      for (let snapAngle of SNAP_ANGLES) {
        if (Math.abs(rotation.value - snapAngle) < ROTATION_SNAP_THRESHOLD) {
          rotation.value = snapAngle;
          break;
        }
      }
    })
    .onStart(() => {
      savedScale.value = scale.value;
      savedRotation.value = rotation.value;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedRotation.value = rotation.value;
      runOnJS(updateTransformState)();
    });
    
    return { panGesture, pinchGesture, rotationGesture, handSparklesDragGesture };
};

export default useCustomGestures;
