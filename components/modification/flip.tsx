import * as ImageManipulator from 'expo-image-manipulator'; // part of expo sdk

interface ImageInfo {
    uri: string;
    width: number;
    height: number;
  }
  interface ImageData {
    imageInfo: ImageInfo;
    top: number;
    left: number;
    width: number;
    height: number;
  }

// flipping is done at pixel level, reverses pixels. Rearranges the pixels to create a mirrored version of image.
const Flip = async (imageData: ImageData, updateImageInfo: (original: ImageInfo, cached: ImageInfo) => void) => {
    try {
        console.log("in the flip")
        const result = await ImageManipulator.manipulateAsync(
            imageData.imageInfo.uri,
            [{ flip: ImageManipulator.FlipType.Horizontal }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        )

        updateImageInfo(imageData.imageInfo, result); // replace the current image with the manipulated one, retaining all ImageData info

    } catch (error) {
        console.error('Error flipping the image:', error);
    }
}

export default Flip;