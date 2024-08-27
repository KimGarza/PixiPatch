import React, { useEffect, useContext, useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useImageCtx } from '../../hooks/contexts/useImageCtx';
import * as FileSystem from 'expo-file-system';

interface Item {
  id: string,
  zIndex: number
}
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

interface ImagePickerUtilProps {
  toggle: boolean;
}

// Dirty work of picking photos from users photo library using ImagePicker from react native. Stores them in useState in ImageCtx.
const ImagePickerUtil: React.FC<ImagePickerUtilProps> = ({ toggle }) => {

  const { setImages, images } = useImageCtx();

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

    try {
      
      const { width, height } = adjustImageSize(image.width, image.height)
      const imageData: ImageData = {
        imageInfo: image,
        ogImageInfo: { ...image },
        top: Math.floor(Math.random() * (100 - 30)) + 30,
        left: Math.floor(Math.random() * (200 - 30)) + 30,
        width: width,
        height: height,
      }
      return imageData;
    } catch (error) {
      console.log("error ", error)
    }
    
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

      // converts the images into imageData for extra data
      const imageDataArr = selectedImages.map(convertToImageData);

      // uses the ImageCtx to update useState of the images
      setImages(prevImages => [...prevImages, ...imageDataArr]);
    }
  };

  // takes all selected images, saves each locally
  const saveImagesLocally  = async ( images: ImageInfo[] ) => {
    try {

      for ( const image of images ) {
        const fileName = image.uri.split('/').pop(); //??
        const localUri = `${FileSystem.documentDirectory}${fileName}`; // pointing to a place where documents for this app will be stored

        await FileSystem.copyAsync({
          from: image.uri,
          to: localUri,
        });

        image.uri = localUri; // repalce the image uri with the local one
      }

    } catch ( error ) {
      console.error('Error saving image locally:', error);
    }
  };

  return (null);
};

export default ImagePickerUtil;