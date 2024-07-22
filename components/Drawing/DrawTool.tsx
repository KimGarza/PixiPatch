import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DrawUtil from "./DrawUtil";

interface DrawToolProps {
    children?: React.ReactNode;
}

// upon selecing child icon, handleDrawTool will toggle isDrawing, the only other time it is clicked it will turn it off, meaning that drawing is done
// so all strokes associated with that drawing will be grouped and then saved as it's own thing (kind like how photos can be edited but it is more limited in terms of editing options like simply movement and scaling)
const DrawTool: React.FC<DrawToolProps> = ({ children }) => {

    const [isDrawing, setIsDrawing] = useState(false);

    //     DrawUtil(isDrawing); // this line causes so much errors, cannot leave it alone or infinite loop, no if statement or unstable hooks change between renders, cannot put inside const bc it calls a comp with a useEffect
    // }

    
    const handleDrawTool = () => {
        setIsDrawing(!isDrawing);
        console.log("isDrawing:", !isDrawing);
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