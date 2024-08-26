import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ImageSourcePropType, View, LayoutChangeEvent } from 'react-native';


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

const FilterableImage = ({ image, encodedUri, dimensions }: Props) => {

    return (

        <View style={styles.image}>
            <Image
                style={[styles.image, 
                    {width: dimensions.imgWidth,
                    height: dimensions.imgHeight,
                }]}
                source={encodedUri}
            />
        </View>
    );
};

export default FilterableImage;

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        borderWidth: 2, borderColor: 'pink',
      },
});