import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StickerCtx } from './StickersCtx';
import { useContext } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

interface Sticker {
  uri: string;
  width: number;
  height: number;
  type: string | undefined;
}

interface StickerData {
  sticker: ImageSourcePropType;
  top: number;
  left: number;
}

interface StickerMenuProps {
  menuToggle: () => void;
}

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
    console.log("stickerData", stickerData);

    setStickers(prevStickers => [...prevStickers, stickerData]);
  }

  const convertToStickerData = (sticker: ImageSourcePropType) => {

    const converted: StickerData = { // this is not making a new random vaues each time :(
      sticker: sticker,
      top: Math.floor(Math.random() * (51 - 10)) + 10,
      left: Math.floor(Math.random() * (61 - 20)) + 20
    }

    return converted;
  }

  const handleCloseMenu = () => {
    console.log("handleCloseMenu")
    menuToggle();
  }

    return (
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
    );
}

export default StickerMenu;

const styles = StyleSheet.create({
  stickers: {
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
  sticker: {
    height: 50,
    width: 50
  }
})