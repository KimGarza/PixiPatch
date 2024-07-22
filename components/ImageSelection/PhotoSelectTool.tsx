import React from 'react';
import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import ImagePickerUtil from './ImagePickerUtil';

// for defining props selected from library
interface PhotoSelectToolProps {
  children?: React.ReactNode;
}

// children is icon for selecting
const PhotoSelectTool: React.FC<PhotoSelectToolProps> = ({children}) => {

  const [toggleImagePicker, setToggleImagePicker] = useState<boolean>(false);

  // happens when onPress from touchableOpacity happens
  const handlePickPhotos = () => {
    // toggles use state so that anytime toggle changes, use effect happen in depper imagepickerutil function
    setToggleImagePicker(!toggleImagePicker);

  };

  return (
    <TouchableOpacity onPress={handlePickPhotos}>
      <View>
        {children}
        {/* bc use effect is inside image picker util it must go up here at top react hook rules
        does all dirty work on native side for actually going and getting photo library photos/permissions, etc... */}
      {toggleImagePicker && <ImagePickerUtil toggle={toggleImagePicker}/>}

      </View>
    </TouchableOpacity>
  );
}

export default PhotoSelectTool;
