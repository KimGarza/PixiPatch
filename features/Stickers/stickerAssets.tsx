import { ImageSourcePropType } from "react-native";

// this is one large object of sticker assets which for now will include all basic and premium sticker pack requires
type StickerPack = {
  [stickerName: string]: { srcUri: ImageSourcePropType}; // we don't know specific names
};

export const stickerAssets: { [packName: string]: StickerPack } = {
  basic: {
    butterfly: { srcUri: require('../../assets/stickerPacks/basic/butterfly.png')},
    flowers: { srcUri: require('../../assets/stickerPacks/basic/flower.png')}
  },
  halloween: {},
};