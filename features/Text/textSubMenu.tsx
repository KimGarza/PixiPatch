import {
  View,
} from 'react-native';
import FontMenu from './submenu/fontMenu';
import ColorMenu from './submenu/colorMenu';
import BackgroundColorMenu from './submenu/backgroundColorMenu';

interface Props {
  name: string;
}

const TextSubMenu = ({ name }: Props) => {

  return (
    <View>
      {name == 'font' ? (
        <FontMenu/>
      ) : name == 'backgroundColor' ? (
          <BackgroundColorMenu/>
      ) : name == 'color' ? (
        <ColorMenu/>
      ) : name == 'style' ? (
        <View></View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default TextSubMenu;