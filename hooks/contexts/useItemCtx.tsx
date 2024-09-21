import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { ImageItem, StickerItem, DrawingItem, TextItem, } from '@/customTypes/itemTypes';

type Item = ImageItem | StickerItem | DrawingItem | TextItem;
interface CreateItemProps {
  itemType: 'image' | 'sticker' | 'drawing' | 'text';
  properties: Item[];
}

interface PendingChangesType {
  positionX: number;
  positionY: number;
  rotation: number;
  scale: number;
}

interface ItemCtxType {
  createItems: ({ itemType, properties }: CreateItemProps) => void;
  deleteItems: (id: string, itemType: string) => void;
  bringToFront: (id: string, itemType: string) => void;
  addPendingChanges: (id: string, pendingChanges: PendingChangesType) => void;
  updatePendingChanges: () => void;
  frontItem: Item | undefined;
  setFrontItem: Dispatch<SetStateAction<Item | undefined>>;
  items: Item[];
  images: ImageItem[];
  stickers: StickerItem[];
  drawings: DrawingItem[];
  texts: TextItem[];
  activeItemCtx: Item | undefined;
  setActiveItemCtx: Dispatch<SetStateAction<Item | undefined>>;
}

const defaultValue: ItemCtxType = {
  createItems: () => {},
  deleteItems: () => {},
  bringToFront: () => {},
  updatePendingChanges: () => {},
  addPendingChanges: () => {},
  frontItem: undefined,
  setFrontItem: () => {},
  items: [],
  images: [],
  stickers: [],
  drawings: [],
  texts: [],
  activeItemCtx: undefined,  
  setActiveItemCtx: () => {},
};

export const ItemCtx = createContext<ItemCtxType>(defaultValue);
export const useItemCtx = () => {
  const context = useContext(ItemCtx);
  if (!context) throw new Error("useItemCtx must be used within ItemProvider");
  return context;
};

const generateId = () => Math.random().toString(36).slice(2, 11);

const generateLargestZIndex = (items: Item[]) =>
  items.length ? Math.max(...items.map((item) => item.zIndex)) + 1 : 2;

// helper function // loops over items array finds with given id and activates any state, activates any funtion, all generic type
const mapItems = <T extends Item>(
  items: T[],
  setItems: Dispatch<SetStateAction<T[]>>,
  id: string,
  updateFn: (item: T) => T
) => setItems((prevItems) => prevItems.map((item) => (item.id === id ? updateFn(item) : item)));

