import React, { useEffect, useState } from 'react';
import { Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useContext } from 'react';
import { ImageCtx } from './ImageCtx';

const ImagePickerUtil = (toggle: boolean) => {
  const { imagesCtx, setImagesCtx } = useContext(ImageCtx); 

  useEffect(() => {
    handlePickImage(); // should happen on each press
  }, [toggle]) // this is only working bc toggle updates but after we use this func it should not need this 
  
  const handlePickImage = async () => {
    console.log("photo handle Pick Image"); 

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
      // update the state with selected image(s)
      const selectedImages = pickerResult.assets.map(asset => ({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      }));
      setImagesCtx(prevImages => [...prevImages, ...selectedImages]);
    }
  };

  return (null);
};

export default ImagePickerUtil;