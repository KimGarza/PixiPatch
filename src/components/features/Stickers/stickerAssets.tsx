import { ImageSourcePropType } from "react-native";

// this is one large object of sticker assets which for now will include all basic and premium sticker pack requires
type StickerPack = {
  [stickerName: string]: { srcUri: ImageSourcePropType}; // we don't know specific names
};

export const stickerAssets: { [packName: string]: StickerPack } = {
  basic: {
    butterfly: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly2: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers2: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly3: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers3: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly4: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers4: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly5: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers5: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly6: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers6: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly7: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers7: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly8: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers8: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly9: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers9: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly20: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers20: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly30: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers30: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly40: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers40: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly50: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers50: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly60: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers60: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly70: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers70: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
    butterfly80: { srcUri: require('../../../assets/stickerPacks/basic/butterfly.png')},
    flowers80: { srcUri: require('../../../assets/stickerPacks/basic/flower.png')},
  },
  halloween: {},
};