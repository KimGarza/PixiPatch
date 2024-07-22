import React, { createContext, useState, Dispatch, SetStateAction } from "react";

// type for path
type Point = {
    x: number;
    y: number;
  };
type PathData = Point[];

interface DrawingData {
    path: PathData;
    top: number;
    left: number;
}

// the ACTUAL context data/functions available to access
interface DrawCtxType {
    drawingData: DrawingData[];
    setDrawingData: Dispatch<SetStateAction<DrawingData[]>>; // ??
    updateDrawingPosition: (index: number, newTop: number, newLeft: number) => void; // void  here makes it clear that the function is intended to perform an action but not produce a result.
}

const defaultValue: DrawCtxType = {
    drawingData: [],
    setDrawingData: () => [],
    updateDrawingPosition: () => {},
}

// creating the context
export const DrawCtx = createContext<DrawCtxType>(defaultValue); // why is default value necessary?

interface DrawCtxProps {
    children?: React.ReactNode;
}

export const DrawProvider: React.FC<DrawCtxProps> = ({ children }) => {
    const [drawingData, setDrawingData] = useState<DrawingData[]>([]);

    const updateDrawingPosition = (index: number, newTop: number, newLeft: number): void => { // review
        setDrawingData((prevDrawingData) => {
            const updatedDrawingData = [...prevDrawingData];
            updatedDrawingData[index].top = newTop;
            updatedDrawingData[index].left = newLeft;
            return updatedDrawingData;
        });
    };

    return (
        <DrawCtx.Provider
        value={{ // value is a prop
            drawingData,
            setDrawingData,
            updateDrawingPosition,
          }}
        >
            {children}
        </DrawCtx.Provider>
    );
}