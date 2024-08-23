import React, { createContext, useState, Dispatch, SetStateAction } from "react";
import { SaveLocally } from "../save/saveLocally";

interface ImageInfo { // native image object
  uri: string;
  width: number;
  height: number;
}

interface ImageData { // custom image object that contains native imageInfo and custom additional data
  imageInfo: ImageInfo;
  ogImageInfo: ImageInfo;
  top: number;
  left: number;
  width: number;
  height: number;
}

// Accessible values from this context component
interface ImageCtxType {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  activeImageCtx: ImageData | undefined;
  setActiveImageCtx: Dispatch<SetStateAction<ImageData | undefined>>;
  updateImagePosition: (uri: string, newTop: number, newLeft: number) => void; 
  updateImageInfo: (originalImage: ImageInfo, cachedImage: ImageInfo) => void; 
  updateImageDataDimensions: (image: ImageData) => void; 
  deleteImage: (uri: string) => void;
}

const defaultValue: ImageCtxType = {
  images: [],
  setImages: () => [],
  activeImageCtx: undefined,  
  setActiveImageCtx: () => {},
  updateImagePosition: () => {},
  updateImageInfo: () => {},
  updateImageDataDimensions: () => {},
  deleteImage: () => {},
};

export const ImageCtx = createContext<ImageCtxType>(defaultValue);

interface ImageProviderProps {
  children?: React.ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeImageCtx, setActiveImageCtx] = useState<ImageData>();

  const updateImagePosition = (uri: string, newTop: number, newLeft: number): void => { // void is return type

    const foundImage = images.find(img => img.imageInfo.uri == uri);
    if (foundImage) {
      foundImage.left = newLeft;
      foundImage.top = newTop;
    }
   };

   // Takes in the image info of the og and the cached in order to create a new local uri (vs the cache uri of the cached image).
   // Replaces the image in images array with the new cached size and local uri from the cached image. (This is for expo-image-manipulation purposes).
  const updateImageInfo = async (originalImage: ImageInfo, cachedImage: ImageInfo) => {

    console.log("original image info: ", originalImage)
    console.log("cached image info: ", cachedImage)

    // save cached image locally
    const newLocalUri = await SaveLocally(cachedImage);

    // replace original imageInfo
    setImages((prevImages) => 
    prevImages.map(img => 
        img.imageInfo.uri == originalImage.uri 
        ? { ...img, imageInfo: { ...img.imageInfo, uri: newLocalUri, height: cachedImage.height, width: cachedImage.width } } 
        : img
      )
    );
  };

  // Updates the dimensions of the ImageData submited with the new values based on the max width of 200
  const updateImageDataDimensions = async (image: ImageData) => {

    const { width, height } = adjustImageDataSize(image.imageInfo.width, image.imageInfo.height);

    setImages((prevImages) => 
    prevImages.map(img => 
        img.imageInfo.uri == image.imageInfo.uri 
        ? { ...img, width: width, height: height} 
        : img
      )
    );
  };

  const deleteImage = (uri: string): void => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.imageInfo.uri !== uri)
    );
  };

  // Takes in the width and height of the raw image, to evaluate what the actual image aspect ratio is, 
  // then adjust image size to come in when picked as reasonable size for canvas, while maintaining aspect ratio of ImageInfo
  const adjustImageDataSize = (imageInfoWidth: number, imageInfoHeight: number) => {
    const maxWidth = 200;
    const aspectRatio = imageInfoWidth / imageInfoHeight;
    return {
      width: maxWidth,
      height: maxWidth / aspectRatio,
    };
  };


  return (
    // Accessible values from this context component
    <ImageCtx.Provider
      value={{
        images,
        setImages,
        activeImageCtx,
        setActiveImageCtx,
        updateImagePosition,
        updateImageInfo,
        updateImageDataDimensions,
        deleteImage,
      }}
    >
      {children}
    </ImageCtx.Provider>
  );
};