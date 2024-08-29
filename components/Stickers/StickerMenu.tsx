import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StickerCtx } from './StickersCtx';
import { useContext } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
interface StickerData {
  sticker: ImageSourcePropType;
  top: number;
  left: number;
}

interface StickerMenuProps {
  menuToggle: () => void;
}

const screenWidth = Dimensions.get('screen').width; // or 'window'
  const screenHeight = Dimensions.get('screen').height; // or 'window' // for some reason this is 22 larger with get window and 50 too large with screen! And using useDimensions from react same result. Using 100% in styling as opposed to this works not sure why
  const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
  const canvasHeight = screenWidth / aspectRatio;
  var headerImageHeight = 0;
  var toolbarHeight = 0;
  if (headerImageHeight) { toolbarHeight = screenHeight - canvasHeight - headerImageHeight;}

const StickerMenu: React.FC<StickerMenuProps> = ({ menuToggle }) => {

  // sticker directory
  const stickerDir: ImageSourcePropType[] = [
    require('../../assets/images/stickers/sticker1.png'),
    require('../../assets/images/stickers/sticker2.png'),
    require('../../assets/images/stickers/sticker3.png'),
    require('../../assets/images/stickers/sticker4.png'),
    require('../../assets/images/stickers/sticker5.png'),
    require('../../assets/images/stickers/sticker6.png'),
    require('../../assets/images/stickers/sticker7.png'),
    require('../../assets/images/stickers/sticker8.png'),
    require('../../assets/images/stickers/sticker9.png'),
    require('../../assets/images/stickers/sticker10.png'),
    require('../../assets/images/stickers/sticker11.png'),
    require('../../assets/images/stickers/sticker12.png'),
    require('../../assets/images/stickers/sticker13.png'),
    require('../../assets/images/stickers/sticker14.png'),
    require('../../assets/images/stickers/sticker15.png'),
    require('../../assets/images/stickers/sticker16.png'),
  ];


  // sticker context for adding stickers based on user selection
  const { setStickers } = useContext(StickerCtx);

  // on select/press sticker, convert sticker to have a position (stickerData) and add it to the stickers state array in StickerCtx 
  const handleStickerSelect = (sticker: ImageSourcePropType) => {
    
    const stickerData = convertToStickerData(sticker);

    setStickers(prevStickers => [...prevStickers, stickerData]);
  }

  const convertToStickerData = (sticker: ImageSourcePropType) => {

    const converted: StickerData = { // this is not making a new random vaues each time :(
      sticker: sticker,
      top: Math.floor(Math.random() * (300 - 50)) + 50,
      left: Math.floor(Math.random() * (300 - 30)) + 30,
    }

    return converted;
  }

  const handleCloseMenu = () => {
    menuToggle();
  }

    return (
      <View style={styles.stickerTools}>

        <View style={styles.menuLayout}>

          <View style={styles.close}>
            <TouchableOpacity onPress={() => handleCloseMenu()}>
            <Fontisto name={'close'} size={25}/>
            </TouchableOpacity>
          </View>

          <View style={styles.stickers}>
              {stickerDir.map((sticker, index: number) => (
              <TouchableOpacity key={index} onPress={() => handleStickerSelect(sticker)}>
                <Image source={sticker} style={styles.sticker}/>
              </TouchableOpacity>
            ))}
          </View>
          
        </View>
      </View>
    );
}

export default StickerMenu;

const styles = StyleSheet.create({
  stickerTools: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    width: screenWidth,
    height: screenHeight - canvasHeight - headerImageHeight + 95, // THIS HARDCODED VALUE NEEDS FIXED
    top: '-48%',
    zIndex: 99999,
    padding: 10,
    gap: 10,
    borderWidth: .5,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: '#fffaf8'
  },
  stickers: { // this already fits within bounds of bottomTooblar styles
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 35,
    rowGap: 15,
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  menuLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 15,
  },
  close: {
    position: 'absolute',
    right: '-1%',
    top: '-1%',
    zIndex: 99999 
  },
  sticker: {
    height: 50,
    width: 50
  }
})