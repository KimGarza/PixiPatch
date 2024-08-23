import { View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { ImageCtx } from "../image/ImageCtx";
import MutableImage from "../image/MutableImage";

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

  interface ViewImagesProps {
    images: ImageData[],
}

// images are selected by user, stored in context which provider is wrapped around editorContent. Props value of those images sent to viewImages.
const ViewImages: React.FC<ViewImagesProps> = ({images}) => {

    const [ newActiveImage, setNewActiveImage ] = useState<ImageData | null>(null);
    const { deleteImage, activeImageCtx } = useContext(ImageCtx);

    
    const hanldeTapped = (image: ImageData | null) =>  { // only get activated if tapped?
        setNewActiveImage(image);
    }
    
    const handleDeleteImage = (imageToDelete: ImageData | null) => {
        if (imageToDelete) { deleteImage(imageToDelete.imageInfo.uri); }
    }

    
  // detects changes to images within ctx so that if crop or flipping has been done... it can update the component to reflect those changes
  useEffect(() => {
    console.log("CHANGE DETECTED TO IMAGES, OR ACTIVEIMAGECTX IN EDITOR CONTENT ", images);
    // console.log("activeImageCtx ogImageInfo ", activeImageCtx?.ogImageInfo, " and current ", activeImageCtx?.imageInfo)

  }, [ images, activeImageCtx, activeImageCtx?.imageInfo.height ])

    return (
        <View>
            {images.map((imageCtx, index) => (
                <MutableImage
                    key={index}
                    image={imageCtx}
                    isAnotherImageActive={newActiveImage?.imageInfo.uri != imageCtx.imageInfo.uri || newActiveImage == null} // if the current image is not the currently active image
                    deleteImage={handleDeleteImage}
                />
            ))}
        </View>
    );
}

export default ViewImages;