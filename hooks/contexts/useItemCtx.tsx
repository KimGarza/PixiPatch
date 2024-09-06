import React, { createContext, useEffect, useState,  } from "react";
import { useContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { ImageItem, StickerItem, DrawingItem } from '@/customTypes/itemTypes';

type Item = ImageItem | StickerItem | DrawingItem; // Union Type Item is the union, an item can be any of these item types
interface CreateItemProps {
  itemType: 'image' | 'sticker' | 'drawing';
  properties: ImageItem[] | StickerItem[] | DrawingItem[];
}

interface ItemCtxType {
  createItems: ({itemType, properties}: CreateItemProps) => void;
  deleteItems: (id: string, itemType: 'image' | 'sticker' | 'drawing') => void;
  bringToFront: (id: string, itemType: string) => void;
  frontItem: Item | undefined;
  setFrontItem: Dispatch<SetStateAction<ImageItem | StickerItem | DrawingItem | undefined>>;
  items: Item[];
  images: ImageItem[];
  stickers: StickerItem[];
  drawings: DrawingItem[];
  activeItemCtx: ImageItem | StickerItem | DrawingItem | undefined;
  setActiveItemCtx: Dispatch<SetStateAction<ImageItem | StickerItem | DrawingItem | undefined>>;
}

const defaultValue: ItemCtxType = {
  createItems: () => {},
  deleteItems: () => {},
  bringToFront: () => {},
  frontItem: undefined,
  setFrontItem: () => {},
  items: [],
  images: [],
  stickers: [],
  drawings: [],
  activeItemCtx: undefined,  
  setActiveItemCtx: () => {},
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
  const [activeItemCtx, setActiveItemCtx] = useState<ImageItem | StickerItem | DrawingItem | undefined>(undefined);
  const [frontItem, setFrontItem] = useState<ImageItem | StickerItem | DrawingItem | undefined>(undefined);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [drawings, setDrawings] = useState<DrawingItem[]>([]);

  const createImageItem = (item: ImageItem) => {
    const id = generateId();
    const zIndex = generateLargestZIndex();

    const newImageItem = {
      id: id, zIndex: zIndex, type: 'image',
      imageInfo: item.imageInfo,
      ogImageInfo: item.ogImageInfo || item.imageInfo,
      top: item.top,
      left: item.left,
      width: item.width,
      height: item.height,
    } as ImageItem;

    return newImageItem;
  }

  const createStickerItem = (item: StickerItem) => {
    const id = generateId();
    const zIndex = generateLargestZIndex();
    return {
      ...item,
      id: id,
      zIndex: zIndex,
    } as StickerItem;
  }
  
  const createDrawingItem = (item: DrawingItem) => {
    const id = generateId();
    const zIndex = generateLargestZIndex();

    return {
      id: id, zIndex: zIndex, type: 'drawing',
      imageInfo: {
        uri: item.uri,
        width: 800,
        height: 800,
      },
      uri: item.uri,
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
    return 2;
  }

  const generateId = () => {
    return Math.random().toString(36).slice(2, 11);
  }

  const createItems = ({ itemType, properties }: CreateItemProps) => {
    switch (itemType) {
      case 'image':
        const imageItems = properties as ImageItem[]
        if (imageItems) {
          imageItems.forEach((item, index) => {
            const newItem = createImageItem(item);
            setImages(prevImages => [...prevImages, newItem]);
            setItems((prevItems) => [...prevItems, newItem]);
          })
        }
        break;
      case 'sticker': 
        const stickerItems = properties as StickerItem[]
        console.log("okayyy ", stickerItems)

        if (stickerItems) {
          stickerItems.forEach((item, index) => {
            const newItem = createStickerItem(item);
            setStickers(prevStickers => [...prevStickers, newItem]);
            setItems((prevItems) => [...prevItems, newItem]);
          })
          console.log("stickerItems ", stickerItems)

        }
        break;
      case 'drawing': 
        const drawingItems = properties as DrawingItem[];
        if (drawingItems) {
          drawingItems.forEach((item, index) => {
            const newItem = createDrawingItem(item);
            setDrawings(prevDrawings => [...prevDrawings, newItem]);
            setItems((prevItems) => [...prevItems, newItem]);
          })
        }
        break;
    }
  }

  const deleteItems = (id: string, itemType: 'image' | 'sticker' | 'drawing') => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id))

    if (itemType == 'image') {
      setImages(prevImages => prevImages.filter(image => image.id !== id))
    } else if (itemType == 'sticker') {
      // setstickers(prevStickers => prevStickers.filter(sticker => sticker.id !== id))
    } else if (itemType == 'drawing') {
      // setstickers(prevStickers => prevStickers.filter(sticker => sticker.id !== id))
    }
  }

  const bringToFront = (id: string, itemType: string) => {

    const largestZIndex = generateLargestZIndex();

    const foundItem = items.find(item => item.id === id);
    if (foundItem) {
      setItems((prevItems) => prevItems.map((item) => item.id == id ? { ...item, zIndex: largestZIndex } : item));
      setFrontItem(foundItem);
      setActiveItemCtx(undefined);
  
      if (itemType == 'image') {
        setImages((preImages) => preImages.map((image) => image.id == id ? { ...image, zIndex: largestZIndex } : image));
      } else if (itemType == 'sticker') {
        // setstickers(prevStickers => prevStickers.filter(sticker => sticker.id !== id))
      } else if (itemType == 'drawing') {
        // setstickers(prevStickers => prevStickers.filter(sticker => sticker.id !== id))
      }
    }
  }

  return (
    <ItemCtx.Provider
      value={{
        createItems,
        deleteItems,
        bringToFront,
        frontItem,
        setFrontItem,
        items,
        images,
        stickers,
        drawings,
        activeItemCtx,
        setActiveItemCtx
      }}
    >
      {children}
    </ItemCtx.Provider>
  );
};