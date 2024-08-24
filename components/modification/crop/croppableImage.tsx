import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ImageSourcePropType, View, LayoutChangeEvent } from 'react-native';
import CropInterface from './cropInterface';

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

interface Props {
    image: ImageData;
    encodedUri: ImageSourcePropType;
}

const CroppableImage = ({ image, encodedUri }: Props) => {

    const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [displayImgWidth, setDisplayImgHeight] = useState({width: image.imageInfo.width, height: image.imageInfo.height})

    // due to the fact that most images have a hight pixel res / density and intrinsic units will be adjsuted for display purposes
    // we must calculate the ratio of the actual imageInfo.w and h to the displayed size. This will help calculate for crop region.
    const calculateActualCropRegion = () => {
        const scaleWidth = image.imageInfo.width / displayImgWidth.width;
        const scaleHeight = image.imageInfo.height / displayImgWidth.height;
    }

    // finding the size that the image adjusted to in intrinsic values since they pertain to what the user sees when they crop
    const handleImageLayout = ( event: LayoutChangeEvent ) => {
        console.log("first crop box value: ", cropBox);

        const { width, height } = event.nativeEvent.layout;
        setDisplayImgHeight({width, height});

        setCropBox({
            x: 0,
            y: 0,
            width: width,
            height: height
        });
    }

    useEffect(() => {
        console.log("crop coords ", cropBox)
    }, [cropBox])

    return (
        <View style={styles.imageToCrop}>
            <Image
                style={styles.imageToCrop}
                source={encodedUri}
                onLayout={handleImageLayout}
            />

            { cropBox.width != 0 && <CropInterface cropBox={cropBox} /> }
            {/* setCropBox={setCropBox} */}
        </View>
    );
};

export default CroppableImage;

const styles = StyleSheet.create({
    imageToCrop: { // this is being used by view and image bc both are required for image to be visible
        height: '100%',
        width: '100%',
        position: 'absolute',
        borderWidth: 2, borderColor: 'red',
      },
});
