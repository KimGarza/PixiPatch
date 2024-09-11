import { View, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import { useDrawCtx } from './DrawCtx';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider, Panel3, Panel5, Panel4, HueCircular, BrightnessSlider, SaturationSlider, HSLSaturationSlider, LuminanceCircular, RedSlider, GreenSlider, BlueSlider } from 'reanimated-color-picker';
import { useState } from 'react';
import { Button } from 'react-native';
import { Modal } from 'react-native';

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();

const DrawMenu = () => {

  const { setActiveSize, setActiveColor } = useDrawCtx();
  const [showModal, setShowModal] = useState(false);

  const onSelectColor = ({ hex }: { hex: string }) => {
    // do something with the selected color.
    console.log(hex);
    setActiveColor(hex);
  };
  
  return (
    <View style={styles.menuLayout}>

      <View style={styles.sizeDots}>

          {[25, 20, 14, 7, 4, 2].map((size, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveSize(size)}
            style={styles.sizeDotContainer}
          >
            <View style={[styles.splotch, { backgroundColor: 'black', height: size, width: size }]} />
          </TouchableOpacity>
        ))}

      </View>

      <View style={styles.colorLayout}>

          <ColorPicker style={styles.colorPickers} value='red' onComplete={onSelectColor} >
            <HueSlider />
            <BrightnessSlider />
            <SaturationSlider />
          </ColorPicker>

          <ColorPicker style={styles.opacityPicker} value='red' onComplete={onSelectColor} >
            <OpacitySlider/>
          </ColorPicker>

      </View>
      
    </View>
  );
}

export default DrawMenu;

const styles = StyleSheet.create({
  menuLayout: {
    flexShrink: 1, // <3
    // borderWidth: 2, borderColor: 'blue', borderRadius: 8,

    // display: 'flex',
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    // position: 'relative',
    // width: width,
    // height: '100%',
    // zIndex: 99999,
    // borderWidth: .5,
    // borderRadius: 15,
    // borderColor: 'black',
    // backgroundColor: '#fffaf8'
  },
  sizeDots: { // this already fits within bounds of bottomTooblar styles
    display: 'flex', flexWrap: 'wrap', flexDirection: 'row',
    // borderWidth: 2, borderColor: 'blue', borderRadius: 8,
    gap: 15,
    width: '100%',
    zIndex: 9999,
    padding: 15,
    top: '5%',
  },
  sizeDotContainer: {
    borderWidth: .8, borderColor: 'black', borderRadius: 8,
    padding: 2,
    height: 40, width: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  splotch: {
    height: 30, width: 30, 
    borderRadius: 100,
  },
  colorLayout: {
    display: 'flex',
    // borderWidth: 2, borderColor: 'blue', borderRadius: 8,
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    flexShrink: 1, // <3
    padding: 30,
    zIndex: 9999,
  },
  colorPickers: {
    width: '80%', height: '100%',
    padding: 5,
    justifyContent: 'center',
    gap: 30,
    zIndex: 9999,
  },
  opacityPicker: {
    position: 'absolute',
    width: '70%', height: '100%',
    padding: 5,
    transform: [{ rotate: '90deg' }],
    right: 0,
    top: '5%'
  },
  close: {
    position: 'absolute',
    right: '-1%',
    top: '-1%',
    zIndex: 99999 
  },
  done: {
    position: 'absolute',
    flexDirection: 'row',
    right: 20,
    top: -50,
    alignItems: 'center',
    gap: 1
  },
  sticker: {
    height: 50,
    width: 50
  }
})