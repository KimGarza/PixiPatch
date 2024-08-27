import React, { createContext, useState,  } from "react";
import { ImageSourcePropType } from "react-native";
import { useContext } from "react";


// canvas item which can be ordered by tapping/import will be part of Discriminated Union.
// This is 

// All images, stickers, drawings will be an item (or in this case have one)
// This will be the "discriminated union" since it is the field typescript can use to be similar and bond them
interface BaseItem {
  id: string;
  type: string;
  zIndex: number;
}

interface ImageItem extends BaseItem {
  type: 'image';
  imageInfo: ImageInfo;
  ogImageInfo: ImageInfo;
  top: number;
  left: number;
  width: number;
  height: number;
}

interface StickerItem extends BaseItem {
  type: 'sticker';
  sticker: ImageSourcePropType;
  top: number;
  left: number;
}

interface DrawingItem extends BaseItem {
  type: 'drawing';
  path: Point[];
  top: number;
  left: number;
}

type Item = ImageItem | StickerItem | DrawingItem;

// values required for some attributes
type Point = {
  x: number;
  y: number;
};

interface ImageInfo {
  uri: string;
  width: number;
  height: number;
}

interface ItemCtxType {
  createItem: () => {newItem: Item}
  bringToFront: (existingId: string) => void
  items: Item[];
}

const defaultValue: ItemCtxType = {
  createItem: () => ({ newItem: { id: '', zIndex: 0 } }),
  bringToFront: () => {},
  items: []
};

export const ItemCtx = createContext<ItemCtxType>(defaultValue);

export const useItemCtx = () => {
  const context = useContext(ItemCtx);

  if (context === undefined) {
    throw new Error("useImageCxt must be used within an ImageProvider");
  }
  return context;
};
  
export const ItemProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);


  // Generates a new item w/new index and zIndex larger than the largest one. Creates new array based on memory address to the old to replace with the new item added.
  const createItem = () => {
    const id = Math.random().toString(36).slice(2, 11);
    let zIndex = 1;

    if (items.length > 0) {
      const largestZIndex = items.reduce((highest, current) =>
        current.zIndex > highest.zIndex ? current : highest
      );
      zIndex = largestZIndex.zIndex + 1; // add 1 to the largest zIndex so that the current item is now the largest ZIndex
    };  

    const newItem = { id: id, zIndex: zIndex}
    setItems((prevItems) => [...prevItems, newItem]);

    return { newItem };
  }


  const bringToFront = (existingId: string) => {

    let largestZIndex = 0;
    // find the largest zIndex currently existing within the items array
    if (items.length > 0) {
      const item = items.reduce((highest, current) =>
        current.zIndex > highest.zIndex ? current : highest
      );

      largestZIndex = item.zIndex;
    }; 

    if (largestZIndex != 0) {

      setItems((prevItems) => 
        prevItems.map((item) => 
          item.id == existingId ? { ...item, zIndex: largestZIndex + 1 } : item
        )
      );
    }
  }
    

  return (
    <ItemCtx.Provider
      value={{
        createItem,
        bringToFront,
        items,
      }}
    >
      {children}
    </ItemCtx.Provider>
  );
};