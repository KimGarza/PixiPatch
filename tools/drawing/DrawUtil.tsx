import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import usePanResponder from "./usePanResponder";
import Svg, { Path } from 'react-native-svg';
import { useDrawCtx } from "./DrawCtx";
import { useRef, useEffect } from "react";

type Point = {
    x: number;
    y: number;
  };
  type PathData = Point[];

// if an updated props value is passed in bc user clicked the close menu, whatever strokes were being made will now be grouped as one and that drawing is now finished
interface DrawUtilProps {
    isDrawing: boolean;
  }
  
const DrawUtil: React.FC<DrawUtilProps> = ({ isDrawing }) => {

    const { sizeAndColor, drawingData, setDrawingData } = useDrawCtx();
    const [activePath, setActivePath] = useState<PathData>([]); // this is the LIVE stroke/gesture, the current path being drawn

    useEffect(() => {
        console.log("DRAW UTIL ", ...drawingData)
        
    }, [drawingData])

    const testref = useRef<PathData>([]);

    const finishStroke = () => {
        if (activePath.length > 0) {
          setDrawingData(prevData => [...prevData, { path: activePath, size: sizeAndColor.size, color: sizeAndColor.color }]);
          setActivePath([]);
        }
      };

    const addPathToCtx = (newActivePath: PathData) => {
        setActivePath(newActivePath);
    }

    // 2 takes the args from the callback which are pathdata and sets it as the new active path
    const handlePathUpdateCallback = (newActivePath: PathData) => {
        setActivePath(newActivePath);
    }

    // 1 the pan responder is retrieved and a callback is passed in
    const { panResponder } = usePanResponder(handlePathUpdateCallback, finishStroke, testref);
    // Convert active path data into SVG path format
    const pathData = activePath.length ? `M${activePath.map(p => `${p.x},${p.y}`).join(' L ')}` : '';

return (
    <View style={styles.drawSpace}>
    
        <View {...panResponder.panHandlers}>
            <Svg height="100%" width="100%">
                <Path
                // the current activePath is queried for having content, if so then it will map the points by x and y location and then join L whatever that means
                // otherwise '' bc there is nothing to be = to pathData currently
                d={pathData} // so this = the current M and L which are speicifc to how d works in Path comp is svg library
                stroke={sizeAndColor.color}
                strokeWidth={sizeAndColor.size}
                fill="none"
                />

                {drawingData.map((drawing, index) => (
                <Path
                    key={index}
                    d={`M${drawing.path.map(p => `${p.x},${p.y}`).join(' L ')}`}
                    stroke="green"
                    strokeWidth="4"
                    fill="none"
                />
                ))}
            </Svg>
        </View>
    </View>
);
}

export default DrawUtil;

const styles = StyleSheet.create({
    drawSpace: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderWidth: 5, borderColor: 'blue'
    }
})