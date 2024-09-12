import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import usePanResponder from "./usePanResponder";
import Svg, { Path } from 'react-native-svg';
import { useDrawCtx } from "./DrawCtx";
import { PathData, } from '@/customTypes/itemTypes';
import { useItemCtx } from "@/hooks/contexts/useItemCtx";
import { DrawingItem } from "@/customTypes/itemTypes";
import { useRouter } from "expo-router";
import SaveDrawing from "@/components/save/saveDrawing";
import GlobalDimensions from '@/components/dimensions/globalDimensions';

const { width } = GlobalDimensions();
interface Props {
    isDone: boolean;
}

const DrawUtil: React.FC<Props> = ({ isDone }) => {

    const router = useRouter();
    const { drawingPaths, activeSize, activeColor } = useDrawCtx();
    const { createItems } = useItemCtx();

    const [activePath, setActivePath] = useState<PathData>({ points: [], strokeWidth: 3, strokeColor: 'black'});

    const viewRef = useRef(null);

    useEffect(() => {
        if (isDone && viewRef && viewRef != null) {
            handleSaveDrawing();
        }
    }, [isDone])

    const handleSaveDrawing = async () => {
        try {
            const newUri = await SaveDrawing(viewRef);
    
            if (newUri) {
                const drawingItem: DrawingItem[] = [
                    {
                        id: '', type: 'drawing', zIndex: 2,
                        imageInfo: {uri: newUri, height: 1000, width: 1000},
                        translateX: Math.floor(Math.random() * (width * 0.5)) + (width * 0.25),
                        translateY: Math.floor(Math.random() * (width * 0.5)) + (width * 0.25),
                        height: 150, width: 150,
                        rotation: 0,
                        pendingChanges: {scale: 1, rotation: 0, positionX: 0, positionY: 0}
                    }
                 ]
                 createItems({ itemType: 'drawing', properties: drawingItem });
         
                 router.push('/(screens)/editor');
            }
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
    const pathData = activePath.points.length ? `M${activePath.points.map(p => `${p.x},${p.y}`).join(' L ')}` : '';


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