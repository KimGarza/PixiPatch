import {
  View,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';

import GlobalDimensions from '@/components/dimensions/globalDimensions';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SwipeDownMenu from '@/components/utils/swipeMenuDown';
import { useFonts } from 'expo-font';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import AddText from './addText';
import { useTextCtx } from './useTextCtx';
import SubMenu from './subMenu';

const cinnamon = '#581800';
const { width, height, headerHeight } = GlobalDimensions();
const aspectRatio = 10 / 16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
const canvasHeight = width / aspectRatio;

interface TextMenuProps {
  menuToggle: (menuName: string) => void;
}

// text box, size, color, style, font, effect?, placement
const TextMenu: React.FC<TextMenuProps> = ({ menuToggle }) => {
    
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [subMenu, setSubMenu] = useState<string>('');

  useEffect(() => {
    console.log("isTyping", isTyping, " and submenu ", subMenu)
}, [isTyping, subMenu])

  const [fontsLoaded] = useFonts({
    ToThePoint: require('../../assets/fonts/ToThePointRegular-n9y4.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleCloseMenu = () => {
    menuToggle('text');
  };

  return (
    // prettier-ignore
    <View style={[isTyping && styles.moreControl]}>
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
                color: cinnamon,
                textAlign: 'center',
              }}>
                Text{' '} <MaterialCommunityIcons name="typewriter" size={30} color={cinnamon}/>
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
                <SubMenu name={subMenu}/>
            </View>}

          <View style={[isTyping ? styles.optionsText : styles.options]}>
          <View style={styles.textOptionBlock}>
            <Text style={{ textAlign: 'center' }}>type</Text>
            <TouchableOpacity
              onPress={() => {setIsTyping(true)}}
              style={styles.option}
            >
              <MaterialCommunityIcons name="form-textbox" size={40} color={cinnamon}/>
            </TouchableOpacity>
          </View>

          <View style={styles.textOptionBlock}>
            <Text style={{ textAlign: 'center' }}>font</Text>
            <TouchableOpacity onPress={() => {setSubMenu('font')}} style={styles.option}>
              <FontAwesome name="font" size={35} color={cinnamon} />
            </TouchableOpacity>
          </View>

          <View style={styles.textOptionBlock}>
            <Text style={{ textAlign: 'center' }}>size</Text>
            <TouchableOpacity onPress={() => {setSubMenu('size')}} style={styles.option}>
              <FontAwesome name="text-height" size={35} color={cinnamon} />
            </TouchableOpacity>
          </View>

          <View style={styles.textOptionBlock}>
            <Text style={{ textAlign: 'center' }}>color</Text>
            <TouchableOpacity onPress={() => {setSubMenu('color')}} style={styles.option}>
              <Foundation name="text-color" size={40} color={cinnamon} />
            </TouchableOpacity>
          </View>

          <View style={styles.textOptionBlock}>
            <Text style={{ textAlign: 'center' }}>style</Text>
            <TouchableOpacity onPress={() => {setSubMenu('style')}} style={styles.option}>
              <FontAwesome name="italic" size={35} color={cinnamon} />
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
    width: width,
    height: (height - canvasHeight - headerHeight) * 1.7, // if top starts 10% higher, why isn't it * 1.1?
    backgroundColor: '#fffaf8',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: width,
    height: height - canvasHeight - headerHeight,
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
    backgroundColor: '#e2d9d4',
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
    width: width,

    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    // alignItems: 'flex-end',
    // top: '50%',
    // gap: 20,
    // width: width,
  },
  optionsText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    top: '50%',
    gap: 20,
    width: width,
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
    borderColor: '#c9bdb9',
  },
  input: {
    position: 'absolute',
    width: '80%',
    alignContent: 'center',
  },
  subMenu: {
    position: 'absolute',
    width: width, height: 80,
    top: 45,
    alignItems: 'center',
    borderWidth: 1, borderColor: 'green'
  },
});
