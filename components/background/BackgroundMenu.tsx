import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BackgroundCtx } from './BackgroundCtx';
import { useContext } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width; // or 'window'
  const screenHeight = Dimensions.get('screen').height; // or 'window' // for some reason this is 22 larger with get window and 50 too large with screen! And using useDimensions from react same result. Using 100% in styling as opposed to this works not sure why
  const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
  const canvasHeight = screenWidth / aspectRatio;
  var headerImageHeight = 0;
  var toolbarHeight = 0;
  if (headerImageHeight) { toolbarHeight = screenHeight - canvasHeight - headerImageHeight;}
interface BackgroundMenuProps {
  menuToggle: () => void;
}

const BackgroundMenu: React.FC<BackgroundMenuProps> = ({ menuToggle }) => {

  // background directory
  const backgroundDir: ImageSourcePropType[] = [
    require('../../assets/images/backgrounds/backgroundblack.png'),
    require('../../assets/images/backgrounds/backgroundmint.png'),
    require('../../assets/images/backgrounds/backgroundpink.png'),
    require('../../assets/images/backgrounds/backgroundsage.png'),
    require('../../assets/images/backgrounds/backgroundwhite.png'),
  ];


  // background context for adding backgrounds based on user selection
  const { setBackground } = useContext(BackgroundCtx);

  // on select/press background, convert Background to have a position (backgroundData) and add it to the backgrounds state array in backgroundCtx 
  const handleBackgroundSelect = (background: ImageSourcePropType) => {
    
    setBackground(background); // update old to new background or set initial one
  }

  const handleCloseMenu = () => {
    menuToggle();
  }

    return (
      <View style={styles.backgroundTool}>
        <View style={styles.menuLayout}>

          <View style={styles.close}>
            <TouchableOpacity onPress={() => handleCloseMenu()}>
            <Fontisto name={'close'} size={25}/>
            </TouchableOpacity>
          </View>

          <View style={styles.backgrounds}>
              {backgroundDir.map((background, index: number) => (
              <TouchableOpacity key={index} onPress={() => handleBackgroundSelect(background)}>
                <Image source={background} style={styles.background}/>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
}

export default BackgroundMenu;

const styles = StyleSheet.create({
  backgroundTool: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    width: screenWidth,
    height: screenHeight - canvasHeight - headerImageHeight + 95, // THIS HARDCODED VALUE NEEDS FIXED
    top: '-50%',
    gap: 30,
    zIndex: 99999,
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: '#fffaf8'
  },
  menuLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 100,
    height: '100%',
    width: '100%',
    padding: 5
  },
  backgrounds: { // this already fits within bounds of bottomTooblar styles
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    rowGap: 15,
    width: '100%',
    height: '100%',
  },
  close: {
    position: 'absolute',
    right: '-1%',
    top: '-1%',
    zIndex: 99999
  },
  background: {
    height: 50,
    width: 50
  }
})