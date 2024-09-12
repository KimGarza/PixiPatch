// define interfaces for sticker and then for stickers with location
// mkae default value for ctx type
// create the interface for accessible values for context
// create the context
// return the 
import { useContext, useState } from "react";
import { Dispatch, SetStateAction, createContext } from "react";
import { ImageSourcePropType } from 'react-native';

interface Item {
    id: string,
    zIndex: number
  }
interface StickerData {
    sticker: ImageSourcePropType;
    translateY: number;
    translateX: number;
    item: Item;
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

export const useStickerCtx = () => {
    const context = useContext(StickerCtx);
  
    if (context === undefined) {
      throw new Error("useStickerCtx must be used within an StickerProvider");
    }
    return context;
  };

interface StickerProviderProps {
    children?: React.ReactNode;
}

export const StickerProvider: React.FC<StickerProviderProps> = ({ children }) => {
    const [stickers, setStickers] = useState<StickerData[]>([]);

    const updateStickerPosition = (index: number, newTop: number, newLeft: number) => {
        setStickers((prevStickers) => {
            const updatedStickers = [...prevStickers];
            updatedStickers[index].translateY = newTop;
            updatedStickers[index].translateX = newLeft;
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
