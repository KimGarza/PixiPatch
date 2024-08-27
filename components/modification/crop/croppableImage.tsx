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
    dimensions: {imgWidth: number, imgHeight: number}; // this sizing was retrieved from onchangelayout once image was displayed with 100% x 100%
}

const CroppableImage = ({ image, encodedUri }: Props) => {

    // by default, set to imageData w/h but it will immediately adjust to the size which fills the view area using the onChangeLayout
    const [ displayImgDimensions, setDisplayImgDimensions ] = useState({width: 0, height: 0})

    const [position, setPosition] = useState<{top: number, bottom: number, left: number, right: number}>({top: 0, bottom: 0, left: 0, right: 0});
    const [dimens, setDimens] = useState<{width: number, height: number}>({width: 0, height: 0});

    // finding the size that the image adjusted to in intrinsic values since they pertain to what the user sees when they crop
    const handleImageLayout = ( event: LayoutChangeEvent ) => {
        const { width, height } = event.nativeEvent.layout;
        setDisplayImgDimensions({width, height});
    }

    const handlePositionCallback = (updatedPosition: {top: number, bottom: number, left: number, right: number}) => {
        console.log("position callback ", updatedPosition)
        setPosition(updatedPosition)
    }

    const handleDimensionsCallback = (updatedDimensions: {width: number, height: number}) => {
        console.log("position callback ", updatedDimensions)
        setDimens(updatedDimensions)
    }

    return (
        <View style={styles.fullOpacityImage}>
            <Image
                style={[styles.fullOpacityImage, dimens.width != 0 && { // conditional to check if the callbacks have been activated, if so dimens.width would not be 0
                    left: position.left,
                    top: position.top,
                    bottom: position.bottom,
                    right: position.right,
                    width: dimens.width,
                    height: dimens.height,
                  }]}
                source={encodedUri}
                onLayout={handleImageLayout}
            />

            {displayImgDimensions.width > 0 && <CropInterface imageMaxDimensions={displayImgDimensions} setDimensCallback={handleDimensionsCallback} updatePositionCallback={handlePositionCallback}/>}
        </View>
    );
};

export default CroppableImage;

const styles = StyleSheet.create({
    fullOpacityImage: { // this is being used by view and image bc both are required for image to be visible
        height: '100%',
        width: '100%',
        position: 'absolute',
        borderWidth: 2, borderColor: 'red',
      },
});
