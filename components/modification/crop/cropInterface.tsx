import React from 'react';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Crop from './crop';
import { useImageCxt } from '@/hooks/contexts/useImageCtx';
import useCropPanResponder from './useCropPanResponder';

interface ImageInfo {
    uri: string;
    width: number;
    height: number;
  }
  interface ImageData {
    imageInfo: ImageInfo;
    ogImageInfo: ImageInfo;
    top: number;
    left: number;
    width: number;
    height: number;
  }

interface Props {
    cropBox: { x: number, y: number, width: number, height: number }
    setCropBox: React.Dispatch<React.SetStateAction<{
        x: number;
        y: number;
        width: number;
        height: number;
    }>>
}

const CropInterface = ({ cropBox }: Props) => {

    const panHandlers = useCropPanResponder({cropBox});

  return (
    <View style={{ 
        position: 'absolute',
        top: cropBox.y,
        left: cropBox.x,
        width: cropBox.width,
        height: cropBox.height,
        borderWidth: 5, borderColor: 'blue', borderStyle: 'solid'}}>
        
        <View style={[styles.corner, { right: -5, top: -5 }]} { ...panHandlers } />
        {/* Add other corners */}

    </View>

  );
};

const styles = StyleSheet.create({
  corner: {
    position: 'absolute',
    maxWidth: 20,
    maxHeight: 20,
    minWidth: 20,
    minHeight: 20,
    borderWidth: 2, borderColor: 'white', borderStyle: 'solid',
  },
});

export default CropInterface;
