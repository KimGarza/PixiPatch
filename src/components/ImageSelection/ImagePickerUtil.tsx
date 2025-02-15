import React from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useItemCtx } from "@/src/hooks/contexts/useItemCtx";
import { ImageItem, ImageInfo } from "@/src/customTypes/itemTypes";
import GlobalDimensions from "../global/globalDimensions";

const { dimensions } = GlobalDimensions();

// Dirty work of picking photos from users photo library using ImagePicker from react native. Stores them in useState in ImageCtx.
export const handlePickImage = async (createItems: any) => {
  console.log("handlePickImage");

  // Request permission
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert("Sorry, Pixi Patch needs permission to access your photos!");
    return;
  }

  // Launch Image Picker
  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsMultipleSelection: true,
    base64: false,
  });

  if (!pickerResult.canceled) {
    const selectedImages = pickerResult.assets.map((asset) => ({
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      type: asset.type,
    }));

    await saveImagesLocally(selectedImages);

    // Convert to ImageItem and store in context
    const imageItemArr = selectedImages.map(convertToImageItem);
    createItems({ itemType: "image", properties: imageItemArr });
  }
};

// Helper function to resize images
const adjustImageSize = (width: number, height: number) => {
  const maxWidth = 200;
  const aspectRatio = width / height;
  return {
    width: maxWidth,
    height: maxWidth / aspectRatio,
  };
};

// Converts ImageInfo to ImageItem format
const convertToImageItem = (image: ImageInfo): ImageItem => {
  const { width, height } = adjustImageSize(image.width, image.height);
  const x = Math.floor(Math.random() * (dimensions.width * 0.1)) + dimensions.width * 0.25;
  const y = Math.floor(Math.random() * (dimensions.height * 0.1)) + dimensions.height * 0.1;

  return {
    id: "",
    type: "image",
    zIndex: 2,
    imageInfo: image,
    translateX: x,
    translateY: y,
    layoutX: 0,
    layoutY: 0,
    rotation: 0,
    pendingChanges: { rotation: 0, positionX: x, positionY: y, scale: 1 },
    width,
    height,
    layoutActive: false,
  };
};

// Saves images locally
const saveImagesLocally = async (images: ImageInfo[]) => {
  try {
    for (const image of images) {
      const fileName = image.uri.split("/").pop();
      const localUri = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.copyAsync({ from: image.uri, to: localUri });
      image.uri = localUri;
    }
  } catch (error) {
    console.error("Error saving image locally:", error);
  }
};

export default function ImagePickerUtil() {
  return null; // No UI needed, this is just a utility
}
