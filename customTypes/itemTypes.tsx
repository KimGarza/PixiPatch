export interface BaseItem { 
    id: string; //?? need ot be here?
    type: string; // discriminate within the union
    zIndex: number; //?? need ot be here?
    translateX: number; translateY: number;
    rotation: number;
    pendingChanges: {scale: number, rotation: number, positionX: number, positionY: number};
  }
  export interface ImageItem extends BaseItem {
    id: string;
    type: 'image'; // discriminate
    zIndex: number;
    imageInfo: ImageInfo;
    ogImageInfo: ImageInfo;
    translateX: number; translateY: number;
    width: number; height: number;
    rotation: number;
    pendingChanges: {scale: number, rotation: number, positionX: number, positionY: number};
  }
  export interface StickerItem extends BaseItem {
    id: string;
    type: 'sticker'; // discriminate
    zIndex: number;
    imageInfo: ImageInfo;
    translateX: number; translateY: number;
    height: number, width: number;
    rotation: number;
    pendingChanges: {scale: number, rotation: number, positionX: number, positionY: number};
  }
  export interface DrawingItem extends BaseItem {
    id: string;
    type: 'drawing'; // discriminate
    zIndex: number;
    imageInfo: ImageInfo;
    translateX: number; translateY: number;
    height: number, width: number;
    rotation: number;
    pendingChanges: {scale: number, rotation: number, positionX: number, positionY: number};
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
    width: number; height: number;
    rotation: number;
    pendingChanges: {scale: number, rotation: number, positionX: number, positionY: number};
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