import * as ImageManipulator from 'expo-image-manipulator';

interface ImageInfo {
    uri: string;
    width: number;
    height: number;
    type: string | undefined;
  }
  interface ImageData {
    imageInfo: ImageInfo;
    top: number;
    left: number;
    width: number;
    height: number;
  }

const FlipImage = async (imageData: ImageData, updateImageUri: (uri: string, newUri: string) => void) => {
    let resultUri = '';
    try {
        const result = await ImageManipulator.manipulateAsync(
            imageData.imageInfo.uri,
            [{ flip: ImageManipulator.FlipType.Horizontal }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        )

        updateImageUri(imageData.imageInfo.uri, result.uri); // replace the current image with the manipulated one, retaining all ImageData info
        console.log(imageData.imageInfo.uri == result.uri);
        resultUri = result.uri;

      console.log("result ", result)
    } catch (error) {
        console.error('Error flipping the image:', error);
    }
    
    return resultUri;
}

export default FlipImage;