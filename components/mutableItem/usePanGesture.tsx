// usePanGesture.ts
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

const usePanGesture = (positionX: any, positionY: any, updateTransformState: () => void) => {
  const savedPositionX = useSharedValue(positionX.value);
  const savedPositionY = useSharedValue(positionY.value);

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

  return panGesture;
};

export default usePanGesture;
