import { View, Image, ImageSourcePropType, StyleSheet} from 'react-native';
interface StickerData {
    sticker: ImageSourcePropType;
    top: number;
    left: number;
}

interface ViewStickersProps {
    stickers: StickerData[];
}

const ViewStickers: React.FC<ViewStickersProps> = ({stickers}) => {

    return (
        <View>
        {stickers.map((stickerCtx, index) => (
            <View 
            style={styles.stickers}
            key={ index }>
                <Image
                source={ stickerCtx.sticker }
                style={{
                    width: 50, height: 50, 
                    flexDirection: 'column',
                    position: 'absolute',
                    top: stickerCtx.top, 
                    left: stickerCtx.left,
                }} 
                />
            </View>
        ))}
        </View>
    );
}

export default ViewStickers;


const styles = StyleSheet.create({
    stickers: {
        zIndex: 999999, // too high and can no longer select images
      },
})