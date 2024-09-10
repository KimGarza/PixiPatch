import { StyleSheet, View, Image, TouchableOpacity, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import DrawUtil from '@/tools/drawing/DrawUtil';
import DrawMenu from '@/tools/drawing/drawMenu';
import HomeButton from '@/components/utils/homeButton';
import GlobalDimensions from '@/components/dimensions/globalDimensions';

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();

const SketchBookScreen = () => { 

  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
  }, [isDone])

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
    <View style={styles.canvasContainer} collapsable={false} >

      <View style={styles.canvas} >
          <DrawUtil isDone={isDone}/>
      </View>

      <TouchableOpacity onPress={() => {setIsDone(!isDone)}} style={styles.done}>
        <Text style={{width: 70, height: 35, borderWidth: .8, borderRadius: 14, textAlign: 'center', textAlignVertical: 'center', fontSize: 20}}>Done</Text>
        {/* <SimpleLineIcons name='pencil' size={40} style={{top: -5}}/> */}
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
    height: canvasHeight * .7,
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
    height: height - (canvasHeight * .79) , //eww
    zIndex: 9999999,
    borderTopWidth: .6, borderColor: 'black',
  },
  done: {
    position: 'absolute',
    bottom: 0, right: 0,
    margin: 10,
    zIndex: 9999999, // exactly this many 9s lel
    justifyContent: 'flex-start',
  }
});