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
  }
  
  interface ViewImagesProps {
    images: ImageData[],
    activeImage: (image: ImageData | null) => void
}

const ViewImages: React.FC<ViewImagesProps> = ({images, activeImage}) => {

    const [activeImageToEdit, setActiveImageToEdit] = useState<ImageData |  null>();

    const handleImageTapToEdit = (image: ImageData) => {
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
            <TouchableOpacity onPress={() => handleImageTapToEdit(imageCtx)}>
                <Image 
                key={ index }
                source={{ uri: imageCtx.imageInfo.uri }}
                style={[{ 
                    width: 200, height: 200,
                    position: 'absolute',
                    zIndex: 99, 
                    flexDirection: 'column', // idk why but this helps with the scattering
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
    imageSelected: {
        borderWidth: 2,
        borderColor: 'red',
        zIndex: 1
      },
})