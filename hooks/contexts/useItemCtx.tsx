import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
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

  const createImageItem = (item: ImageItem) => {
    const id = generateId();
    const zIndex = generateLargestZIndex();

    const newImageItem = {
      id: id, zIndex: zIndex, type: 'image',
      imageInfo: item.imageInfo,
      ogImageInfo: item.ogImageInfo || item.imageInfo,
      translateY: item.translateY, translateX: item.translateX,
      width: item.width, height: item.height,
      rotation: 0,
      pendingChanges: {scale: 1, rotation: 0, positionX: 0, positionY: 0}
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
      ...item,
      id: id,
      zIndex: zIndex,
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
      setStickers(prevStickers => prevStickers.filter(sticker => sticker.id !== id))
    } else if (itemType == 'drawing') {
      setDrawings(prevDrawings => prevDrawings.filter(drawing => drawing.id !== id))
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
        setStickers((prevStickers) => prevStickers.map((sticker) => sticker.id == id ? { ...sticker, zIndex: largestZIndex } : sticker));
      } else if (itemType == 'drawing') {
        setDrawings((prevDrawings) => prevDrawings.map((drawing) => drawing.id == id ? { ...drawing, zIndex: largestZIndex } : drawing));
      }
    }
  }
  
  const addPendingChanges = (id: string, pendingChanges: {positionX: number, positionY: number, rotation: number, scale: number}) => {

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
      } else if (foundItem.type == 'sticker') {
        setStickers((prevStickers) => prevStickers.map((sticker) => sticker.id == id ? { 
          ...sticker,
          pendingChanges: {
            scale: pendingChanges.scale,
            rotation: pendingChanges.rotation,
            positionX: pendingChanges.positionX,
            positionY: pendingChanges.positionY}}
          : sticker
        ));
      } else if (foundItem.type == 'drawing') {
        setDrawings((prevDrawing) => prevDrawing.map((drawing) => drawing.id == id ? { 
          ...drawing,
          pendingChanges: {
            scale: pendingChanges.scale,
            rotation: pendingChanges.rotation,
            positionX: pendingChanges.positionX,
            positionY: pendingChanges.positionY}}
          : drawing
        ));
      }
    }
  }
  
  const updatePending = () => {

    items.forEach((item) => {
      setItems((prevItems) => prevItems.map((prevItem) => item.id == prevItem.id ? { 
        ...prevItem,
        width: (item.width * item.pendingChanges.scale),
        height: (item.height * item.pendingChanges.scale),
        translateY: item.pendingChanges.positionY != 0 ? item.pendingChanges.positionY : item.translateY,
        translateX: item.pendingChanges.positionX != 0 ? item.pendingChanges.positionX : item.translateX,
        rotation: item.pendingChanges.rotation,
        pendingChanges: {
          scale: 1,
          rotation: 0,
          positionX: 0,
          positionY: 0}}
        : item
      ));

      if (item.type == 'image') {
        setImages((prevImages) => prevImages.map((image) => image.id == item.id ? { 
          ...image,
          width: (item.width * item.pendingChanges.scale),
          height: (item.height * item.pendingChanges.scale),
          translateY: item.pendingChanges.positionY != 0 ? item.pendingChanges.positionY : item.translateY,
          translateX: item.pendingChanges.positionX != 0 ? item.pendingChanges.positionX : item.translateX,
          rotation: item.pendingChanges.rotation,
          pendingChanges: {
            scale: 1,
            rotation: 0,
            positionX: 0,
            positionY: 0}}
          : image
        ));
      } if (item.type == 'sticker') {
        setStickers((prevStickers) => prevStickers.map((sticker) => sticker.id == item.id ? { 
          ...sticker,
          width: (item.width * item.pendingChanges.scale),
          height: (item.height * item.pendingChanges.scale),
          translateY: item.pendingChanges.positionY != 0 ? item.pendingChanges.positionY : item.translateY,
          translateX: item.pendingChanges.positionX != 0 ? item.pendingChanges.positionX : item.translateX,
          rotation: item.pendingChanges.rotation,
          pendingChanges: {
            scale: 1,
            rotation: 0,
            positionX: 0,
            positionY: 0}}
          : sticker
        ));
      } else if (item.type == 'drawing') {
        setDrawings((prevDrawings) => prevDrawings.map((drawing) => drawing.id == item.id ? { 
          ...drawing,
          width: (item.width * item.pendingChanges.scale),
          height: (item.height * item.pendingChanges.scale),
          translateY: item.pendingChanges.positionY != 0 ? item.pendingChanges.positionY : item.translateY,
          translateX: item.pendingChanges.positionX != 0 ? item.pendingChanges.positionX : item.translateX,
          rotation: item.pendingChanges.rotation,
          pendingChanges: {
            scale: 1,
            rotation: 0,
            positionX: 0,
            positionY: 0}}
          : drawing
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