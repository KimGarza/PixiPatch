import { createContext, Dispatch, SetStateAction, useState, useContext, useEffect } from "react"

// what is accessible from context
interface TextCtxType {
    activeText: string | undefined;
    setActiveText: Dispatch<SetStateAction<string | undefined>>;
    styling: {font: string, size: number, color: string, style: string};
    setStyling: Dispatch<SetStateAction<{font: string, size: number, color: string, style: 'normal' | 'italic' | 'bold'}>>;
}

// default value for use with creation of context
const defaultValue: TextCtxType = {
    activeText: undefined,
    setActiveText: () => {},
    styling: {font: '', size: 32, color: 'black', style: 'normal'},
    setStyling: () => {},
}

// create context
export const TextCtx = createContext<TextCtxType>(defaultValue);

export const useTextCtx = () => {
    const context = useContext(TextCtx);
  
    if (context === undefined) {
        throw new Error("useImageCxt must be used within an ImageProvider");
    }
    return context;
};

interface TextCtxProps {
    children?: React.ReactNode;
}

// create provider to be a wrapper
export const TextProvider: React.FC<TextCtxProps> = ({ children }) => {
    const [activeText, setActiveText] = useState<string | undefined>(undefined); // reason for this is bc since we must define something for initial value
    const [styling, setStyling] = useState<{font: string, size: number, color: string, style: 'normal' | 'italic' | 'bold'}>
    ({font: '', size: 32, color: 'black', style: 'normal'});

    useEffect(() => {
        console.log("active text from ctx", activeText)
    }, [activeText])

    return (
        <TextCtx.Provider
            value={{
                activeText,
                setActiveText,
                styling,
                setStyling
            }}
        >
            {children}
        </TextCtx.Provider> 
    );
}

export const useBackground = () => useContext(TextCtx);