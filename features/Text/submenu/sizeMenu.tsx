// import {
//     View,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//   } from 'react-native';
//   import { useTextCtx } from '../useTextCtx';
//   import AntDesign from '@expo/vector-icons/AntDesign';
//   import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
//   import { Picker } from '@react-native-picker/picker';
//   import { useState } from 'react';
  
//   const SizeMenu = () => {
//     const [selectedNumber, setSelectedNumber] = useState(1);

//     const sizes = Array.from({ length: n }, (_, i) => 6 * (i + 1));

//     return (
//       <View style={styles.colorLayout}>
//           <View style={styles.swatches}>

//             <View style={styles.colorSwatch}>
//               <MaterialCommunityIcons name="format-font-size-decrease" size={40} color={'#b4a8a5'}/>
//                 <TouchableOpacity >
//                   <AntDesign name="up" size={40} color={'#988d8b'} />
//                 </TouchableOpacity>
//             </View>

//               <View style={styles.colorSwatch}>
//                 <TouchableOpacity >
//                   <AntDesign name="down" size={40} color={'#988d8b'} />
//                 </TouchableOpacity>
//                 <MaterialCommunityIcons name="format-font-size-increase" size={40} color={'#b4a8a5'}/>
//               </View>

//               <Picker
//         selectedValue={selectedNumber}
//         onValueChange={(itemValue) => setSelectedNumber(itemValue)}
//         style={styles.picker}
//       >
//         {[...Array(10).keys()].map((num) => (
//           <Picker.Item label={String(num + 1)} value={num + 1} key={num} />
//         ))}
//       </Picker>

//           </View>
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     colorLayout: {
//       width: '100%',
//       height: '100%',
//       justifyContent: 'center',
//       zIndex: 9999,
//     },
//     swatches: {
//       flexDirection: 'row',
//       gap: 20,
//       zIndex: 9999,
//     },
//     colorSwatch: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignContent: 'center',
//       alignItems: 'center',
//       height: 45, width: 100,
//       borderRadius: 15, borderWidth: 2, borderColor: '#d5c3bf',
//       textAlign: 'center',
//       textAlignVertical: 'center'
//     },
//     picker: {
//     height: 50,
//     width: 150,
//   },
//   });
  
//   export default SizeMenu;
  