import React, { createContext, useEffect, useState } from "react";
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
  addPendingChanges: (id: string, pendingChanges: {positionX: number, positionY: number, rotation: number, scale: number}) => void;
  updatePending: () => void;
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
  updatePending: () => {},
  addPendingChanges: () => {},
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

  useEffect(() => {
  }, [items])

  const createImageItem = (item: ImageItem) => {
    const id = generateId();
    const zIndex = generateLargestZIndex();

    const newImageItem = {
      id: id, zIndex: zIndex, type: 'image',
      imageInfo: item.imageInfo,
      ogImageInfo: item.ogImageInfo || item.imageInfo,
      top: item.top, left: item.left,
      width: item.width, height: item.height,
      rotation: 0,
      pendingChanges: {scale: 1, rotation: 0, positionX: item.left, positionY: item.top}
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
      rotation: 0,
      pendingChanges: {scale: 1, rotation: 0, positionX: item.left, positionY: item.top}
    } as StickerItem;
  }
  
  const createDrawingItem = (item: DrawingItem) => {
    const id = generateId();
    const zIndex = generateLargestZIndex();

    return {
      id: id, zIndex: zIndex, type: 'drawing',
      imageInfo: {
        uri: item.imageInfo.uri,
        width: 800,
        height: 800,
      },
      top: item.top,
      left: item.left,
      height: item.height,
      width: item.width,
      rotation: 0,
      pendingChanges: {scale: 1, rotation: 0, positionX: item.left, positionY: item.top}
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
        if (stickerItems) {
          stickerItems.forEach((item, index) => {
            const newItem = createStickerItem(item);
            setStickers(prevStickers => [...prevStickers, newItem]);
            setItems((prevItems) => [...prevItems, newItem]);
          })
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
  
  const addPendingChanges = (id: string, pendingChanges: {positionX: number, positionY: number, rotation: number, scale: number}) => {
    console.log("add pending changes ", pendingChanges);

    const foundItem = items.find(item => item.id === id);
    if (foundItem) {
      setItems((prevItems) => prevItems.map((item) => item.id == id ? { 
        ...item,
        pendingChanges: {
          scale: pendingChanges.scale,
          rotation: pendingChanges.rotation,
          positionX: pendingChanges.positionX,
          positionY: pendingChanges.positionY}}
        : item
      ));

      if (foundItem.type == 'image') {
        setImages((prevImages) => prevImages.map((image) => image.id == id ? { 
          ...image,
          pendingChanges: {
            scale: pendingChanges.scale,
            rotation: pendingChanges.rotation,
            positionX: pendingChanges.positionX,
            positionY: pendingChanges.positionY}}
          : image
        ));
      }
    }
  }
  
  const updatePending = () => {

    items.forEach((item) => {
      console.log('updatePending current top and left ', item.top, item.left, "pending: ", item.pendingChanges.positionY, item.pendingChanges.positionX)
      console.log("item type", item.type)

      setItems((prevItems) => prevItems.map((prevItem) => item.id == prevItem.id ? { 
        ...prevItem,
        width: (item.width * item.pendingChanges.scale),
        height: (item.height * item.pendingChanges.scale),
        top: item.pendingChanges.positionY,
        left: item.pendingChanges.positionX,
        rotation: item.pendingChanges.rotation,
        pendingChanges: {
          scale: 1,
          rotation: 0,
          positionX: item.left,
          positionY: item.top}}
        : item
      ));

      console.log("item type", item.type)
      if (item.type == 'image') {

        console.log("am i an image? current ", item.top, item.left, "and is it same as id? ")
        setImages((prevImages) => prevImages.map((image) => image.id == item.id ? { 
          ...image,
          width: (item.width * item.pendingChanges.scale),
          height: (item.height * item.pendingChanges.scale),
          top: item.pendingChanges.positionY,
          left: item.pendingChanges.positionX,
          rotation: item.pendingChanges.rotation,
          pendingChanges: {
            scale: 1,
            rotation: 0,
            positionX: item.left,
            positionY: item.top}}
          : image
        ));
      }
    })
  }


  return (
    <ItemCtx.Provider
      value={{
        createItems,
        deleteItems,
        bringToFront,
        addPendingChanges,
        updatePending,
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