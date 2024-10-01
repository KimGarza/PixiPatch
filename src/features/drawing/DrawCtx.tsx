import React, { createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { PathData } from "@/src/customTypes/itemTypes";

// PathData is array of x, y coordinates + color + size
interface DrawCtxType {
    setDrawingPaths: Dispatch<SetStateAction<PathData[]>>;
    drawingPaths: PathData[];
    setActiveSize: Dispatch<SetStateAction<number>>;
    setActiveColor: Dispatch<SetStateAction<string>>;
    activeSize: number;
    activeColor: string;
    clearCanvas: () => void;
}

const defaultValue: DrawCtxType = {
    setDrawingPaths: () => [],
    drawingPaths: [],
    setActiveSize: () => {},
    setActiveColor: () => {},
    activeSize: 3,
    activeColor: 'black',
    clearCanvas: () => {}
}

export const DrawCtx = createContext<DrawCtxType>(defaultValue);

export const useDrawCtx = () => {
    const context = useContext(DrawCtx);
  
    if (context === undefined) {
        throw new Error("useImageCxt must be used within an ImageProvider");
    }
    return context;
};

interface DrawCtxProps {
    children?: React.ReactNode;
}

export const DrawProvider: React.FC<DrawCtxProps> = ({ children }) => {

    const [drawingPaths, setDrawingPaths] = useState<PathData[]>([]);
    const [activeSize, setActiveSize] = useState<number>(3);
    const [activeColor, setActiveColor] = useState<string>('red');

    const clearCanvas = () => {
        console.log("triggered?")
        setDrawingPaths([]);
        setActiveSize(3);
        setActiveColor('red');
    }
    
    useEffect(() => {
    }, [drawingPaths])
    return (
        <DrawCtx.Provider
        value={{
            drawingPaths,
            setDrawingPaths,
            setActiveSize,
            setActiveColor,
            activeSize,
            activeColor,
            clearCanvas
          }}
        >
            {children}
        </DrawCtx.Provider>
    );
}