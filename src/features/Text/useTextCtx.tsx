import { createContext, Dispatch, SetStateAction, useState, useContext, useEffect } from "react"
import { TextItem } from "@/src/customTypes/itemTypes";
import GlobalDimensions from "@/src/components/dimensions/globalDimensions";

const { width } = GlobalDimensions();
interface TextCtxType {
    typing: string;
    setTyping: Dispatch<SetStateAction<string>>;
    activeText: TextItem;
    setActiveText: Dispatch<SetStateAction<TextItem>>;
    textsCtx: TextItem[];
    setTextsCtx: Dispatch<SetStateAction<TextItem[]>>;
    updateActiveText: (id: string) => void;
    saveActiveText: (typed: string) => void;
    updateFont: (newFont: string) => void;
    updateColor: (newColor: string) => void;
    updateHighlight: (newColor: string) => void;
}

const x = Math.floor(Math.random() * (width * 0.5)) + (width * 0.25);
const y = Math.floor(Math.random() * (width * 0.5)) + (width * 0.25);

const defaultValue: TextCtxType = {

    typing: '',
    setTyping: () => {},
    activeText: {
        id: '', type: 'text', zIndex: 2,
        text: '',
        font: '',
        size: 42,
        color: 'black',
        highlight: '',
        translateX: 20, translateY: 20,
        width: 200, height: 100,
        rotation: 0,
        pendingChanges: {rotation: 0, positionX: x, positionY: x, scale: 1},

    },
    setActiveText: () => {},
    textsCtx: [],
    setTextsCtx: () => {},
    updateActiveText: (id: string) => {},
    saveActiveText: (typed: string) => {},
    updateFont: () => {},
    updateColor: () => {},
    updateHighlight: () => {}
}

export const TextCtx = createContext<TextCtxType>(defaultValue);

// custom hook to use context
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

// provider
export const TextProvider: React.FC<TextCtxProps> = ({ children }) => {
    const [typing, setTyping] = useState<string>('');
    const [activeText, setActiveText] = useState<TextItem>(defaultValue.activeText);
    const [textsCtx, setTextsCtx] = useState<TextItem[]>([]);

    useEffect(() => {
      }, [activeText, textsCtx]);

    const generateId = () => Math.random().toString(36).slice(2, 11);

    const saveActiveText = (typed: string) => {
        const newText: TextItem = {
          ...defaultValue.activeText,
          id: generateId(),
          text: typed,
          font: activeText.font,
          color: activeText.color,
          highlight: activeText.highlight
        };
        setTextsCtx((prevTextsCtx) => [...prevTextsCtx, newText]);
        setActiveText(newText);
        setTyping('');
      };

    const updateActiveText = (id: string) => {
        const foundText = textsCtx.find(text => text.id === id);
        if (foundText) setActiveText(foundText);
    };

    const updateItem = (field: Partial<TextItem>) => {
        setTextsCtx((prevTextsCtx) =>
            prevTextsCtx.map((prevText) => (prevText.id === activeText.id ? { ...prevText, ...field } : prevText))
        );
    };

    const updateFont = (newFont: string) => updateItem({ font: newFont });
    const updateColor = (newColor: string) => updateItem({ color: newColor });
    const updateHighlight = (newColor: string) => updateItem({ highlight: newColor });


    return (
        <TextCtx.Provider
            value={{
                typing,
                setTyping,
                activeText,
                setActiveText,
                textsCtx,
                setTextsCtx,
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