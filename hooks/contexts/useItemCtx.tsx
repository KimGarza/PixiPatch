import React, { createContext, useState,  } from "react";
import { ImageSourcePropType } from "react-native";
import { useContext } from "react";

// All images, stickers, drawings will be combined since all are orderable (discriminated union)
interface BaseItem { 
  id: string;
  type: string; // discriminate within the union
  zIndex: number;
}
interface ImageItem extends BaseItem {
  id: string;
  type: 'image'; // discriminate
  zIndex: number;
  imageInfo: ImageInfo;
  ogImageInfo: ImageInfo;
  top: number;
  left: number;
  width: number;
  height: number;
}
interface StickerItem extends BaseItem {
  id: string;
  type: 'sticker'; // discriminate
  zIndex: number;
  sticker: ImageSourcePropType;
  top: number;
  left: number;
}
interface DrawingItem extends BaseItem {
  id: string;
  type: 'drawing'; // discriminate
  zIndex: number;
  path: Point[];
  top: number;
  left: number;
}

type Item = ImageItem | StickerItem | DrawingItem; // Union Type Item is the union, an item can be any of these item types

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

interface CreateItemProps {
  itemType: 'image' | 'sticker' | 'drawing';
  properties: ImageItem[] | StickerItem[] | DrawingItem[];
}
interface ItemCtxType {
  createItems: ({itemType, properties}: CreateItemProps) => void
  bringToFront: (existingId: string) => void
  items: Item[];
  images: ImageItem[];
  stickers: StickerItem[];
}

const defaultValue: ItemCtxType = {
  createItems: () => {},
  bringToFront: () => {},
  items: [],
  images: [],
  stickers: []
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
  const [images, setImages] = useState<ImageItem[]>([]);
  const [stickers, setStickers] = useState<StickerItem[]>([]);

  const createImageItem = (item: ImageItem) => {
    const id = generateId();
    const zIndex = generateLargestZIndex();

    return {
      id: id, zIndex: zIndex, type: 'image',
      imageInfo: item.imageInfo,
      ogImageInfo: item.ogImageInfo || item.imageInfo,
      top: item.top,
      left: item.left,
      width: item.width,
      height: item.height,
    } as ImageItem;
  }

  const createStickerItem = (item: StickerItem) => {
    const id = generateId();
    const zIndex = generateLargestZIndex();

    return {
      id: id, zIndex: zIndex, type: 'sticker',
      sticker: item.sticker,
      top: item.top,
      left: item.left,
    } as StickerItem;
  }
  
  const createDrawingItem = (item: DrawingItem) => {
    const id = generateId();
    const zIndex = generateLargestZIndex();

    return {
      id: id, zIndex: zIndex, type: 'drawing',
      path: item.path,
      top: item.top,
      left: item.left,
    } as DrawingItem;
  }

  const generateLargestZIndex = () => {
    if (items.length > 0) {
      const largestZIndex = items.reduce((highest, current) =>
        current.zIndex > highest.zIndex ? current : highest
      );
      return largestZIndex.zIndex + 1; // add 1 to the largest zIndex so that the current item will now have the largest ZIndex
    };
  }

  const generateId = () => {
    return Math.random().toString(36).slice(2, 11);
  }

  const createItems = ({ itemType, properties }: CreateItemProps) => {
    const newItems: Item[] = [];

    switch (itemType) {
      case 'image':
        const imageItems = properties as ImageItem[]
        if (imageItems) {
          imageItems.forEach((item, index) => {
            newItems.push(createImageItem(item));
            setImages(prevImages => [...prevImages, item]);
          })
        }
        break;
      case 'sticker': 
        const stickerItems = properties as StickerItem[]
        if (stickerItems) {
          stickerItems.forEach((item, index) => {
            newItems.push(createStickerItem(item));
            setStickers(prevStickers => [...prevStickers, item]);
          })
        }
        break;
      case 'drawing': 
        const drawingItems = properties as DrawingItem[];
        drawingItems.forEach((item, index) => {
          newItems.push(createDrawingItem(item));
        })
        break;
    }

    newItems.forEach((newItem, index) => {
      setItems((prevItems) => [...prevItems, newItem]);
    })
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
        createItems,
        bringToFront,
        items,
        images,
        stickers
      }}
    >
      {children}
    </ItemCtx.Provider>
  );
};