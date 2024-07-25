import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StickerCtx } from './StickersCtx';
import { useContext } from 'react';


interface Sticker {
  uri: string;
  width: number;
  height: number;
  type: string | undefined;
}

interface StickerData {
  sticker: Sticker;
  top: number;
  left: number;
}

const StickerMenu = () => {

  // sticker directory
  const stickerDir: Sticker[] = [
    require('../../asets/stickers/sticker1.png'),
    require('../../asets/stickers/sticker2.png'),
  ];


  // sticker context
  const { setStickers } = useContext(StickerCtx);

  // on select/press sticker in sticker dir menu, convert it to have a position (stickerData) and add it to the stickers state in stickerContext
  const handleStickerSelect = (sticker: Sticker) => {
    const stickerData = convertToStickerData(sticker);
    setStickers(prevStickers => [...prevStickers, stickerData]);
  }

  const convertToStickerData = (sticker: Sticker) => {

    const converted: StickerData = {
      sticker: sticker,
      top: Math.floor(Math.random() * (51 - 10)) + 10,
      left: Math.floor(Math.random() * (61 - 20)) + 20
    }
    return converted;
  }
  //   setStickers(prevStickers => [...prevStickers, sticker]);

    return (
      <View style={styles.stickers}>
        {stickerDir.map((sticker: Sticker, index: number) => (
          <TouchableOpacity key={index} onPress={() => handleStickerSelect(sticker)}>
            <Image source={sticker} style={styles.sticker}/>
          </TouchableOpacity>
        ))}
      </View>
    );
}

export default StickerMenu;

const styles = StyleSheet.create({
  stickers: {
  },
  sticker: {
    height: 50,
    width: 50
  }
})