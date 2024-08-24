import * as ImageManipulator from 'expo-image-manipulator';

interface ImageInfo {
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
}

const Crop = async (imageData: ImageData, updateImageInfo: (originalImage: ImageInfo, cachedImage: ImageInfo) => void) => {

    const defaultValue: ImageInfo = {
        uri: '',
        width: 0,
        height: 0,
      };

    try {
        const cropRegion = {
            originX: 10, // Starting X position of the crop region
            originY: 10, // Starting Y position of the crop region
            width: 250,   // Width of the crop region
            height: 300   // Height of the crop region
        };

        const cachedImage  = await ImageManipulator.manipulateAsync(
            imageData.imageInfo.uri,
            [{ crop: cropRegion }],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        updateImageInfo(imageData.imageInfo, cachedImage);

    } catch ( error ) {
        console.error('Error flipping the image:', error);
    }

    return defaultValue;
}



export default Crop;