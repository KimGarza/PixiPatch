import { createContext, useContext, useState } from "react"
import React, { Dispatch, SetStateAction } from "react";

interface CropBox {
    x: number,
    y: number,
    width: number,
    height: number
}

interface CropCtxType {
    setCropBox: Dispatch<SetStateAction<CropBox>>;
    cropBox: CropBox;
}

const defaultValue: CropCtxType = {
    setCropBox: () => {},
    cropBox: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    }
}

export const CropCtx = createContext(defaultValue);

export const useCropCtx = useContext(CropCtx);

interface props {
    children?: React.ReactNode;
}

export const CropProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
    const [cropBox, setCropBox] = useState<{x: number, y: number, width: number, height: number}>({x: 0, y: 0, width: 0, height: 0});

    return(
        <CropCtx.Provider value={{
            setCropBox,
            cropBox
        }}>
            {children}
        </CropCtx.Provider>
    )

}
