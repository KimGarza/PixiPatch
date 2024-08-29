import { View } from "react-native";
import MutableImage from "../image/MutableImage";
import { ImageItem } from '@/customTypes/itemTypes';

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