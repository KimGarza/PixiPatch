import { TouchableOpacity } from "react-native";
import { useState } from "react";


interface BackgroundToolProps {
    children?: React.ReactNode,
    menuToggle: () => void;
}

const BackgroundTool: React.FC<BackgroundToolProps> = ({ children, menuToggle }) => {
    const [toggleBackgroundSelect, setToggleBackgroundSelect] = useState<boolean>(false);

    
    const handleSelectBackground = () => {
        setToggleBackgroundSelect(!toggleBackgroundSelect);
        menuToggle(); // menu toggle comes in as false, so by ! it sets it to true same as the toggle for sticker select, then turns to false when icon is clicked again
      };

    return (
        <TouchableOpacity onPress={handleSelectBackground}>
            { children }
        </TouchableOpacity>
    );
}

export default BackgroundTool;