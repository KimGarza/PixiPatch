import React, { useEffect, useState } from 'react';
import { Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useContext } from 'react';
import { ImageCtx } from './ImageCtx';

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

interface ImagePickerUtilProps {
  toggle: boolean;
}

const ImagePickerUtil: React.FC<ImagePickerUtilProps> = ({ toggle }) => {
  const { imagesData, setImagesData } = useContext(ImageCtx); // importing ability to set imageData array in context

  const adjustImageSize = (width: number, height: number) => {
    const maxWidth = 200;
    console.log("current res WxH: ", width, "x", height)
    const aspectRatio = width / height;
    console.log("updated WxH: ", maxWidth, "x", maxWidth / aspectRatio)
    return {
      width: maxWidth,
      height: maxWidth / aspectRatio,
    };
  };

  // converts arg of imageInfo (basic img from photo lib) and converts it to ImageData which just adds top/left values
  const convertToImageData = (image: ImageInfo) => {
    const { width, height } = adjustImageSize(image.width, image.height)
    const imageData: ImageData = {
      imageInfo: image,
      top: Math.floor(Math.random() * (100 - 30)) + 30,
      left: Math.floor(Math.random() * (200 - 30)) + 30,
      width: width,
      height: height
    }
    return imageData;
  }

  useEffect(() => {
    handlePickImage(); // should happen on each press
  }, [toggle]) // this is only working bc toggle updates but after we use this func it should not need this 
  
  const handlePickImage = async () => {

    // ask for permission to access the library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Sorry, we need photo permissions to amake this work!');
      return;
    }

    // select the image
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: false,
    });

    if (!pickerResult.canceled) {
      // creates array of images (type ImageInfo) by mapping the pickerResult (user selected photos) and setting the ImageInfo values
      const selectedImages = pickerResult.assets.map(asset => ({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      }));

      // creates a new array which stores the selected images (image info) but converts them into imageData for location purposes
      const imageDataArr = selectedImages.map(convertToImageData);

      // uses the imported context class to set the images to the context class
      setImagesData(prevImagesData => [...prevImagesData, ...imageDataArr]);
    }
  };

  return (null);
};

export default ImagePickerUtil;