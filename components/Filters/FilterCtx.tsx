// define interfaces for sticker and then for stickers with location
// mkae default value for ctx type
// create the interface for accessible values for context
// create the context
// return the 
import { useState } from "react";
import { Dispatch, SetStateAction, createContext } from "react";
import { ImageSourcePropType } from 'react-native';

  interface StickerData {
    sticker: ImageSourcePropType;
    top: number;
    left: number;
  }

interface StickerCtxType {
    stickers: StickerData[];
    setStickers: Dispatch<SetStateAction<StickerData[]>>;
    updateStickerPosition: (index: number, newTop: number, newLeft: number) => void; 
}

const defaultValue: StickerCtxType = {
    stickers: [],
    setStickers: () => {},
    updateStickerPosition: () => {},
}

export const StickerCtx = createContext<StickerCtxType>(defaultValue);

interface StickerProviderProps {
    children?: React.ReactNode;
}

export const StickerProvider: React.FC<StickerProviderProps> = ({ children }) => {
    const [stickers, setStickers] = useState<StickerData[]>([]);

    const updateStickerPosition = (index: number, newTop: number, newLeft: number) => {
        setStickers((prevStickers) => {
            const updatedStickers = [...prevStickers];
            updatedStickers[index].top = newTop;
            updatedStickers[index].left = newLeft;
            return updatedStickers;
        });
    };

    return (
        <StickerCtx.Provider
        value={{
            stickers,
            setStickers,
            updateStickerPosition
        }}
        >
            {children}
        </StickerCtx.Provider>
    )
}
