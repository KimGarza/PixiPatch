import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

// actual photo from lib
interface ImageInfo {
  uri: string;
  width: number;
  height: number;
  type: string | undefined;
}

// datatype customized with imageinfo + positioning data
interface ImageData {
  imageInfo: ImageInfo;
  top: number;
  left: number;
  width: number;
  height: number;
}

// when using image context this is what options are available to access
interface ImageCtxType {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  activeImageCtx: ImageData | undefined;
  setActiveImageCtx: Dispatch<SetStateAction<ImageData | undefined>>;
  // void  here makes it clear that the function is intended to perform an action but not produce a result.
  updateImagePosition: (uri: string, newTop: number, newLeft: number) => void; 
  updateImageUri: (uri: string, newUri: string) => void; 
  deleteImage: (uri: string) => void;
}

// default value is necessary
const defaultValue: ImageCtxType = {
  images: [],
  setImages: () => [],
  activeImageCtx: undefined,  
  setActiveImageCtx: () => {},
  updateImagePosition: () => {},
  updateImageUri: () => {},
  deleteImage: () => {},
};

// creating the context
export const ImageCtx = createContext<ImageCtxType>(defaultValue);

interface ImageProviderProps {
  children?: React.ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeImageCtx, setActiveImageCtx] = useState<ImageData>();

  useEffect(() => {
    console.log(images)
}, [images]);

  const updateImagePosition = (uri: string, newTop: number, newLeft: number): void => { // void is return type

    const foundImage = images.find(img => img.imageInfo.uri == uri);
    if (foundImage) {
      foundImage.left = newLeft;
      foundImage.top = newTop;
    }
   };

  const updateImageUri = (uri: string, newUri: string): void => {

    setImages((prevImages) => 
      prevImages.map(img => 
          img.imageInfo.uri == uri 
          ? { ...img, imageInfo: { ...img.imageInfo, uri: newUri } } 
          : img
        )
    );
  };


  const deleteImage = (uri: string): void => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.imageInfo.uri !== uri)
    );
  };


  return (
    // The ImageCtx.Provider is a context provider component created using the ImageCtx context. It allows any child component wrapped within it to access the context values it provides.
    <ImageCtx.Provider
      value={{ // value is a prop
        images,
        setImages,
        activeImageCtx,
        setActiveImageCtx,
        updateImagePosition,
        updateImageUri,
        deleteImage
      }}
    >
      {children}
    </ImageCtx.Provider>
  );
};