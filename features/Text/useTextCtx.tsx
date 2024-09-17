import { createContext, Dispatch, SetStateAction, useState, useContext, useEffect } from "react"
import { TextItem } from "@/customTypes/itemTypes"
interface TextCtxType {
    typing: string;
    setTyping: Dispatch<SetStateAction<string>>;
    activeText: TextItem;
    setActiveText: Dispatch<SetStateAction<TextItem>>;
    texts: TextItem[];
    setTexts: Dispatch<SetStateAction<TextItem[]>>;
    updateActiveText: (id: string) => void;
    saveActiveText: (typed: string) => void;
    updateFont: (newFont: string) => void;
    updateColor: (newColor: string) => void;
    updateHighlight: (newColor: string) => void;
}

// default value for use with creation of context
const defaultValue: TextCtxType = {
    typing: '',
    setTyping: () => {},
    activeText: {
        id: '',
        type: 'text',
        zIndex: 2,
        text: '',
        font: '',
        color: 'black',
        highlight: '',
        translateX: 0, translateY: 0,
        width: 100, height: 40,
        rotation: 0,
        pendingChanges: {scale: 1, rotation: 0, positionX: 0, positionY: 0}
    },
    setActiveText: () => {},
    texts: [],
    setTexts: () => {},
    updateActiveText: (id: string) => {},
    saveActiveText: (typed: string) => {},
    updateFont: () => {},
    // updateSize: () => {},
    updateColor: () => {},
    updateHighlight: () => {}
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
    const [typing, setTyping] = useState<string>(''); // reason for this is bc since we must define something for initial value
    const [activeText, setActiveText] = useState<TextItem>(defaultValue.activeText);
    const [texts, setTexts] = useState<TextItem[]>([]);

    // on update to 
    useEffect(() => {
           
    }, [typing, texts])

    useEffect(() => {
        console.log("activeText", activeText);
    }, [texts, activeText]);

    
  const generateId = () => {
    return Math.random().toString(36).slice(2, 11);
  }

    const saveActiveText = (typed: string) => {
        const newText: TextItem = {
            id: generateId(),
            type: 'text',
            zIndex: 2,
            text: typed, // update the 'text' property with 'typing',
            font: activeText.font,
            color: activeText.color,
            highlight: activeText.highlight,
            translateX: 0, translateY: 0,
            width: 100, height: 40,
            rotation: 0,
            pendingChanges: {scale: 1, rotation: 0, positionX: 0, positionY: 0}
        }
        setTexts((prevTexts) => [...prevTexts, newText]);
        setActiveText(newText);
        setTyping('');
    }

    // Found that doing short small methods per style was WAY more readable and practical than an object being passed 
    // through of all of the possible styling, clunky here and where it gets passed in. I'd rather this for simplicity.
    const updateActiveText = (id: string) => {
        const foundText = texts.find(text => text.id === id);

        if (foundText) {
            setActiveText(foundText);
        }
    }

    const updateFont = (newFont: string) => {
        setTexts((prevTexts) => prevTexts.map((prevText) => prevText.id == activeText.id ? {
            ...prevText,
            font: newFont
        } : prevText ))
    }

    // const updateSize = (newSize: number) => {
    //     setTexts((prevTexts) => prevTexts.map((prevText) => prevText.id == activeText.id ? {
    //         ...prevText,
    //         size: newSize
    //     } : prevText ))
    // }

    const updateColor = (newColor: string) => {
        setTexts((prevTexts) => prevTexts.map((prevText) => prevText.id == activeText.id ? {
            ...prevText,
            color: newColor
        } : prevText ))
    }

    const updateHighlight = (newColor: string) => {
        setTexts((prevTexts) => prevTexts.map((prevText) => prevText.id == activeText.id ? {
            ...prevText,
            highlight: newColor
        } : prevText ))
    }


    return (
        <TextCtx.Provider
            value={{
                typing,
                setTyping,
                activeText,
                setActiveText,
                texts,
                setTexts,
                updateActiveText,
                saveActiveText,
                updateFont,
                // updateSize,
                updateColor,
                updateHighlight
            }}
        >
            {children}
        </TextCtx.Provider> 
    );
}

export const useBackground = () => useContext(TextCtx);