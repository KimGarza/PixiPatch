import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDrawCtx } from './DrawCtx';
import ColorPicker, { OpacitySlider, HueSlider, BrightnessSlider, SaturationSlider } from 'reanimated-color-picker';

const DrawMenu = () => {

  const { setActiveSize, setActiveColor } = useDrawCtx();

  const onSelectColor = ({ hex }: { hex: string }) => {
    // do something with the selected color.
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
  },
  sizeDots: { // this already fits within bounds of bottomTooblar styles
    display: 'flex', flexWrap: 'wrap', flexDirection: 'row',
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
})