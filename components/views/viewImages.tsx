import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useState } from "react";

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
    activeImage: (image: ImageData | null) => void
}

const ViewImages: React.FC<ViewImagesProps> = ({images, activeImage}) => {

    const [activeImageToEdit, setActiveImageToEdit] = useState<ImageData |  null>();

    const handleImageTapToEdit = (image: ImageData) => {
        console.log("we trying anything here")
        if (image.imageInfo.uri == activeImageToEdit?.imageInfo.uri) { // if the image clicked is the same image that is already the active image, the user intends to deactivate it
            activeImage(null);
            setActiveImageToEdit(null);
        } else {
            activeImage(image);
            setActiveImageToEdit(image);
        }
    }

    return (
        <View>
            {images.map((imageCtx, index) => (
            <TouchableOpacity 
                onPress={() => handleImageTapToEdit(imageCtx)}
                key={index} 
                style={styles.selectableImage}>
                <Image 
                source={{ uri: imageCtx.imageInfo.uri }}
                style={[{ 
                    width: imageCtx.width,
                    height: imageCtx.height,
                    top: imageCtx.top,
                    left: imageCtx.left,
                }, activeImageToEdit != null && activeImageToEdit?.imageInfo.uri == imageCtx.imageInfo.uri && styles.imageSelected,]}
                />  
            </TouchableOpacity>
            ))}
        </View>
    );
}

export default ViewImages;

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        flexDirection: 'column', // idk why but this helps with the scattering
        zIndex: 2 
    },
    imageSelected: {
        borderWidth: 2,
        borderColor: '#fc0026',
        zIndex: 4
      },
    selectableImage: {
        zIndex: 3
    }
})