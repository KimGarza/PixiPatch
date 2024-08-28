// import React, { createContext, useState, Dispatch, SetStateAction } from "react";
// import { useContext } from "react";
// import { SaveLocally } from "../../components/save/saveLocally";
// import { ImageItem, ImageInfo } from '@/customTypes/itemTypes';

// // Accessible values from this context component
// interface ImageCtxType {
//   images: ImageData[];
//   setImages: Dispatch<SetStateAction<ImageData[]>>;
//   activeImageCtx: ImageData | undefined;
//   setActiveImageCtx: Dispatch<SetStateAction<ImageData | undefined>>;
//   updateImageInfo: (originalImage: ImageInfo, cachedImage: ImageInfo) => void; 
//   deleteImage: (uri: string) => void;
// }

// const defaultValue: ImageCtxType = {
//   images: [],
//   setImages: () => [],
//   activeImageCtx: undefined,  
//   setActiveImageCtx: () => {},
//   updateImageInfo: () => {},
//   deleteImage: () => {},
// };

// export const ImageCtx = createContext<ImageCtxType>(defaultValue);

// // custom hook to use the Image context - best to use so error handling here rather than having to handle it everytime useContext is used.
// export const useImageCxt = () => {
//   const context = useContext(ImageCtx);

//   if (context === undefined) {
//     throw new Error("useImageCxt must be used within an ImageProvider");
//   }
//   return context;
// };
  
// export const ImageProvider: React.FC<{children?: React.ReactNode}> = ({ children }) => {
//   const [images, setImages] = useState<ImageItem[]>([]);
//   const [activeImageCtx, setActiveImageCtx] = useState<ImageData>();

//    // Takes in the image info of the og and the cached in order to create a new local uri (vs the cache uri of the cached image).
//    // Replaces the image in images array with the new cached size and local uri from the cached image. (This is for expo-image-manipulation purposes).
//   const updateImageInfo = async (originalImage: ImageInfo, cachedImage: ImageInfo) => {
//     // save cached image locally
//     const newLocalUri = await SaveLocally(cachedImage);

//     const index = images.findIndex(img => img.imageInfo.uri == originalImage.uri);

//     if (index !== -1) {
//       // Create a new array with the updated item
//       const newImages = [...images]; // Shallow copy of the array
//       const updatedImageInfo = { ...images[index].imageInfo, uri: newLocalUri, width: cachedImage.width, height: cachedImage.height };
//       newImages[index] = { ...images[index], imageInfo: updatedImageInfo }; // Update the specific image
//       setImages(newImages); // Set the new images array to state

//      // Update active image context if necessary
//      if (activeImageCtx?.imageInfo.uri == originalImage.uri) {
//       setActiveImageCtx({ ...activeImageCtx, imageInfo: updatedImageInfo });
//     }} else {

//       // replace original imageInfo
//       setImages((prevImages) => 
//       prevImages.map(img => 
//           img.imageInfo.uri == originalImage.uri 
//           ? { ...img, imageInfo: { uri: newLocalUri, height: cachedImage.height, width: cachedImage.width } } 
//           : img
//         )
//       );

//       if (activeImageCtx?.imageInfo.uri == originalImage.uri) {
//         activeImageCtx.imageInfo.uri == newLocalUri
//       }
//     };
//   }

//   const deleteImage = (uri: string): void => {
//     setImages((prevImages) =>
//       prevImages.filter((image) => image.imageInfo.uri !== uri)
//     );
//   };


//   return (
//     // Accessible values from this context component
//     <ImageCtx.Provider
//       value={{
//         images,
//         setImages,
//         activeImageCtx,
//         setActiveImageCtx,
//         updateImageInfo,
//         deleteImage,
//       }}
//     >
//       {children}
//     </ImageCtx.Provider>
//   );
// };