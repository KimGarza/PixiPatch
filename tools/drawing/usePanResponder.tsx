import { useRef, useContext, useEffect } from 'react';
import { PanResponder, PanResponderInstance, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { useDrawCtx } from './DrawCtx';
import { Point, PathData } from '@/customTypes/itemTypes';

function usePanResponder(onPathUpdate: (newPath: PathData) => void) { 

  const { setDrawingPaths, activeSize, activeColor } = useDrawCtx(); // toi set a new drawingPath into the array of paths within ctx
  const currentPathRef = useRef<PathData>({
    points: [],
    strokeWidth: activeSize,
    strokeColor: activeColor,
  }); // keeps track of current path as ref, the useState is what allows updates to see gesture in DrawUtil

  useEffect(() => {
    currentPathRef.current.strokeWidth = activeSize;
    currentPathRef.current.strokeColor = activeColor;

  }, [activeColor, activeSize])

  const panResponder = useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true, 
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt: GestureResponderEvent) => {

        const { locationX, locationY } = evt.nativeEvent; // start touch point
        const initialPoint: Point = { x: locationX, y: locationY };

        currentPathRef.current = {points: [initialPoint], strokeWidth: currentPathRef.current.strokeWidth, strokeColor: currentPathRef.current.strokeColor}; // store the initial point (type Point which contains coordinates for x and y) in the current useRef state 
        onPathUpdate(currentPathRef.current); // callback that when handled sets the .current value to the usestate for state updates so live gesture can be seen drawn on screen
      },
      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {

        const { locationX, locationY } = evt.nativeEvent; // get the coordinates for the movement

        // use spread operator (however many paths in there) plus the new path (x and y) locations which were assigned above locationX and locationY
        currentPathRef.current = {
          ...currentPathRef.current, 
          points: [ ...currentPathRef.current.points, {x: locationX, y: locationY} ],
          strokeWidth: currentPathRef.current.strokeWidth, strokeColor: currentPathRef.current.strokeColor};  // array of points (x,y) make up one path
          onPathUpdate(currentPathRef.current);
      },
      onPanResponderRelease: () => {

        // console.log("logging color and size within the release ", currentPathRef.current.strokeWidth, currentPathRef.current.strokeColor)
        setDrawingPaths(prevPaths => [ // setting the array of paths to add the new completed path
          ...prevPaths, 
          { 
            points: currentPathRef.current.points, 
            strokeWidth: currentPathRef.current.strokeWidth, 
            strokeColor: currentPathRef.current.strokeColor 
          }
        ]);
      },
    })
  ).current;

  return { panResponder, currentPathRef };
}

export default usePanResponder;
