import React from 'react';
import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import ImagePickerUtil from './ImagePickerUtil';
interface PhotoSelectToolProps {
  children?: React.ReactNode; // children will be icon as a button
}

// Acts as a button to activate ImagePicker using a toggle to conditionally render ImagePickerUtil coponent
const PhotoSelectTool: React.FC<PhotoSelectToolProps> = ({children}) => {

  const [toggleImagePicker, setToggleImagePicker] = useState<boolean>(false);

  const handlePickPhotos = () => {
    setToggleImagePicker(!toggleImagePicker);
  };

  return (
    <TouchableOpacity onPress={handlePickPhotos}>
      <View>
        {children}
        {toggleImagePicker && <ImagePickerUtil toggle={toggleImagePicker}/>}
      </View>
    </TouchableOpacity>
  );
}

export default PhotoSelectTool;
