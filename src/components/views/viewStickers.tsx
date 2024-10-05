import { View} from 'react-native';
import MutableItem from '../mutableItem/MutableItem';
import { StickerItem } from '@/src/customTypes/itemTypes';
interface Props {
    stickers: StickerItem[];
}

const ViewStickers: React.FC<Props> = ({stickers}) => {
try {
    return (
        <View>
            {stickers.map((sticker) => (
                <MutableItem
                    key={sticker.id}
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