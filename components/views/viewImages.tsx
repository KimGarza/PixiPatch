import { View } from "react-native";
import MutableImage from "../image/MutableImage";
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

    return (
        <View>
            {images.map((image, index) => (
                <MutableImage
                    key={index}
                    image={image}
                />
            ))}
        </View>
    );
}

export default ViewImages;