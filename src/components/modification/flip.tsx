import * as ImageManipulator from 'expo-image-manipulator'; // part of expo sdk
import { ImageItem } from '@/src/customTypes/itemTypes';

// flipping is done at pixel level, reverses pixels. Rearranges the pixels to create a mirrored version of image.
const Flip = async (imageItem: ImageItem, updateImageInfo: (original: ImageItem, cached: ImageItem) => void) => {
    try {
        const result = await ImageManipulator.manipulateAsync(
            imageItem.imageInfo.uri,
            [{ flip: ImageManipulator.FlipType.Horizontal }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        )

        // updateImageInfo(imageItem.imageInfo, result); // replace the current image with the manipulated one, retaining all ImageData info

    } catch (error) {
        console.error('Error flipping the image:', error);
    }
}

export default Flip;