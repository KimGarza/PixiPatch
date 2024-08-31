import { useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import DrawUtil from '@/tools/drawing/DrawUtil';
import DrawMenu from '@/tools/drawing/drawMenu';
import HomeButton from '@/components/utils/homeButton';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import { useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();

const SketchBookScreen = () => { 
  const viewRef = useRef(null); // used to capture the canvas container View elemenet
  const router = useRouter();

  const handleDoneDrawing = () => {
    // current drawing paths, save to drawings in item ctx
    // remove all data from drawing ctx to clear
    // rout back to editor which should display all drawings from ctx at same ratio drawn but shrunk to 100x100 or something
  }

return (
  <View style={styles.screenContainer}>

    {/* header */}
    <View style={styles.headerNav}>
      <Image
        style={styles.headerImg}
        source={require('../../assets/images/ElementalEditorBanner.png')}
      />
        <HomeButton/>
    </View>

    {/* main canvas */}
    <View style={styles.canvasContainer} ref={viewRef} collapsable={false} >

        <View style={styles.canvas} >
            <DrawUtil/>
        </View>
    </View>

    <TouchableOpacity onPress={handleDoneDrawing}><View style={styles.done}>
      <Text style={{width: 70, height: 35, borderWidth: .8, borderRadius: 14, textAlign: 'center', textAlignVertical: 'center', fontSize: 20}}>Done</Text>
      {/* <SimpleLineIcons name='pencil' size={40} style={{top: -5}}/> */}
      </View>
    </TouchableOpacity>
    {/* Bottom Toolbar - alternates between primary editing tools and menus for active in-use tool */}

      <View style={styles.primaryTools}>
        <DrawMenu/>
      </View>
      
    </View>
  );
}

export default SketchBookScreen;

const styles = StyleSheet.create({
  screenContainer: {
    width: width,
  },
  headerNav: {
    zIndex: 9999999,
    height: headerHeight
  },
  headerImg: {
    width: '100%',
  },  
  canvasContainer: {
    height: canvasHeight,
    width: width,
  },
  canvas: {
    overflow: 'hidden',
    height: '100%', width: '100%',
  },
  imageBackground: {
    width: '100%', height: '100%',
    zIndex: 1,
  },
  primaryTools: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    height: height - canvasHeight - headerHeight,
    gap: 30,
    zIndex: 9999999,
    padding: 15,
    borderTopWidth: .6, borderColor: 'black',
  },
  done: {
    position: 'absolute',
    flexDirection: 'row',
    right: 20,
    top: -50,
    alignItems: 'center',
    gap: 1
  },
});