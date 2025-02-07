import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GlobalDimensions from '../global/globalDimensions';
import * as FileSystem from 'expo-file-system';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';
import { ImageItem, ImageInfo } from '@/src/customTypes/itemTypes';

const { dimensions } = GlobalDimensions();
interface Props {
  toggle: boolean;
}

// Dirty work of picking photos from users photo library using ImagePicker from react native. Stores them in useState in ImageCtx.
const ImagePickerUtil: React.FC<Props> = ({ toggle }) => {

  const { createItems } = useItemCtx();

  // Width limitation while maintaining aspect ratio for height to adjust
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
    let updatedWidth = 100; // default to be changed
    let updatedHeight = 100; // default to be changed

    try { // to adjust the images size to convert to a better viewable on screen (logical units in)

      const { width, height } = adjustImageSize(image.width, image.height)
      updatedWidth = width;
      updatedHeight = height;

    } catch (error) {
      console.log("error ", error)
    }

    // const canvasWidth = dimensions.width * 0.9; // Allow some margin
    // const canvasHeight = dimensions.height * 0.8; // Allow some margin

    // const x = Math.random() * (canvasWidth - 100); // Ensure it stays inside width
    // const y = Math.random() * (canvasHeight - 100); // Ensure it stays inside height

    // Randomizing within bounds of screen dimensions where to make images go on canvas
    const x = Math.floor(Math.random() * (dimensions.width * 0.1)) + (dimensions.width * 0.25);
    const y = Math.floor(Math.random() * (dimensions.height * 0.1)) + (dimensions.height * 0.1);

    const imageItem: ImageItem = { // returns image regardless of if wxh adjustment fails
      id: '', type: 'image', zIndex: 2,
      imageInfo: image,
      // ogImageInfo: { ...image },
      translateX: x, translateY: y,
      layoutX: 0, layoutY: 0,
      rotation: 0,
      pendingChanges: {rotation: 0, positionX: x, positionY: y, scale: 1},
      width: updatedWidth,
      height: updatedHeight,
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
      Alert.alert('Sorry, Pixi Patch need permission to access your photos!');
      return;
    }

    // select the image(s)
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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