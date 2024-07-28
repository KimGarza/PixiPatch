import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DrawUtil from "./DrawUtil";

interface DrawToolProps {
    children?: React.ReactNode;
    menuToggle: () => void;
}

// upon selecing child icon, handleDrawTool will toggle isDrawing, the only other time it is clicked it will turn it off, meaning that drawing is done
// so all strokes associated with that drawing will be grouped and then saved as it's own thing (kind like how photos can be edited but it is more limited in terms of editing options like simply movement and scaling)
const DrawTool: React.FC<DrawToolProps> = ({ children, menuToggle }) => {

    const [isDrawing, setIsDrawing] = useState(false);

    const handleDrawTool = () => {
        setIsDrawing(!isDrawing);
        menuToggle();
    };

return (
    <View>
        <TouchableOpacity onPress={handleDrawTool}>
            {children}
        </TouchableOpacity>
        {isDrawing && <DrawUtil isDrawing={isDrawing} />}
    </View>
);
}

export default DrawTool;