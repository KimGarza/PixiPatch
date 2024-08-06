// import { StyleSheet, TouchableOpacity, Animated, Text, View } from "react-native";
// import Entypo from '@expo/vector-icons/Entypo';
// import { useState, useRef } from "react";

// const SaveWorkButton = () => {
//   const [saveMenuVisible, setSaveMenuVisible] = useState(false);
//   const animationValue = useRef(new Animated.Value(0)).current; // ??

//   const menuToggle = () => {
//     setSaveMenuVisible(prevState => !prevState);
//     Animated.timing(animationValue, {
//       toValue: saveMenuVisible ? 0 : 1,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   const menuHeight = animationValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 100] // Adjust the height as needed
//   });

//   return(
//     <View style={styles.container}>
//       <TouchableOpacity onPress={menuToggle} style={styles.saveIcon}>
//           <Entypo name={'save'} size={20}/>
//       </TouchableOpacity>
//       <Animated.View style={[styles.menu, { height: menuHeight }]}>
//         <Text style={styles.menuText}>Option 1</Text>
//         <Text style={styles.menuText}>Option 2</Text>
//         <Text style={styles.menuText}>Option 3</Text>
//       </Animated.View>
//     </View>
      
//   );
// }

// export default SaveWorkButton;

// // issues figuring out how to get to be 100% height of the header image, may not currently be dynamic enough
// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     alignItems: 'center',
//     height: 55,
//     right: 1,
//     top: 0,
//   },
//   saveIcon: {
//     position: 'absolute',
//     justifyContent: 'center', // ?
//     alignContent: 'center', // ?
//     height: '100%', // like why isn't 100% tall enough for the header image to be covered, confused
//     right: 1,
//     top: 0,
//     color: 'black',
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: 'black',
//     padding: 8,
//     backgroundColor: '#ffcab0',
//     zIndex: 99999
//     },
//     menu: {
//       marginTop: 10,
//       backgroundColor: '#f9f9f9',
//       borderWidth: 1,
//       borderRadius: 5,
//       overflow: 'hidden',
//     },
//     menuText: {
//       padding: 10,
//       borderBottomWidth: 1,
//       borderBottomColor: '#ddd',
//     },
// })