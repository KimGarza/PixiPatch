import React, { useEffect, useContext, useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageCtx } from './ImageCtx';
import * as FileSystem from 'expo-file-system';

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

interface ImagePickerUtilProps {
  toggle: boolean;
}

// Dirty work of picking photos from users photo library using ImagePicker from react native. Stores them in useState in ImageCtx.
const ImagePickerUtil: React.FC<ImagePickerUtilProps> = ({ toggle }) => {

  const { setImages } = useContext(ImageCtx);

  const adjustImageSize = (width: number, height: number) => {
    const maxWidth = 200;
    const aspectRatio = width / height;
    return {
      width: maxWidth,
      height: maxWidth / aspectRatio,
    };
  };

  // converts basic photo and converts it to ImageData Type which just adds additional data for app
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
      Alert.alert('Sorry, Elemental Editor need permission to access your photos!');
      return;
    }

    // select the image
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: false,
    });

    if (!pickerResult.canceled) {
      // creates array of images (type ImageInfo) by mapping the pickerResult and setting values to ImageInfo Type for each 
      const selectedImages = pickerResult.assets.map(asset => ({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      }));

      await saveImagesLocally(selectedImages);

      console.log("printing selected images to view new uri ", selectedImages);

      // converts the images into imageData for extra data
      const imageDataArr = selectedImages.map(convertToImageData);

      // uses the ImageCtx to update useState of the images
      setImages(prevImagesData => [...prevImagesData, ...imageDataArr]);
    }
  };

  // takes all selected images, saves each locally
  const saveImagesLocally  = async ( images: ImageInfo[] ) => {
    try {

      for ( const image of images ) {
        console.log("printing image.uri ", image.uri);
        const fileName = image.uri.split('/').pop(); //??
        const localUri = `${FileSystem.documentDirectory}${fileName}`; // pointing to a place where documents for this app will be stored

        await FileSystem.copyAsync({
          from: image.uri,
          to: localUri,
        });

        image.uri = localUri; // repalce the image uri with the local one
        console.log("printing local uri ", localUri);

      }

    } catch ( error ) {
      console.error('Error saving image locally:', error);
    }
  };

  return (null);
};

export default ImagePickerUtil;