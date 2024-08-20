// import PhotoManipulator, { FlipMode, RotationMode } from 'react-native-photo-manipulator';

// interface ImageInfo {
//     uri: string;
//     width: number;
//     height: number;
//     type: string | undefined;
//   }
//   interface ImageData {
//     imageInfo: ImageInfo;
//     top: number;
//     left: number;
//     width: number;
//     height: number;
//   }

//   interface PhotoManipulator {
//     flipImage: (uri: string, mode: FlipMode) => Promise<string>;
//     // Define other methods if needed, like rotateImage, crop, etc.
//   }

// const FlipImage = async (imageData: ImageData, updateImageUri: (uri: string, newUri: string) => void) => {

//   console.log("flip image")
//   console.log(PhotoManipulator);
//   console.log("Image URI:", imageData.imageInfo.uri);

//   try {
//     const resultUri: string = await PhotoManipulator.flipImage(imageData.imageInfo.uri, FlipMode.Horizontal);
//     console.log("resultUri ", resultUri);

//     updateImageUri(imageData.imageInfo.uri, resultUri); // updates from old to the new uri to replace the old with the same imageData content

//   } catch (error) {
//     console.error('Error flipping the image:', error);
//   }
// }

// export default FlipImage;

// flipImage is always null even if i hardcode image uri, it is a known issue