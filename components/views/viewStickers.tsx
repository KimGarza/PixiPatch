import { View} from 'react-native';
import MutableItem from '../mutableItem/MutableItem';
import { StickerItem } from '@/customTypes/itemTypes';
interface Props {
    stickers: StickerItem[];
}

const ViewStickers: React.FC<Props> = ({stickers}) => {
try {
    return (
        <View>
            {stickers.map((sticker, index) => (
                <MutableItem
                    key={index}
                    item={sticker}
                />
            ))}
        </View>
    );
} catch (error) {
    console.log("Failed to return stickers from viewStickers", error);
}
   
}

export default ViewStickers;