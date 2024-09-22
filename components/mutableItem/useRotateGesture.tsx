// useRotationGesture.ts
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

const ROTATION_SNAP_THRESHOLD = Math.PI / 36;
const SNAP_ANGLES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2, 2 * Math.PI]; // 0°, 90°, 180°, 270°, 360°

const useRotationGesture = (rotation: any, updateTransformState: () => void) => {
  const savedRotation = useSharedValue(rotation.value);

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

  return rotationGesture;
};

export default useRotationGesture;
