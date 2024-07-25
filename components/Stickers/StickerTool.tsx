import React from 'react';
import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AddStickerUtil from './AddStickerUtil';

interface StickerToolProps {
  children?: React.ReactNode;
  menuToggle: () => void;
}

const StickerTool: React.FC<StickerToolProps> = ({children, menuToggle}) => {
  const [toggleStickerSelect, setToggleStickerSelect] = useState<boolean>(false);

  const handleSelectStickers = () => {
    setToggleStickerSelect(!toggleStickerSelect);
    menuToggle(); // menu toggle comes in as false, so by ! it sets it to true same as the toggle for sticker select, then turns to false when icon is clicked again
    console.log("handle select stickers", !toggleStickerSelect);
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
