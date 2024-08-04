import { View, Image, ImageSourcePropType } from 'react-native';
import { StickerCtx } from '../Stickers/StickersCtx';
import { useContext } from 'react';

interface StickerData {
    sticker: ImageSourcePropType;
    top: number;
    left: number;
}

interface ViewStickersProps {
    stickers: StickerData[];
}

const ViewStickers: React.FC<ViewStickersProps> = ({stickers}) => {

    console.log("stickers view");

    return (
        <View style={{borderWidth: 1, borderColor: 'green', width: '100%', height: '100%', top: 1, position: 'relative' }}>
        {stickers.map((stickerCtx, index) => (
            <Image
            key={ index }
            source={ stickerCtx.sticker }
            style={{
                width: 50, height: 50, 
                zIndex: 9999, 
                flexDirection: 'column',
                position: 'absolute',
                top: stickerCtx.top, 
                left: stickerCtx.left,
            }} 
            />
        ))}
        </View>
    );
}

export default ViewStickers;