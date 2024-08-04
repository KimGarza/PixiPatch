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
    images: ImageData[];
}

const ViewImages: React.FC<ViewImagesProps> = ({images}) => {

    const [activeImageToEdit, setActiveImageToEdit] = useState<ImageData>();

    const handleImageTapToEdit = (image: ImageData) => {
        setActiveImageToEdit(image);
        console.log("active image:", image);
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
                }, activeImageToEdit?.imageInfo.uri == imageCtx.imageInfo.uri && styles.imageSelected,]}
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