import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BackgroundCtx } from './BackgroundCtx';
import { useContext } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

interface BackgroundMenuProps {
  menuToggle: () => void;
}

const BackgroundMenu: React.FC<BackgroundMenuProps> = ({ menuToggle }) => {

  // background directory
  const backgroundDir: ImageSourcePropType[] = [
    require('../../assets/images/backgrounds/background1.png'),
    require('../../assets/images/backgrounds/background2.png'),
    require('../../assets/images/backgrounds/background3.png'),
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
    );
}

export default BackgroundMenu;

const styles = StyleSheet.create({
  backgrounds: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    rowGap: 15,
    padding: 13,
    borderWidth: 1,
    borderColor: 'red'
  },
  menuLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 100,
  },
  close: {
    position: 'absolute',
    right: '-1%',
    top: '-1%',
    zIndex: 9999 
  },
  background: {
    height: 50,
    width: 50
  }
})