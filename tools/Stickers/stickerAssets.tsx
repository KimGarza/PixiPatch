import { ImageSourcePropType } from "react-native";

// this is one large object of sticker assets which for now will include all basic and premium sticker pack requires
type StickerPack = {
  [stickerName: string]: { srcUri: ImageSourcePropType, uri: string}; //In your case, we don't know the specific names of all the stickers ahead of time, so the index signature is used to allow any string key (like 'butterfly', 'flowers', etc.) to map to a value of a certain type (in this case, ImageSourcePropType for the sticker image).
};

export const stickerAssets: { [packName: string]: StickerPack } = {
  basic: {
    butterfly: { srcUri: require('../../assets/stickerPacks/basic/butterfly.png'), uri:  '../../assets/stickerPacks/basic/butterfly.png'},
    flowers: { srcUri: require('../../assets/stickerPacks/basic/flower.png'), uri: '../../assets/stickerPacks/basic/flower.png'}
  },
  halloween: {},
};