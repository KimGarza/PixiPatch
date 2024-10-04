import { ImageSourcePropType } from "react-native";

// this is one large object of assets which for now will include all basic background pack requires
type BackgroundPack = {
  [bgName: string]: { srcUri: ImageSourcePropType}; 
};

export const backgroundAssets: { [bgName: string]: BackgroundPack } = {
  basic: {
    black: { srcUri: require('../../../assets/images/bgPacks/basic/black.png')},
    sage: { srcUri: require('../../../assets/images/bgPacks/basic/sage.png')},
    pink: { srcUri: require('../../../assets/images/bgPacks/basic/pink.png')},
    white: { srcUri: require('../../../assets/images/bgPacks/basic/white.png')},
    mint: { srcUri: require('../../../assets/images/bgPacks/basic/mint.png')},
    black2: { srcUri: require('../../../assets/images/bgPacks/basic/black.png')},
    sage2: { srcUri: require('../../../assets/images/bgPacks/basic/sage.png')},
    pink2: { srcUri: require('../../../assets/images/bgPacks/basic/pink.png')},
    white2: { srcUri: require('../../../assets/images/bgPacks/basic/white.png')},
    mint2: { srcUri: require('../../../assets/images/bgPacks/basic/mint.png')},
  },
  halloween: {},
};