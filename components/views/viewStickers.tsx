import { View, Image, StyleSheet} from 'react-native';
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
        // <View>
        // {stickers.map((sticker, index) => (
        //     <View 
        //     style={styles.stickers}
        //     key={ index }>
        //         <Image
        //         source={ sticker.uri }
        //         style={{
        //             width: sticker.width, height: sticker.height, 
        //             flexDirection: 'column',
        //             position: 'absolute',
        //             top: sticker.top, 
        //             left: sticker.left,
        //         }} 
        //         />
        //     </View>
        // ))}
        // </View>
    );
}

export default ViewStickers;


const styles = StyleSheet.create({
    stickers: {
        zIndex: 999999, // too high and can no longer select images
      },
})