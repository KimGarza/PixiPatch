import React from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AddStickerUtil from './AddStickerUtil';

interface StickerToolProps {
  children?: React.ReactNode;
}

const StickerTool: React.FC<StickerToolProps> = ({children}) => {
  const [toggleStickerSelect, setToggleStickerSelect] = useState<boolean>(false);

  const handleSelectStickers = () => {
    setToggleStickerSelect(!toggleStickerSelect);
  };

  return (
    <TouchableOpacity onPress={handleSelectStickers}>
      <View>
        {children}
        {toggleStickerSelect && <AddStickerUtil/>}
      </View>
    </TouchableOpacity>
  );
}

export default StickerTool;
