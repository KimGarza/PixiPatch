import { ImageSourcePropType } from "react-native"
import { createContext, Dispatch, SetStateAction, useState, useContext } from "react"

// what is accessible from context
interface useBackgroundCtxType {
    background: ImageSourcePropType,
    setBackground: Dispatch<SetStateAction<ImageSourcePropType>>,
}

// default value for use with creation of context
const defaultValue: useBackgroundCtxType = {
    background: require('../../../assets/images/bgPacks/basic/white.png') as ImageSourcePropType,
    setBackground: () => {},
}

// create context
export const useBackgroundCtx = createContext<useBackgroundCtxType>(defaultValue);

export const useuseBackgroundCtx = () => {
    const context = useContext(useBackgroundCtx);
    if (context == undefined) {
        throw new Error("useuseBackgroundCtx must be used within an BackgroundProvider");
    }
}

interface useBackgroundCtxProps {
    children?: React.ReactNode;
}

// create provider to be a wrapper
export const BackgroundProvider: React.FC<useBackgroundCtxProps> = ({ children }) => {
    const [background, setBackground] = useState<ImageSourcePropType>(defaultValue.background); // reason for this is bc since we must define something for initial value

    return (
        <useBackgroundCtx.Provider
        value={{
            background,
            setBackground,
        }}
        >
            {children}
        </useBackgroundCtx.Provider> 
    );
}

export const useBackground = () => useContext(useBackgroundCtx);