import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import usePanResponder from "./usePanResponder";
import Svg, { Path } from 'react-native-svg';
import { useDrawCtx } from "./DrawCtx";
import { PathData } from "@/src/customTypes/itemTypes";
import { useItemCtx } from "@/src/hooks/contexts/useItemCtx";
import { DrawingItem } from "@/src/customTypes/itemTypes";
import { useRouter } from "expo-router";
import SaveDrawing from "@/src/components/save/saveDrawing";
import GlobalDimensions from "@/src/components/dimensions/globalDimensions";

const { width } = GlobalDimensions();
interface Props {
    isDone: boolean;
    isCleared: boolean;
}

const DrawUtil: React.FC<Props> = ({ isDone, isCleared }) => {

    const router = useRouter();
    const { drawingPaths, activeSize, activeColor, clearCanvas } = useDrawCtx();
    const { createItems, updatePendingChanges } = useItemCtx();

    const [activePath, setActivePath] = useState<PathData>({ points: [], strokeWidth: 3, strokeColor: 'black'});

    const viewRef = useRef(null);
    
    
    useEffect(() => {
        if (isDone && viewRef && viewRef != null) {
            handleSaveDrawing();
        }
        if (isCleared) {
            clearCanvas();
            setActivePath({ points: [], strokeWidth: 3, strokeColor: 'black'});
        }
    }, [isDone, isCleared])


    const handleSaveDrawing = async () => {
        try {
            if (drawingPaths.length > 0) {
                const newUri = await SaveDrawing(viewRef);
        
                if (newUri) {

                    const x = Math.floor(Math.random() * (width * 0.5)) + (width * 0.25);
                    const y = Math.floor(Math.random() * (width * 0.5)) + (width * 0.25);
                
                    const drawingItem: DrawingItem[] = [
                        {
                            id: '', type: 'drawing', zIndex: 2,
                            imageInfo: {uri: newUri, height: 1000, width: 1000},
                            translateX: x,
                            translateY: y,
                            height: 150, width: 150,
                            rotation: 0,
                            pendingChanges: {rotation: 0, positionX: x, positionY: y, scale: 1},
                        }
                    ]
                    createItems({ itemType: 'drawing', properties: drawingItem });
                    clearCanvas();
                }          
            }

            router.push('/(screens)/editor');
            updatePendingChanges()
            
        } catch (error) {
            console.log('Failed to save drawing ', error)
        }
    }

    const handlePathUpdateCallback = (newActivePath: PathData) => {
        setActivePath(newActivePath); // constantly being drawin live on the screen
    }
    // takes in callback that provides the currently active stroke on each movement (in onPanResponderMove) ^^
    const { panResponder } = usePanResponder(handlePathUpdateCallback);

    // converts the active path data into SVG path format to be displayed
    let pathData = activePath.points.length ? `M${activePath.points.map(p => `${p.x},${p.y}`).join(' L ')}` : '';


// display first the live currently active gestured stroke which uses panhandlers
return (
    <View style={styles.drawSpace} ref={viewRef} collapsable={false}>
        <View {...panResponder.panHandlers}>

            <Svg height="100%" width="100%">

        {/* display next the previous strokes that make up the image from drawCtx */}
        {drawingPaths.map((drawnPath, index) => (
            <Path
                key={index}
                d={`M${drawnPath.points.map(p => `${p.x},${p.y}`).join(' L ')}`}
                stroke={drawnPath.strokeColor}
                strokeWidth={drawnPath.strokeWidth}
                fill="none"
                strokeLinejoin="round" // strokeLinejoin="miter" is default miter join when stroke breaks through acute angle can cause artifacts, this resolves it!!
                strokeMiterlimit={10}
                strokeLinecap="round"
            />
            ))}

            <Path
                d={pathData} // so this = the current M and L which are speicifc to how d works in Path comp is svg library
                stroke={activeColor}
                strokeWidth={activeSize}
                fill="none"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeLinecap="round"
                />
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
    }
})