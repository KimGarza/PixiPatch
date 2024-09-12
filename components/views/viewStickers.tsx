import { View} from 'react-native';
import MutableItem from '../mutableItem/MutableItem';
import { StickerItem } from '@/customTypes/itemTypes';
interface Props {
    stickers: StickerItem[];
}

const ViewStickers: React.FC<Props> = ({stickers}) => {

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
}

export default ViewStickers;