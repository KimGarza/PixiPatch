import { View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { ImageCtx } from "../../hooks/contexts/useImageCtx";
import MutableImage from "../image/MutableImage";
import { useItemCtx } from "@/hooks/contexts/useItemCtx";
  interface BaseItem { 
    id: string;
    type: string; // discriminate within the union
    zIndex: number;
  }
  interface ImageItem extends BaseItem {
    id: string;
    type: 'image'; // discriminate
    zIndex: number;
    imageInfo: ImageInfo;
    ogImageInfo: ImageInfo;
    top: number;
    left: number;
    width: number;
    height: number;
  }
  interface ImageInfo {
    uri: string;
    width: number;
    height: number;
  }
  interface ViewImagesProps {
    images: ImageItem[],
}

// images are selected by user, stored in context which provider is wrapped around editorContent. Props value of those images sent to viewImages.
const ViewImages: React.FC<ViewImagesProps> = ({images}) => {

    const { deleteItems } = useItemCtx();

    const [ newActiveImage, setNewActiveImage ] = useState<ImageItem | null>(null);
    const { activeImageCtx } = useContext(ImageCtx);

    const handleDeleteImage = (imageToDelete: ImageItem) => {
        if (imageToDelete) { 
            deleteItems({ id: imageToDelete.id, itemType: 'image'}); 
        }
    }

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