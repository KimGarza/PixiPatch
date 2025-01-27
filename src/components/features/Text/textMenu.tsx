import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import GlobalDimensions from '@/src/components/global/globalDimensions';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwipeDownMenu from '@/src/components/utils/swipeMenuDown';
import { useFonts } from 'expo-font';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import AddText from './addText';
import TextSubMenu from './textSubMenu';
import { useTextCtx } from './useTextCtx';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';
import GlobalTheme from '@/src/components/global/GlobalTheme';

const { colors } = GlobalTheme();

const { dimensions } = GlobalDimensions();
const aspectRatio = 10 / 16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
const canvasHeight = dimensions.width / aspectRatio;

interface TextMenuProps {
  menuToggle: (menuName: string) => void;
}

// text box, size, color, style, font, effect?, placement
const TextMenu: React.FC<TextMenuProps> = ({ menuToggle }) => {
  const [activeTextExists, setActiveTextExists] = useState<boolean>(false);

  const { activeText } = useTextCtx();
  const { createItems } = useItemCtx();

  useEffect(() => {
    // checks if user has typed text and has not completed it, if not there is no text selected, then they cannot edit
    if (activeText.text != '') {
        setActiveTextExists(true);
        setSubMenu('font'); // default submenu to fill in extra space rendered for purposes of text editing
    } else {
        setActiveTextExists(false);
    }
  }, [activeText]);

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [subMenu, setSubMenu] = useState<string>('');

  useEffect(() => {}, [isTyping, subMenu]);

  const [fontsLoaded] = useFonts({
    ToThePoint: require('../../../assets/fonts/ToThePointRegular-n9y4.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleCloseMenu = () => {
    menuToggle('text');
  };

  return (
    // prettier-ignore
    <View style={[isTyping || activeTextExists ? styles.moreControl : null]}>
    {/* <View style={styles.moreControl}> */}
      <SwipeDownMenu menuToggle={handleCloseMenu}>
        <View style={styles.container}>

          <View style={styles.close}>
            <TouchableOpacity onPress={() => handleCloseMenu()}>
              <EvilIcons name={'close'} size={35} color="#a3968e" />
            </TouchableOpacity>
          </View>

          <View style={styles.title}>
            <Text
              style={{
                fontFamily: 'ToThePoint',
                fontSize: 45,
                color: colors.DarkRust,
                textAlign: 'center',
              }}>
                Text{' '} <MaterialCommunityIcons name="typewriter" size={30} color={`${colors.DarkRust}`}/>
            </Text>
          </View>
            
            {/* Add Text */}
            {isTyping &&
            <View style={styles.input}>
                <AddText setIsTyping={setIsTyping}/>
            </View>}

            {/* Submenus */}
            {!isTyping && subMenu != '' && 
            <View style={styles.subMenu}>
                <TextSubMenu name={subMenu}/>
            </View>}

            {/* Stylize */}
          <View style={[isTyping || activeTextExists ? styles.optionsExpanded : styles.options]}>

          <View style={styles.textOptionBlock}>
            <Text style={{ textAlign: 'center', marginBottom: 5 }}>type</Text>
                <TouchableOpacity
                onPress={() => {setIsTyping(true)}}
                style={styles.option}
                >
                <MaterialCommunityIcons name="form-textbox" size={40} color={colors.DarkRust}/>
                </TouchableOpacity>
          </View>

            <View style={styles.textOptionBlock}>
                <Text style={{ textAlign: 'center', marginBottom: 5 }}>font</Text>
                <TouchableOpacity onPress={activeTextExists ? () => {setSubMenu('font')} : undefined} style={styles.option}>
                <FontAwesome name="font" size={35} color={colors.DarkRust} />
                </TouchableOpacity>
            </View>

            <View style={styles.textOptionBlock}>
                <Text style={{ textAlign: 'center', marginBottom: 5 }}>color</Text>
                <TouchableOpacity onPress={activeTextExists ? () => {setSubMenu('color')} : undefined} style={styles.option}>
                <Foundation name="text-color" size={40} color={colors.DarkRust} />
                </TouchableOpacity>
            </View>

            <View style={styles.textOptionBlock}>
                <Text style={{ textAlign: 'center', marginBottom: 5 }}>highlight</Text>
                <TouchableOpacity onPress={activeTextExists ? () => {setSubMenu('backgroundColor')} : undefined} style={styles.option}>
                <FontAwesome5 name="highlighter" size={35} color={colors.DarkRust} />
                </TouchableOpacity>
            </View>

        </View>
        </View>
      </SwipeDownMenu>
    </View>
  );
};

export default TextMenu;

const styles = StyleSheet.create({
  moreControl: {
    top: '-10%',
    width: dimensions.width,
    height: (dimensions.height - canvasHeight - dimensions.headerHeight) * 1.7, // if top starts 10% higher, why isn't it * 1.1?
    backgroundColor: colors.WhitePeach,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: dimensions.width,
    height: dimensions.height - canvasHeight - dimensions.headerHeight,
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    margin: 5,
    right: 0,
    top: 0,
    zIndex: 99999999,
  },
  title: {
    borderWidth: 1,
    borderBottomWidth: 0,
    backgroundColor: colors.KindGrey,
    flexDirection: 'column',
    position: 'absolute',
    top: -50,
    zIndex: 9,
    width: '101%',
    padding: 2,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top: '35%',
    gap: 20,
    width: dimensions.width,
  },

  optionsExpanded: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    top: '50%',
    gap: 20,
    width: dimensions.width,
  },
  backgrounds: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    gap: 20,
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  textOptionBlock: {
    flexDirection: 'column',
  },
  option: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.Mud,
  },
  input: {
    position: 'absolute',
    width: '80%',
    alignContent: 'center',
  },
  subMenu: {
    position: 'absolute',
    width: dimensions.width,
    height: 80,
    top: 45,
    alignItems: 'center',
  },
});