export const ItemProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [activeItemCtx, setActiveItemCtx] = useState<ImageItem | StickerItem | DrawingItem | TextItem | undefined>(undefined);
  const [frontItem, setFrontItem] = useState<ImageItem | StickerItem | DrawingItem | TextItem | undefined>(undefined);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [stickers, setStickers] = useState<StickerItem[]>([]);
  const [drawings, setDrawings] = useState<DrawingItem[]>([]);
  const [texts, setTexts] = useState<TextItem[]>([]);

  const createItem = (item: Item) => ({
    ...item,
    id: generateId(),
    zIndex: generateLargestZIndex(items),
  });

  // Create Items
  const createItems = ({ itemType, properties }: CreateItemProps) => {
    const addItem = (newItem: Item) => {
      setItems((prev) => [...prev, newItem]);
      switch (itemType) {
        case 'image':
          setImages((prev) => [...prev, newItem as ImageItem]);
          break;
        case 'sticker':
          setStickers((prev) => [...prev, newItem as StickerItem]);
          break;
        case 'drawing':
          setDrawings((prev) => [...prev, newItem as DrawingItem]);
          break;
        case 'text':
          setTexts((prev) => [...prev, newItem as TextItem]);
          break;
      }
    };

    properties.forEach((item) => addItem(createItem(item)));
  };

  // Delete Items
  const deleteItems = (id: string, itemType: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    switch (itemType) {
      case 'image':
        setImages((prev) => prev.filter((image) => image.id !== id));
        break;
      case 'sticker':
        setStickers((prev) => prev.filter((sticker) => sticker.id !== id));
        break;
      case 'drawing':
        setDrawings((prev) => prev.filter((drawing) => drawing.id !== id));
        break;
      case 'text':
        setTexts((prev) => prev.filter((text) => text.id !== id));
        break;
    }
  };

  // Bring to front
  const bringToFront = (id: string, itemType: string) => {
    const largestZIndex = generateLargestZIndex(items);

    const bringItemToFront = (item: Item) => ({
      ...item,
      zIndex: largestZIndex,
    });

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? bringItemToFront(item) : item)));

    if (itemType === 'image') {
      setImages((prevImages) => prevImages.map((image) => (image.id === id ? bringItemToFront(image) as ImageItem : image)));
    } else if (itemType === 'sticker') {
      setStickers((prevStickers) => prevStickers.map((sticker) => (sticker.id === id ? bringItemToFront(sticker) as StickerItem : sticker)));
    } else if (itemType === 'drawing') {
      setDrawings((prevDrawings) => prevDrawings.map((drawing) => (drawing.id === id ? bringItemToFront(drawing) as DrawingItem : drawing)));
    } else if (itemType === 'text') {
      setTexts((prevTexts) => prevTexts.map((text) => (text.id === id ? bringItemToFront(text) as TextItem : text)));
    }
  };
  
  // Add Pending Changes
  const addPendingChanges = (id: string, inPendingChanges: { positionX: number, positionY: number, rotation: number, scale: number }) => {
    
    const addPending = <T extends Item>(item: T): T => {
      
      return {
        ...item,
        pendingChanges: {
          scale: inPendingChanges.scale,
          rotation: inPendingChanges.rotation,
          positionX: inPendingChanges.positionX,
          positionY: inPendingChanges.positionY,
        },
      };
    };

    // Generic function to find and replace the item in the array
    const findAndAdd = <T extends Item>(prevItems: T[]): T[] => {
      return prevItems.map((item) => (item.id === id ? addPending(item) : item));
    };

    setItems((prevItems) => findAndAdd(prevItems));

    const foundItem = items.find((item) => (item.id == id));
    if (foundItem) {
      switch (foundItem.type) {
        case 'image':
          setImages((prevImages) => findAndAdd(prevImages as ImageItem[]));
          break;
        case 'sticker':
          setStickers((prevStickers) => findAndAdd(prevStickers as StickerItem[]));
          break;
        case 'drawing':
          setDrawings((prevDrawings) => findAndAdd(prevDrawings as DrawingItem[]));
          break;
        case 'text':
          setTexts((prevTexts) => findAndAdd(prevTexts as TextItem[]));
          break;
      }
    }
  }


  // Update Pending Changes
  const updatePendingChanges = () => {
    
    const updatePending = <T extends Item>(item: T): T => {
      return {
        ...item,
        height: item.height * item.pendingChanges.scale,
        width: item.width * item.pendingChanges.scale,
        rotation: item.pendingChanges.rotation,
        translateX: item.pendingChanges.positionX,
        translateY: item.pendingChanges.positionY,
        pendingChanges: {
          scale: 1,
          rotation: item.pendingChanges.rotation,
          positionX: item.pendingChanges.positionX,
          positionY: item.pendingChanges.positionY,
        },
      };
    };

    setItems((prevItems) => prevItems.map((item) => updatePending(item)));
    setImages((prevImages) => prevImages.map((item) => updatePending(item)));
    setStickers((prevStickers) => prevStickers.map((item) => updatePending(item)));
    setDrawings((prevDrawings) => prevDrawings.map((item) => updatePending(item)));
    setTexts((prevTexts) => prevTexts.map((item) => updatePending(item)));
  }


  return (
    <ItemCtx.Provider
      value={{
        createItems,
        deleteItems,
        bringToFront,
        addPendingChanges,
        updatePendingChanges,
        frontItem,
        setFrontItem,
        items,
        images,
        stickers,
        drawings,
        texts,
        activeItemCtx,
        setActiveItemCtx
      }}
    >
      {children}
    </ItemCtx.Provider>
  );
};