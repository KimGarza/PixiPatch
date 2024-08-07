import { StyleSheet, TouchableOpacity, Animated, Text, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useState, useRef } from "react";

const SaveWorkButton = () => {
  const [saveMenuVisible, setSaveMenuVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current; // ??

  const menuToggle = () => {
    setSaveMenuVisible(prevState => !prevState);
    Animated.timing(animationValue, {
      toValue: saveMenuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const saveStandard = () => {
    
  }

  const menuHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100] // Adjust the height as needed
  });

  const iconSize = saveMenuVisible ? 40 : 20;


  return(
    <View style={[styles.container, saveMenuVisible && styles.menuContainer]}>
        <TouchableOpacity onPress={menuToggle} style={styles.saveIcon}>
           <Entypo name={'save'} size={iconSize}/>
       </TouchableOpacity>
       {saveMenuVisible && <Animated.View style={[styles.menu, { height: menuHeight }]}>

        <TouchableOpacity onPress={saveStandard}>
            <Text style={styles.saveOption}>Save as Standard</Text>
        </TouchableOpacity>

            <Text style={styles.saveOption}>Save as HD</Text>
            <Text style={styles.saveOption}>Save as Draft</Text>
            <Text style={styles.saveOption}>close</Text>
       </Animated.View>}
    </View>
    
  );
}

export default SaveWorkButton;

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
        height: 290,
        gap: 1,
        borderWidth: .5, borderColor: '#b46141', borderRadius: 10,
        borderBottomWidth: 3,
        padding: 8,
        backgroundColor: "#ffc9b5"
    },
    menu: {
        display: 'flex',
        flexDirection: 'column',
        gap: 25,
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
    }
})