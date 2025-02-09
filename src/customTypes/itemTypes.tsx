import { thumbnails } from "../components/features/layouts/layoutThumbnails";
export interface BaseItem { 
    id: string; //?? need ot be here?
    type: string; // discriminate within the union
    zIndex: number; //?? need ot be here?
    translateX: number; translateY: number;
    // layoutX: number; layoutY: number;
    rotation: number;
    pendingChanges: {rotation: number, positionX: number, positionY: number, scale: number};
  }
  export interface ImageItem extends BaseItem {
    id: string;
    type: 'image'; // discriminate
    zIndex: number;
    imageInfo: ImageInfo;
    // ogImageInfo: ImageInfo;
    translateX: number; translateY: number;
    layoutX: number; layoutY: number;
    width: number; height: number;
    rotation: number;
    pendingChanges: {rotation: number, positionX: number, positionY: number, scale: number};
  }
  export interface StickerItem extends BaseItem {
    id: string;
    type: 'sticker'; // discriminate
    zIndex: number;
    imageInfo: ImageInfo;
    translateX: number; translateY: number;
    // layoutX: number; layoutY: number;
    height: number, width: number;
    rotation: number;
    pendingChanges: {rotation: number, positionX: number, positionY: number, scale: number};
  }
  export interface DrawingItem extends BaseItem {
    id: string;
    type: 'drawing'; // discriminate
    zIndex: number;
    imageInfo: ImageInfo;
    translateX: number; translateY: number;
    // layoutX: number; layoutY: number;
    height: number, width: number;
    rotation: number;
    pendingChanges: {rotation: number, positionX: number, positionY: number, scale: number};
  }

  export interface TextItem extends BaseItem {
    id: string,
    type: 'text'; // discriminate
    zIndex: number;
    text: string,
    font: string,
    color: string,
    highlight: string,
    translateX: number; translateY: number;
    // layoutX: number; layoutY: number;
    width: number; height: number;
    rotation: number;
    pendingChanges: {rotation: number, positionX: number, positionY: number, scale: number};
}
  
  export type Item = ImageItem | StickerItem | DrawingItem | TextItem; // Union Type Item is the union, an item can be any of these item types
  
  export type Point = {
    x: number;
    y: number;
  };

  export interface ImageInfo {
    uri: string;
    width: number;
    height: number;
  }

export type PathData = {
  points: Point[];
  strokeWidth: number;
  strokeColor: string;
}

export type LayoutConfig = {
  name: string;
  thumbnail: string;
  condition: (images: ImageItem[]) => boolean;
  algorithm: (images: string[]) => {
    gridPositions: { uri: string; x: number; y: number }[];
    lastRowImages: string[];
    columns: number;
    gridCellWidth: number;
    gridCellHeight: number;
  };
}
