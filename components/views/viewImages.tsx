import { View } from "react-native";
import { useContext, useState } from "react";
import { ImageCtx } from "../ImageSelection/ImageCtx";
import MutableImage from "../objects/MutableImage";

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
        console.log("testing")
    }
    
    const handleDeleteImage = (imageToDelete: ImageData | null) => {
        if (imageToDelete) { deleteImage(imageToDelete.imageInfo.uri); }
    }

    return (
        <View>
            {images.map((imageCtx, index) => (
                <MutableImage
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