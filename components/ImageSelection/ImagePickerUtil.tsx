import React, { useEffect, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useItemCtx } from '@/hooks/contexts/useItemCtx';
import * as FileSystem from 'expo-file-system';
// All images, stickers, drawings will be combined since all are orderable (discriminated union)
interface BaseItem { 
  id: string;
  type: string; // discriminate within the union
  zIndex: number;
}
interface ImageItem extends BaseItem {
  id: string;
  type: 'image'; // discriminate
  zIndex: number;
  imageInfo: ImageInfo;
  ogImageInfo: ImageInfo;
  top: number;
  left: number;
  width: number;
  height: number;
}
interface StickerItem extends BaseItem {
  id: string;
  type: 'sticker'; // discriminate
  zIndex: number;
  sticker: ImageSourcePropType;
  top: number;
  left: number;
}
interface DrawingItem extends BaseItem {
  id: string;
  type: 'drawing'; // discriminate
  zIndex: number;
  path: Point[];
  top: number;
  left: number;
}

type Item = ImageItem | StickerItem | DrawingItem; // Union Type Item is the union, an item can be any of these item types

// values required for some attributes
type Point = {
  x: number;
  y: number;
};
interface ImageInfo {
  uri: string;
  width: number;
  height: number;
}

interface ImagePickerUtilProps {
  toggle: boolean;
}

// Dirty work of picking photos from users photo library using ImagePicker from react native. Stores them in useState in ImageCtx.
const ImagePickerUtil: React.FC<ImagePickerUtilProps> = ({ toggle }) => {

  const { createItems } = useItemCtx();

  const adjustImageSize = (width: number, height: number) => {
    const maxWidth = 200;
    const aspectRatio = width / height;
    return {
      width: maxWidth,
      height: maxWidth / aspectRatio,
    };
  };

  // converts basic photo and converts it to ImageData Type which just adds additional data for app
  const convertToImageItem = (image: ImageInfo) => {
    let newWidth = 100;
    let newHeight = 100;

    try { // to adjust the images size to convert to a better viewable on screen (logical units in)

      const { width, height } = adjustImageSize(image.width, image.height)
      newWidth = width;
      newHeight = height;

    } catch (error) {
      console.log("error ", error)
    }

    const imageItem: ImageItem = { // returns image regardless of if wxh adjustment fails
      id: '',
      type: 'image',
      zIndex: 0,
      imageInfo: image,
      ogImageInfo: { ...image },
      top: Math.floor(Math.random() * (100 - 30)) + 30,
      left: Math.floor(Math.random() * (200 - 30)) + 30,
      width: newWidth,
      height: newHeight,
    }

    return imageItem;
  }

  useEffect(() => {
    handlePickImage(); // should happen on each press
  }, [toggle]) // try getting rid of toggle!
  
  const handlePickImage = async () => {

    // ask for permission to access the library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Sorry, Elemental Editor need permission to access your photos!');
      return;
    }

    // select the image(s)
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      base64: false,
    });

    if (!pickerResult.canceled) {
      // creates array of selectedImages by mapping the pickerResult images and setting values to ImageInfo type for each 
      const selectedImages = pickerResult.assets.map(asset => ({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      }));

      await saveImagesLocally(selectedImages);

      // converts the images into imageData for extra details such as logical units width x height
      const imageItemArr = selectedImages.map(convertToImageItem);

      createItems({ itemType: 'image', properties: imageItemArr});
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