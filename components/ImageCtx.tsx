import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

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
  // String for %age of each for positioning
  top: number;
  left: number;
}

// when using image context this is what options are available to access
interface ImageCtxType {
  imagesData: ImageData[];
  setImagesData: Dispatch<SetStateAction<ImageData[]>>;
  // void  here makes it clear that the function is intended to perform an action but not produce a result.
  updateImagePosition: (index: number, newTop: number, newLeft: number) => void; 
}

// default value is necessary
const defaultValue: ImageCtxType = {
  imagesData: [],
  setImagesData: () => [],
  updateImagePosition: () => {},
};

// creating the context
export const ImageCtx = createContext<ImageCtxType>(defaultValue);

interface ImageProviderProps {
  children?: React.ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);

  // const addImage = (imageInfo: ImageInfo) => {
  //   const initialTop = Math.floor(Math.random() * (51 - 10)) + 10; // 51 for inclusive range
  //   const initialLeft = Math.floor(Math.random() * (61 - 20)) + 20; // 61 for inclusive range

  //   setImagesData((prevImagesData) => [
  //     ...prevImagesData,
  //     { imageInfo, top: `${initialTop}%`, left: `${initialLeft}%` },
  //   ]);
  // };

  const updateImagePosition = (index: number, newTop: number, newLeft: number): void => { // void is return type
    setImagesData((prevImagesData) => {
      const updatedImagesData = [...prevImagesData];
      updatedImagesData[index].top = newTop;
      updatedImagesData[index].left = newLeft;
      return updatedImagesData;
    });
  };

  return (
    // The ImageCtx.Provider is a context provider component created using the ImageCtx context. It allows any child component wrapped within it to access the context values it provides.
    <ImageCtx.Provider
      value={{ // value is a prop
        imagesData,
        setImagesData, // Use the `addImage` function for adding
        updateImagePosition,
      }}
    >
      {children}
    </ImageCtx.Provider>
  );
};