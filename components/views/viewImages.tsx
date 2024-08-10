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
    activeImage: (image: ImageData | null) => void
}

const ViewImages: React.FC<ViewImagesProps> = ({images, activeImage}) => {

    const [activeImageToEdit, setActiveImageToEdit] = useState<ImageData |  null>();

    // const hanldeImageTap = (image: ImageData) => {
    //     if (image.imageInfo.uri == activeImageToEdit?.imageInfo.uri) { // if the image clicked is the same image that is already the active image, the user intends to deactivate it
    //         activeImage(null);
    //         setActiveImageToEdit(null);
    //     } else {
    //         activeImage(image);
    //         setActiveImageToEdit(image);
    //     }
    // }

    const handleTap = () => {
        console.log('Image tapped');
    };

    return (
        <View>
            {images.map((imageCtx, index) => (
                <DraggableImage
                key={index}// not taking in height and width yet top and left
                imageInfo={imageCtx.imageInfo} // wahy here we have to use uri: sometimes require and sometimes just the uri
                // activeImageToEdit != null && activeImageToEdit?.imageInfo.uri == imageCtx.imageInfo.uri && styles.imageSelected,]
            />
            // <TouchableOpacity
            //     onPress={() => handleImageTap(imageCtx)}
            //     key={index}
            //     style={styles.selectableImage}>
            //     <Image
            //     source={{ uri: imageCtx.imageInfo.uri }}
            //     style={[{
            //         width: imageCtx.width,
            //         height: imageCtx.height,
            //         top: imageCtx.top,
            //         left: imageCtx.left,
            //     }, activeImageToEdit != null && activeImageToEdit?.imageInfo.uri == imageCtx.imageInfo.uri && styles.imageSelected,]}
            //     />
            // </TouchableOpacity>
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