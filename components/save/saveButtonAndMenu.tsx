import { StyleSheet, TouchableOpacity, Animated, Text, View, Alert } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useState, useRef, RefObject } from "react";
import { Fontisto } from '@expo/vector-icons';
import CaptureAndSave from "./captureAndSave";
import { useItemCtx } from "@/hooks/contexts/useItemCtx";

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

  const iconSize = menuVisible ? 40 : 20; // dynamic sizing of save icon

  return(
    <View style={[styles.container, menuVisible && styles.menuContainer]}>
        <TouchableOpacity onPress={menuToggle} style={styles.menuHeader}>
        <Entypo name={'save'} size={iconSize} style={styles.saveIcon}/>
          {menuVisible && <Fontisto style={styles.close} name={'close'} size={25}/>}
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
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    position: 'absolute',
    right: 1,
    top: 0,
    height: 55,
    borderWidth: 1, borderColor: 'black', borderRadius: 10,
    padding: 8,
    backgroundColor: "#ffcab0",
  },
  saveIcon: {
      display: 'flex',
      top: 0,
  },
  menuContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    position: 'absolute',
    right: 1,
    top: 0,
    height: 270,
    borderWidth: 1, borderColor: '#b46141', borderRadius: 10,
    borderBottomWidth: 2,
    padding: 8,
    backgroundColor: "#ffc9b5"
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    padding: 5,
    top: 30
  },
  saveOption: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 16,
    borderWidth: .5, borderColor: '#803c22', borderRadius: 10,
    padding: 2,
    backgroundColor: '#ffb79c'
  },
  close: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    borderWidth: .5, borderColor: '#803c22', borderRadius: 30,
    padding: 1, paddingTop: 5, paddingBottom: 5,
    backgroundColor: '#ffb79c'
  },
  menuHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#eea98f',
    borderWidth: 0, borderColor: '#803c22', borderRadius: 10,
    paddingBottom: 5, paddingTop: 5, 
    padding: 5
  }
})