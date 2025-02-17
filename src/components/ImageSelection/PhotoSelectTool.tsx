import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useItemCtx } from "@/src/hooks/contexts/useItemCtx";
import { handlePickImage } from "./ImagePickerUtil"; // ✅ Import function

interface PhotoSelectToolProps {
  children?: React.ReactNode;
}

const PhotoSelectTool: React.FC<PhotoSelectToolProps> = ({ children }) => {
  const { createItems } = useItemCtx(); // ✅ Get `createItems` from context

  const handlePickPhotos = async () => {
    await handlePickImage(createItems); // ✅ Call imported function immediately
  };

  return (
    <TouchableOpacity onPress={handlePickPhotos}>
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default PhotoSelectTool;
