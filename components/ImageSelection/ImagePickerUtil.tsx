import React, { useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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

      // converts the images into imageData for extra data
      const imageDataArr = selectedImages.map(convertToImageData);

      // uses the ImageCtx to update useState of the images
      setImages(prevImagesData => [...prevImagesData, ...imageDataArr]);
    }
  };

  return (null);
};

export default ImagePickerUtil;