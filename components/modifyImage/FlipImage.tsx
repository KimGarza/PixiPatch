import { View, StyleSheet, Text, ImageSourcePropType } from 'react-native';
import { useEffect, useState } from 'react';
import PhotoManipulator, { FlipMode } from 'react-native-photo-manipulator';import { FlipInEasyX } from 'react-native-reanimated';
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
interface Props {
    imageData: ImageData;
}

const FlipImage = ({imageData}: Props) => {

    const [updatedUri, setUpdatedUri] = useState<string>('');

    const cropRegion = { x: 5, y: 30, size: 400, width: 250, height: 10 };
    const targetSize = { size: 200, width: 150, height: 10 };
    
    PhotoManipulator.crop(imageData.imageInfo.uri, cropRegion, targetSize).then(path => {
        console.log(`Result image path: ${path}`);
    });

    useEffect(() => {
        flipImage();
    }, [])

    const flipImage = async () => {
        try {
          const resultUri = await PhotoManipulator.flipImage(imageData.imageInfo.uri, FlipMode.Horizontal);
          setUpdatedUri(resultUri);
        } catch (error) {
          console.error('Error flipping the image:', error);
        }
      };
    
    return { updatedUri }
}

export default FlipImage;

const styles = StyleSheet.create({
    container: {
    }
})