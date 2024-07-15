import React, { useState } from "react";
import { TouchableOpacity, View, Dimensions, Text } from "react-native";
import Svg, { Path } from 'react-native-svg';
import usePanResponder from './usePanResponder';

const { width, height } = Dimensions.get('window');

// type for children
interface DrawToolProps {
    children?: React.ReactNode;
}

// type for path
type Point = {
  x: number;
  y: number;
};
type PathData = Point[];

const DrawTool: React.FC<DrawToolProps> = ({ children }) => {

    const [isDrawing, setIsDrawing] = useState(false);
    const [activePath, setActivePath] = useState<PathData>([]);
    const [paths, setPaths] = useState<PathData[]>([]);
    const pathData = activePath.length
    ? `M${activePath.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

    const handleDrawTool = () => {
        setIsDrawing(!isDrawing);
    };

    const handlePathUpdate = (newPath: PathData) => { // ??? it's a callback
        console.log('handle path update callback triggered by usePanResponder');
        console.log('newPath:', newPath);
        setActivePath(newPath);

        
    };

    const { panResponder } = usePanResponder(handlePathUpdate);


return (
    <View>
        <TouchableOpacity onPress={handleDrawTool}>
            <Text>{isDrawing ? 'Stop Drawing' : 'Start Drawing'}</Text>
            {children}
        </TouchableOpacity>

        {isDrawing && (
            <View {...panResponder.panHandlers}>
                <Text>Testingggg</Text>
                <Svg height="100%" width="100%">
                    <Path
                    d={pathData}
                    stroke="black"
                    strokeWidth="3"
                    fill="none"
                    />
                </Svg>
            </View>
        )}
        {/* {isDrawing && (
            /// ???
            <View {...panResponder.panHandlers}> / /When you attach panHandlers to a View, that View becomes the touchable area that responds to gestures.
                <Svg height="100%" width="100%">
                    <Path
                        d={`M${currentPath.map(p => `${p.x},${p.y}`).join(' L ')}`} // ???
                        stroke="black"
                        strokeWidth="3"
                        fill="none"
                    />
                </Svg>
            </View>
        )} */}
    </View>
);
}

export default DrawTool;