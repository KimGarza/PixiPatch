import React, { useContext, createContext, useState, Dispatch, SetStateAction } from "react";
import { SaveLocally } from "../../components/save/saveLocally";

interface ImageInfo { // native image object
  uri: string;
  width: number;
  height: number;
}
interface ImageData {
  imageInfo: ImageInfo;
  ogImageInfo: ImageInfo;
  top: number;
  left: number;
  width: number;
  height: number;
  contrast?: number;
}
interface ImageCtxType {
  images: Map<string, ImageData>;
  setImages: Dispatch<SetStateAction<Map<string, ImageData>>>;
  activeImageCtx: ImageData | undefined;
  setActiveImageCtx: Dispatch<SetStateAction<ImageData | undefined>>;
  deleteImage: (uri: string) => void;
  updateImageInfo: (originalImage: ImageInfo, cachedImage: ImageInfo) => void; 
}

const defaultValue: ImageCtxType = {
  images: new Map(),
  setImages: () => new Map(),
  activeImageCtx: undefined,  
  setActiveImageCtx: () => {},
  deleteImage: () => {},
  updateImageInfo: () => {},
};

export const ImageCtx = createContext<ImageCtxType>(defaultValue);

// custom hook to use the Image context - best to use so error handling here rather than having to handle it everytime useContext is used.
export const useImageCxt = () => {
  const context = useContext(ImageCtx);

  if (context === undefined) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
  
export const ImageProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {

  const [images, setImages] = useState<Map<string, ImageData>>(new Map());
  const [activeImageCtx, setActiveImageCtx] = useState<ImageData>();

  const updateImageInfo = async (original: ImageInfo, cached: ImageInfo) => {

    const newLocalUri = await SaveLocally(cached);

    setImages((prevImages) => {
      // shallow copy only in reference object in memory, (more efficient that copying all the actual array values) - purpose: helps with triggering rerender 
      const newImages = new Map(prevImages); // Create a new Map based on the previous state

      const imageToUpdate = newImages.get(original.uri); // find the og image
      if (imageToUpdate) {
        imageToUpdate.imageInfo = {
          ...imageToUpdate.imageInfo,
          uri: newLocalUri,
          width: cached.width,
          height: cached.height
        };

        // Set the modified entry back in the Map
        newImages.set(original.uri, imageToUpdate);
      }
      return newImages;
    })
  }

  const deleteImage = (uri: string): void => {

    setImages((prevImages) => {
      // Create a shallow copy of the Map
      const newImages = new Map(prevImages);
      // Use the delete method to remove the image with the specified URI
      newImages.delete(uri);

      return newImages; // Return the modified Map to update the state
    });
  }

  return (
    // Accessible values from this context component
    <ImageCtx.Provider
      value={{
        images,
        setImages,
        activeImageCtx,
        setActiveImageCtx,
        deleteImage,
        updateImageInfo,
      }}
    >
      {children}
    </ImageCtx.Provider>
  );
};