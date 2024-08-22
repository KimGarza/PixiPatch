import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import * as FileSystem from 'expo-file-system';

// actual photo from lib
interface ImageInfo {
  uri: string;
  width: number;
  height: number;
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
  updateImageInfo: (originalImage: ImageInfo, cachedImage: ImageInfo) => void; 
  deleteImage: (uri: string) => void;
}

// default value is necessary
const defaultValue: ImageCtxType = {
  images: [],
  setImages: () => [],
  activeImageCtx: undefined,  
  setActiveImageCtx: () => {},
  updateImagePosition: () => {},
  updateImageInfo: () => {},
  deleteImage: () => {},
};

// creating the context
export const ImageCtx = createContext<ImageCtxType>(defaultValue);

interface ImageProviderProps {
  children?: React.ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [test, setTest] = useState<boolean>(false);
  const [activeImageCtx, setActiveImageCtx] = useState<ImageData>();

  useEffect(() => {
    console.log("HELLOOO");
  }, [test])

  const updateImagePosition = (uri: string, newTop: number, newLeft: number): void => { // void is return type

    const foundImage = images.find(img => img.imageInfo.uri == uri);
    if (foundImage) {
      foundImage.left = newLeft;
      foundImage.top = newTop;
    }
   };

  // const updateImageUri = async (orignalUri: string, cachedUri: string) => {
    const updateImageInfo = async (originalImage: ImageInfo, cachedImage: ImageInfo) => {
      console.log("hello?")
      setTest(true);

    // store the cached new uri to local storage
    const fileName = cachedImage.uri.split('/').pop(); // cropped / flipped
    const newLocalUri = `${FileSystem.documentDirectory}${fileName}`;

    console.log("cached size ", cachedImage.width, cachedImage.height)


    await FileSystem.copyAsync({
      from: cachedImage.uri,
      to: newLocalUri,
    });

    // update the original image with the new lcoal uri
    setImages((prevImages) => 
      prevImages.map(img => 
          img.imageInfo.uri == originalImage.uri 
          ? { ...img, imageInfo: { ...img.imageInfo, uri: newLocalUri, height: cachedImage.height, width: cachedImage.width } } 
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
        updateImageInfo,
        deleteImage
      }}
    >
      {children}
    </ImageCtx.Provider>
  );
};