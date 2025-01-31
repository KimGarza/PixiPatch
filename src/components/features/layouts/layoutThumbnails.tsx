import { ImageSourcePropType } from "react-native";

type LayoutThumbnail = {
  [name: string]: {srcUri: ImageSourcePropType};
};

export const thumbnails: LayoutThumbnail = {
  main: { srcUri: require('../../../assets/images/layouts/images.png')},
  copy: {srcUri: require('../../../assets/images/layouts/images_copy.png') },
  copyT: {srcUri: require('../../../assets/images/layouts/images_copy_sec.png') },
};