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

  // flip done at pixel level, reverses pixels. Rearranges the pixels to create a mirrored version of image.
const FlipImage = async (imageData: ImageData, updateImageUri: (originalImage: ImageInfo, cachedImage: ImageInfo) => void) => {
    let resultUri = '';
    try {
        const result = await ImageManipulator.manipulateAsync(
            imageData.imageInfo.uri,
            [{ flip: ImageManipulator.FlipType.Horizontal }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        )

        updateImageUri(imageData.imageInfo, result); // replace the current image with the manipulated one, retaining all ImageData info
        resultUri = result.uri;

    } catch (error) {
        console.error('Error flipping the image:', error);
    }
    
    return resultUri;
}

export default FlipImage;