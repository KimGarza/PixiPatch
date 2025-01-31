import { ImageSourcePropType } from "react-native"
import { createContext, Dispatch, SetStateAction, useState, useContext } from "react"

// what is accessible from context
interface useLayoutCtxType {
    layout: ImageSourcePropType,
    setLayout: Dispatch<SetStateAction<ImageSourcePropType>>,
}

// default value for use with creation of context
const defaultValue: useLayoutCtxType = {
    layout: require('../../assets/images/layouts/images.png') as ImageSourcePropType,
    setLayout: () => {},
}

// create context
export const layoutCtx = createContext<useLayoutCtxType>(defaultValue);

export const useLayoutCtx = () => {
    const context = useContext(layoutCtx);
    if (context == undefined) {
        throw new Error("useuseLayoutCtx must be used within an LayoutProvider");
    }

    return context;
}

interface Props {
    children?: React.ReactNode;
}

// create provider to be a wrapper
export const LayoutProvider: React.FC<Props> = ({ children }) => {
    const [layout, setLayout] = useState<ImageSourcePropType>(defaultValue.layout);

    return (
        <layoutCtx.Provider
        value={{
            layout,
            setLayout,
        }}
        >
            {children}
        </layoutCtx.Provider> 
    );
}