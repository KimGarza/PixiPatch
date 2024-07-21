import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface ImageInfo {
  uri: string;
  width: number;
  height: number;
  type: string | undefined;
}

interface ImageCtxType {
    imagesCtx: ImageInfo[];
    setImagesCtx: Dispatch<SetStateAction<ImageInfo[]>>;
  }

const defaultValue: ImageCtxType = {
  imagesCtx: [],
  setImagesCtx: () => []
};

export const ImageCtx = createContext<ImageCtxType>(defaultValue);

interface ImageProviderProps {
    children?: React.ReactNode
}
export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
    const [imagesCtx, setImagesCtx] = useState<ImageInfo[]>([]);

    return (
        <ImageCtx.Provider value={{ imagesCtx, setImagesCtx }}>
          {children}
        </ImageCtx.Provider>
      );
}