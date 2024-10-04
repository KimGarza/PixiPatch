import * as ImageManipulator from 'expo-image-manipulator';
import { ImageItem, ImageInfo } from '@/src/customTypes/itemTypes';

const Crop = async (imageItem: ImageItem, updateImageInfo: (originalImage: ImageInfo, cachedImage: ImageInfo) => void) => {

    try {
        const cropRegion = {
            originX: 10, // Starting X position of the crop region
            originY: 10, // Starting Y position of the crop region
            width: 250,   // Width of the crop region
            height: 300   // Height of the crop region
        };

        const result  = await ImageManipulator.manipulateAsync(
            imageItem.imageInfo.uri,
            [{ crop: cropRegion }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );

        updateImageInfo(imageItem.imageInfo, result);

    } catch ( error ) {
        console.error('Error cropping the image:', error);
    }
}

export default Crop;