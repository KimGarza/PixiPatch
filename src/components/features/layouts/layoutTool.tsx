import { TouchableOpacity } from "react-native";
import { useState } from "react";


interface LayoutToolProps {
    children?: React.ReactNode,
    menuToggle: () => void;
}

const LayoutTool: React.FC<LayoutToolProps> = ({ children, menuToggle }) => {
    const [toggleLayoutSelect, setToggleLayoutSelect] = useState<boolean>(false);
    
    const handleSelectLayout = () => {
        setToggleLayoutSelect(!toggleLayoutSelect);
        menuToggle(); // menu toggle comes in as false, so by ! it sets it to true same as the toggle for sticker select, then turns to false when icon is clicked again
      };

    return (
        <TouchableOpacity onPress={handleSelectLayout}>
            { children }
        </TouchableOpacity>
    );
}

export default LayoutTool;