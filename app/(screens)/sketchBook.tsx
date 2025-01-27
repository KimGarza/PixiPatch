import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import DrawUtil from '@/src/components/features/drawing/DrawUtil';
import DrawMenu from '@/src/components/features/drawing/drawMenu';
import HomeButton from '@/src/components/utils/homeButton';
import { useDrawCtx } from '@/src/components/features/drawing/DrawCtx';
import GlobalDimensions from '@/src/components/global/globalDimensions';

const { dimensions } = GlobalDimensions();

const SketchBookScreen = () => { 

  const [isDone, setIsDone] = useState<boolean>(false);
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(false);
  const { clearCanvas, drawingPaths } = useDrawCtx();

  const clearCanv = () => {
    clearCanvas();
  }

  useEffect(() => {
  }, [isDone, clear, drawingPaths ])

return (
  <View style={styles.screenContainer}>

    {/* header */}
    <View style={styles.headerNav}>
      <Image
        style={styles.headerImg}
        source={require('../../src/assets/images/ElementalEditorBanner.png')}
      />
      <HomeButton/>
    </View>

    {/* main canvas */}
    <View style={styles.canvasContainer} collapsable={false} >

      <View style={styles.canvas} >
          <DrawUtil isDone={isDone} isCleared={isCleared}/>
      </View>

      <TouchableOpacity onPress={() => {setIsDone(!isDone)}} style={styles.done}>
        <Text style={{width: 70, height: 35, borderWidth: .8, borderRadius: 14, textAlign: 'center', textAlignVertical: 'center', fontSize: 20}}>Done</Text>
        {/* <SimpleLineIcons name='pencil' size={40} style={{top: -5}}/> */}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {setIsCleared(!isCleared)}} style={styles.clear}>
        <Text style={{width: 70, height: 35, borderWidth: .8, borderRadius: 14, textAlign: 'center', textAlignVertical: 'center', fontSize: 20}}>Clear</Text>
      </TouchableOpacity>

    </View>

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
    width: dimensions.width,
  },
  headerNav: {
    zIndex: 9999999,
    height: dimensions.headerHeight
  },
  headerImg: {
    width: '100%',
  },  
  canvasContainer: {
    height: dimensions.width,
    width: dimensions.width,
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
    height: dimensions.height - (dimensions.canvasHeight * .79) , //eww
    zIndex: 9999999,
    borderTopWidth: .6, borderColor: 'black',
  },
  done: {
    position: 'absolute',
    bottom: 0, right: 0,
    margin: 10,
    zIndex: 9999999, // exactly this many 9s lel
    justifyContent: 'flex-start',
  },
  clear: {
    position: 'absolute',
    bottom: 0, left: 0,
    margin: 10,
    zIndex: 9999999, // exactly this many 9s lel
    justifyContent: 'flex-start',
  }
});