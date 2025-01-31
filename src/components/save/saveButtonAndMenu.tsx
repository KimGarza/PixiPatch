import { StyleSheet, TouchableOpacity, Animated, Text, View, Alert } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useState, useRef, RefObject } from "react";
import CaptureAndSave from "./captureAndSave";
import { useItemCtx } from "@/src/hooks/contexts/useItemCtx";
import GlobalTheme from "@/src/components/global/GlobalTheme";
import Ionicons from '@expo/vector-icons/Ionicons';

const { colors } = GlobalTheme();
interface SaveWorkButtonProps {
  viewRef: RefObject<View> | null, // ref attached to the View element canvasContainer in EditorContent (has user's work)
}
interface saveType {
  type: 'standard' | 'hd' | 'draft';
}

const SaveButtonAndMenu: React.FC<SaveWorkButtonProps> = ({ viewRef }) => {

  const { setActiveItemCtx } = useItemCtx();
  const [menuVisible, setMenuVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current; // ??

  const menuToggle = () => {
    setMenuVisible(prevState => !prevState);
    Animated.timing(animationValue, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // captures view element (user's work within canvas) as an image using react-native-view-shot and using expo media library to save
  const save = async (saveType: saveType) => {
    // standard
    let width = 980; // technical conversion is 978.75
    let height = 1740;

    if (saveType.type == 'hd') {
      width = 1307;
      height = 2320;
    }

    try {
      // sending in the viewRef (captured view element by useRef sent from elemental editor of the canvas) sending to a comp that uses it to capture, and save it
      if (viewRef != undefined && viewRef && viewRef != null) {
        setActiveItemCtx(undefined); // disables the active image outline when the canvas is captured
        await CaptureAndSave(viewRef, width, height, false);
        menuToggle();
      }
    } catch (error) {
      console.log("Error within trying to activate CaptureAndSave in saveWorkButton.tsx: ", error);
    }
  }

  const menuHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100] // Adjust the height as needed
  });

  const iconSize = menuVisible ? 40 : 30; // dynamic sizing of save icon

  return(
    <View style={[styles.container, menuVisible && styles.menuContainer]}>
        <TouchableOpacity onPress={menuToggle} style={styles.menuHeader}>
        {menuVisible && <Ionicons style={styles.close} name={'arrow-back-outline'} size={25} />}
        <Entypo name={'save'} size={iconSize} color={colors.Rust}/>
         
       </TouchableOpacity>
       {menuVisible && <Animated.View style={[styles.menu, { height: menuHeight }]}>

        <TouchableOpacity onPress={() => {save({type: 'standard'})}}>
            <Text style={styles.saveOption}>Save Standard</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {save({type: 'hd'})}}>
            <Text style={styles.saveOption}>Save HD</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {save({type: 'standard'})}}>
            <Text style={styles.saveOption}>Save Draft</Text>
        </TouchableOpacity>

       </Animated.View>}
    </View>
    
  );
}

export default SaveButtonAndMenu;

// // issues figuring out how to get to be 100% height of the header image, may not currently be dynamic enough
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, right: 0,
    margin: 5,
    zIndex: 9999
  },
  menuContainer: {
    height: 270,
    borderWidth: 1, borderColor: colors.DarkRust, borderRadius: 10,
    borderBottomWidth: 2,
    padding: 8,
    backgroundColor: colors.LightPeach
  },
  menu: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center',
    top: 10,
    gap: 25,
    padding: 5,
  },
  saveOption: {
    textAlign: 'center', fontSize: 16,
    borderWidth: .5, borderColor: colors.DirtyPeach, borderRadius: 10,
    paddingVertical: 8, paddingHorizontal: 3,
    backgroundColor: colors.Peach
  },
  menuHeader: {
    display: 'flex', flexWrap: 'wrap', flexDirection: 'row',
    justifyContent: 'space-around', alignItems: 'center',
    borderWidth: 0, borderColor: colors.DarkClay, borderRadius: 10,
    backgroundColor: colors.Peach,
    padding: 8
  },
  close: {
    display: 'flex',
    alignItems: 'center', justifyContent: 'flex-end',
    fontSize: 24, color: colors.DarkClay,
  },
})