import { ImageSourcePropType } from "react-native"
import { createContext, Dispatch, SetStateAction, useState, useContext } from "react"

// what is accessible from context
interface BackgroundCtxType {
    background: ImageSourcePropType,
    setBackground: Dispatch<SetStateAction<ImageSourcePropType>>,
}

// default value for use with creation of context
const defaultValue: BackgroundCtxType = {
    background: require('../../assets/images/backgrounds/backgroundwhite.png') as ImageSourcePropType,
    setBackground: () => {},
}

// create context
export const BackgroundCtx = createContext<BackgroundCtxType>(defaultValue);


interface BackgroundCtxProps {
    children?: React.ReactNode;
}

// create provider to be a wrapper
export const BackgroundProvider: React.FC<BackgroundCtxProps> = ({ children }) => {
    const [background, setBackground] = useState<ImageSourcePropType>(defaultValue.background); // reason for this is bc since we must define something for initial value

    return (
        <BackgroundCtx.Provider
        value={{
            background,
            setBackground,
        }}
        >
            {children}
        </BackgroundCtx.Provider> 
    );
}

export const useBackground = () => useContext(BackgroundCtx);