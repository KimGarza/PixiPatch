// usePinchGesture.ts
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

const usePinchGesture = (scale: any, updateTransformState: () => void) => {
  const savedScale = useSharedValue(scale.value);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      runOnJS(updateTransformState)();
    });

  return pinchGesture;
};

export default usePinchGesture;
