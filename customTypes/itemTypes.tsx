import { ImageSourcePropType } from "react-native";

export interface BaseItem { 
    id: string;
    type: string; // discriminate within the union
    zIndex: number;
  }
  export interface ImageItem extends BaseItem {
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
  export interface StickerItem extends BaseItem {
    id: string;
    type: 'sticker'; // discriminate
    zIndex: number;
    sticker: ImageSourcePropType;
    top: number;
    left: number;
  }
  export interface DrawingItem extends BaseItem {
    id: string;
    type: 'drawing'; // discriminate
    zIndex: number;
    path: Point[];
    top: number;
    left: number;
  }
  
  export type Item = ImageItem | StickerItem | DrawingItem; // Union Type Item is the union, an item can be any of these item types
  
  export type Point = {
    x: number;
    y: number;
  };

  export interface ImageInfo {
    uri: string;
    width: number;
    height: number;
  }