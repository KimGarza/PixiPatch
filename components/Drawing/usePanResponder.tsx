import { useRef, useContext } from 'react';
import { PanResponder, PanResponderInstance, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { DrawCtx } from './DrawCtx';

// type for path
type Point = {
  x: number;
  y: number;
};
type PathData = Point[];

interface DrawingData {
  path: PathData;
  top: number;
  left: number;
}

// custom hook for pan responder
function usePanResponder(onPathUpdate: (newPath: PathData) => void) { // ?

  const { setDrawingData } = useContext(DrawCtx);
  const currentPathRef = useRef<PathData>([]);

  const convertToDrawingData = (path: PathData) => {
    const covnerted: DrawingData = {
      path: path,
      top: Math.floor(Math.random() * (51 - 10)) + 10,
      left: Math.floor(Math.random() * (61 - 20)) + 20
    }
    return covnerted;
  }

  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, 
      onMoveShouldSetPanResponder: () => true, // move gesture
      onPanResponderGrant: (evt: GestureResponderEvent) => { // grant is start touch point
        // get the coordinates for starting touch point
        const { locationX, locationY } = evt.nativeEvent;
        const initialPoint: Point = { x: locationX, y: locationY };
        currentPathRef.current = [initialPoint]; // store the initial point (type Point which contains coordinates for x and y) in the current useRef state 
        onPathUpdate(currentPathRef.current); 
      },
      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => { // ?
        // get the coordinates for the movement
        const { locationX, locationY } = evt.nativeEvent;
        // store spread operator (however many is in there) from current of currentPathRef + the new x and y locations which were assigned above locationX and locationY
        currentPathRef.current = [...currentPathRef.current, { x: locationX, y: locationY }]; 
        onPathUpdate(currentPathRef.current);
      },
      onPanResponderRelease: () => {
        // Optionally handle the end of the gesture
      },
    })
  ).current;

  const drawing = convertToDrawingData(currentPathRef.current); 
  setDrawingData(prevDrawingData => [...prevDrawingData, drawing]);

  return { panResponder, currentPathRef };
}

export default usePanResponder;
