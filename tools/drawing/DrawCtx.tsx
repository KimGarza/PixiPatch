import React, { createContext, useState, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { DrawingData } from '@/customTypes/itemTypes';

interface DrawCtxType {
    drawingData: DrawingData[]; // like image data, path with meta data for canvas purposes. holds array of path data which represents multiple strokes for one drawing
    // need not hold more than one bc drawing contextx is kidn of like a temporary measure for in the moment drawings, (when done path data is removed)
    // the actual drawing gets stored in itemctx after done
    setDrawingData: Dispatch<SetStateAction<DrawingData[]>>;
    setSizeAndColor: Dispatch<SetStateAction<{size: number, color: string}>>;
    sizeAndColor: {size: number, color: string};
}

const defaultValue: DrawCtxType = {
    drawingData: [],
    setDrawingData: () => [],
    setSizeAndColor: () => {},
    sizeAndColor: {size: 3, color: 'black'}
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

    
    const [drawingData, setDrawingData] = useState<DrawingData[]>([]);
    const [sizeAndColor, setSizeAndColor] = useState<{size: number, color: string}>({size: 3, color: 'black'});
    useEffect(() => {
        
    }, [drawingData])
    return (
        <DrawCtx.Provider
        value={{ // value is a prop
            drawingData,
            setDrawingData,
            setSizeAndColor,
            sizeAndColor
          }}
        >
            {children}
        </DrawCtx.Provider>
    );
}