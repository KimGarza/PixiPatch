import { View } from "react-native";
import MutableItem from "../mutableItem/MutableItem";
import { ImageItem } from '@/src/customTypes/itemTypes';

  interface ViewImagesProps {
    images: ImageItem[],
}

// images are selected by user, stored in context which provider is wrapped around editorContent. Props value of those images sent to viewImages.
const ViewImages: React.FC<ViewImagesProps> = ({images}) => {

    return (
        <View>
            {images.map((image, index) => (
                <MutableItem
                    key={index}
                    item={image}
                />
            ))}
        </View>
    );
}

export default ViewImages;