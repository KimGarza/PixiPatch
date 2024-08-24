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

    try {
        const cropRegion = {
            originX: 10, // Starting X position of the crop region
            originY: 10, // Starting Y position of the crop region
            width: 250,   // Width of the crop region
            height: 300   // Height of the crop region
        };

        const result  = await ImageManipulator.manipulateAsync(
            imageData.imageInfo.uri,
            [{ crop: cropRegion }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );

        updateImageInfo(imageData.imageInfo, result);

    } catch ( error ) {
        console.error('Error cropping the image:', error);
    }
}

export default Crop;