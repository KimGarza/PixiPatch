import { ImageSourcePropType } from "react-native";

type LayoutThumbnail = {
  [name: string]: {srcUri: ImageSourcePropType};
};

export const thumbnails: LayoutThumbnail = {
  images: { srcUri: require('../../../assets/images/layouts/images.png')},
  images_copy: {srcUri: require('../../../assets/images/layouts/images_copy.png') },
  images_copy_sec: {srcUri: require('../../../assets/images/layouts/images_copy_sec.png') },
  noLayout: { srcUri: require('../../../assets/images/layouts/images.png')},
};