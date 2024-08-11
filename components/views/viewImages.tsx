import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useState } from "react";
import DraggableImage from "../utils/draggableImage";

interface ImageInfo {
    uri: string;
    width: number;
    height: number;
    type: string | undefined;
  }

  interface ImageData {
    imageInfo: ImageInfo;
    top: number;
    left: number;
    width: number;
    height: number;
  }

  interface ViewImagesProps {
    images: ImageData[],
    activatedImage: (image: ImageData | null) => void
}

const ViewImages: React.FC<ViewImagesProps> = ({images, activatedImage}) => {

    const hanldeTapped = (image: ImageData | null) =>  {
        if (image) {
            activatedImage(image);
        } else {
            activatedImage(null);
        }
    }

    return (
        <View>
            {images.map((imageCtx, index) => (
                <DraggableImage
                    key={index}
                    image={imageCtx}
                    activateImage={hanldeTapped}
                />
            ))}
        </View>
    );
}

export default ViewImages;

const styles = StyleSheet.create({
    imageSelected: {
        borderWidth: 2,
        borderColor: '#fc0026',
        zIndex: 4
      },
  });