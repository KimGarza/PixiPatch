import React, { useState } from 'react';
import { View, Button, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// object literal reflects the info of an image from library for typescript purposes in usestate
interface ImageInfo {
  uri: string;
  width: number;
  height: number;
  type: string | undefined;
}

// this is used to define what this react functional componenet takes in as props which is just children, typescript purposes.
interface PhotoPickerProps {
  children?: React.ReactNode;  // optional children prop
}

// typescript defined component which takes in children which will be icon to represent the clickable thing to execute handle pick image
const PhotoPicker: React.FC<PhotoPickerProps> = ({ children }) => {
  const [images, setImages] = useState<ImageInfo[]>([]);


  const handlePickImage = async () => {
    // ask for permission to access the library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Sorry, we need photo permissions to make this work!');
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
      setImages(prevImages => [...prevImages, ...selectedImages]); // still need to understand
    }
  };

  return (
    // sets images
    <TouchableOpacity onPress={handlePickImage}>
        {children}
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200 }}
          />
        ))}
    </TouchableOpacity>
  );
};

export default PhotoPicker;