import * as ImageManipulator from 'expo-image-manipulator';
import { SaveLocally } from '../save/saveLocally';

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

const CropImage = async (imageData: ImageData, updateImageInfo: (imageInfo: ImageInfo, newImage: ImageInfo) => void) => {

    try {
        const cropRegion = {
            originX: 10, // Starting X position of the crop region
            originY: 10, // Starting Y position of the crop region
            width: 250,   // Width of the crop region
            height: 300   // Height of the crop region
        };

        const cropResult  = await ImageManipulator.manipulateAsync(
            imageData.imageInfo.uri,
            [{ crop: cropRegion }],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        await SaveLocally(cropResult).then(() => {
            updateImageInfo(imageData.imageInfo, cropResult);
        });

    } catch ( error ) {
        console.error('Error flipping the image:', error);
    }
}

export default CropImage;