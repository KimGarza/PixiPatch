import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import DraggableImage from "../utils/draggableImage";
import { ImageCtx } from "../ImageSelection/ImageCtx";

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

    const { deleteImage } = useContext(ImageCtx);

    const hanldeTapped = (image: ImageData | null) =>  {
        if (image) {
            activatedImage(image);
        } else {
            activatedImage(null);
        }
    }
    
    const handleDeleteImage = (imageToDelete: ImageData) => {
        console.log("delete this image ")
        deleteImage(imageToDelete.imageInfo.uri);
    }

    return (
        <View>
            {images.map((imageCtx, index) => (
                <DraggableImage
                    key={index}
                    image={imageCtx}
                    activateImage={hanldeTapped}
                    deleteImage={handleDeleteImage}
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