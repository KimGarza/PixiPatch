import { useRef, useContext } from 'react';
import { PanResponder, PanResponderInstance, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { DrawCtx } from './DrawCtx';
import { Point, PathData, DrawingData } from '@/customTypes/itemTypes';
import { RefObject } from 'react';

function usePanResponder(onPathUpdate: (newPath: PathData) => void, finishStroke: () => void, testRef: RefObject<PathData>) { 
// basically within usePanResponder, we pass new useRef.current values to onPathUpdate function with each new gesture, this in turn sends it up to DrawUtil which

  const { setDrawingData } = useContext(DrawCtx);
  const currentPathRef = useRef<PathData>([]);

  const convertToDrawingData = (path: PathData) => {
    const covnerted: DrawingData = {
      path: path,
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
      // onPanResponderRelease: () => {
      //   const drawing = convertToDrawingData(currentPathRef.current); 
      //   console.log("on release here is the drawing: ", drawing);
      //   setDrawingData(prevDrawingData => [...prevDrawingData, drawing]);
      // },
      onPanResponderRelease: () => {
        setDrawingData(prevData => [...prevData, { path: currentPathRef.current, size: 3, color: "blue" }]);
      },
    })
  ).current;

  return { panResponder, currentPathRef };
}

export default usePanResponder;
