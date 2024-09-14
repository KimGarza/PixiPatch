import React from 'react';
import { TouchableOpacity } from 'react-native';

interface StickerToolProps {
  children?: React.ReactNode;
  menuToggle: () => void;
}

const StickerTool: React.FC<StickerToolProps> = ({children, menuToggle}) => {

  const handleSelectStickers = () => {
    menuToggle(); // menu toggle comes in as false, so by ! it sets it to true same as the toggle for sticker select, then turns to false when icon is clicked again
  };

  return (
    <TouchableOpacity onPress={handleSelectStickers}>
        {children}
    </TouchableOpacity>
  );
}

export default StickerTool;
