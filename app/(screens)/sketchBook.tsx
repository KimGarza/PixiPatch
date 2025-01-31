import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from 'react';
import DrawUtil from '@/src/components/features/drawing/DrawUtil';
import DrawMenu from '@/src/components/features/drawing/drawMenu';
import BackToEditorButton from '@/src/components/utils/backToEditorButton';
import { useDrawCtx } from '@/src/hooks/contexts/useDrawCtx';
import GlobalDimensions from '@/src/components/global/globalDimensions';
import GlobalTheme from '@/src/components/global/GlobalTheme';

const { dimensions } = GlobalDimensions();
const { colors } = GlobalTheme();

const SketchBookScreen = () => { 

  const [isDone, setIsDone] = useState<boolean>(false);
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const { drawingPaths } = useDrawCtx();

  useEffect(() => {
  }, [isDone, drawingPaths ])

return (
  <View style={styles.pageContent}>

    <BackToEditorButton/>

    {/* main canvas */}
    <View style={styles.drawCanvas}> {/* if using a ref remember to add collapsable={false} */}

      <DrawUtil isDone={isDone} isCleared={isCleared}/>

      <TouchableOpacity onPress={() => {setIsDone(!isDone)}} style={[styles.textButtons, {right: 0}]}>
        <Text style={styles.text}>Done</Text>
        {/* <SimpleLineIcons name='pencil' size={40} style={{top: -5}}/> */}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {setIsCleared(!isCleared)}} style={[styles.textButtons, {left: 0}]}>
        <Text style={styles.text}>Clear</Text>
      </TouchableOpacity>

    </View>

    {/* Bottom Toolbar - alternates between primary editing tools and menus for active in-use tool */}
    <View style={styles.drawMenu}>
      <DrawMenu/>
    </View>

    </View>
  );
}

export default SketchBookScreen;

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
  },
  drawCanvas: {
    flex: 1,
    height: dimensions.width, width: dimensions.width, // square canvas for even sides when rendering sticker
    borderWidth: 2, borderColor: colors.Rust,
  },
  drawMenu: {
    flexDirection: 'row', flex: 1, // remaining space is after height == width
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: colors.WhitePeach,
    zIndex: 9999999,
  },
  textButtons: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    zIndex: 9999999, // exactly this many 9s lel
    justifyContent: 'flex-start',
  },
  text: {
    width: 70, height: 35,
    color: colors.Rust,
    borderWidth: .2, borderColor: colors.Rust, borderRadius: 14,
    backgroundColor: colors.Peach, 
    textAlign: 'center', textAlignVertical: 'center', fontSize: 20
  }
});