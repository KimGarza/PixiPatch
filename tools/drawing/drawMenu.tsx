import { View, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import { useDrawCtx } from './DrawCtx';

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();

const DrawMenu = () => {

  const { setActiveSize, setActiveColor } = useDrawCtx();
  
  return (
    <View style={styles.container}>

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

      <View style={styles.colorSplotches}>
        {['#f21616', '#f95900', 'yellow', '#189b4e', '#549eff', '#6f24ff', '#ffa7c3'].map((color, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveColor(color)}
          >
            <View style={[styles.splotch, { backgroundColor: color }]} />
          </TouchableOpacity>
        ))}
      </View>
      </View>
    </View>
  );
}

export default DrawMenu;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    position: 'relative',
    width: width,
    height: height - canvasHeight - headerHeight,
    zIndex: 99999,
    padding: 10,
    gap: 10,
    borderWidth: .5,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: '#fffaf8'
  },
  colorSplotches: { // this already fits within bounds of bottomTooblar styles
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10, paddingTop: 20, 
    gap: 20,
    rowGap: 15,
    width: '100%', height: '100%',
    zIndex: 9999,
  },
  sizeDotContainer: {
    borderWidth: .8, borderColor: 'black', borderRadius: 8,
    padding: 2,
    height: 40, width: 40,
    justifyContent: 'center', alignItems: 'center'
  },
  sizeDots: { // this already fits within bounds of bottomTooblar styles
    display: 'flex', flexWrap: 'wrap', flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    rowGap: 15,
    width: '100%', height: '100%',
    zIndex: 9999,
  },
  splotch: {
    height: 30, width: 30, 
    borderRadius: 100,
  },
  colorPicker: {
    width: 300,
    height: 300,
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