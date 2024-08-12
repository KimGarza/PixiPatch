import { View, StyleSheet } from "react-native";
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

    const [ newActiveImage, setNewActiveImage ] = useState<ImageData | null>(null);
    const { deleteImage } = useContext(ImageCtx);

    const hanldeTapped = (image: ImageData | null) =>  { // only get activated if tapped?
        activatedImage(image);
        setNewActiveImage(image);
    }
    
    const handleDeleteImage = (imageToDelete: ImageData) => {
        deleteImage(imageToDelete.imageInfo.uri);
    }

    return (
        <View>
            {images.map((imageCtx, index) => (
                <DraggableImage
                    key={index}
                    image={imageCtx}
                    activateImage={hanldeTapped}
                    isAnotherImageActive={newActiveImage?.imageInfo.uri != imageCtx.imageInfo.uri || newActiveImage == null} // if the current image is not the currently active image
                    deleteImage={handleDeleteImage}
                />
            ))}
        </View>
    );
}

export default ViewImages;