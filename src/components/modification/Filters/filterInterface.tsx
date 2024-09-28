// import React from 'react';
// import { useState } from 'react';
// import { StyleSheet, View, TouchableOpacity } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import ContrastSettings from './contrastSettings';
// import GlobalDimensions from '@/components/dimensions/globalDimensions';

// const {width} = GlobalDimensions();

// const FilterInterface = () => {

//     const [activeFilter, setActiveFilter] = useState<string>('');

//     const handlePress = (filterName: string) => {
//         setActiveFilter(filterName);
//     }

//     return (
//         <View style={styles.container}>

//             <View style={styles.settings}>
//                 { activeFilter == 'contrast' ? 
//                 <ContrastSettings/>
//                 : activeFilter == 'brightness' ?
//                 <ContrastSettings/>
//                 : activeFilter == 'saturation' ?
//                 <ContrastSettings/>
//                 : activeFilter == 'hue' ?
//                 <ContrastSettings/>
//                 : <ContrastSettings/> }
//             </View>
            
//             <View style={styles.filterItems}>
//                 <View style={styles.filterItem}>
//                     <TouchableOpacity onPress={() => handlePress('contrast')}>
//                         <Ionicons name='contrast' size={30}/>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.filterItem}>
//                     <TouchableOpacity onPress={() => handlePress('brightness')}>
//                         <Ionicons name='sunny' size={30}/>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.filterItem}>
//                     <TouchableOpacity onPress={() => handlePress('saturation')}>
//                         <MaterialIcons name='invert-colors-on' size={30}/>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.filterItem}>
//                     <TouchableOpacity onPress={() => handlePress('hue')}>
//                         <Ionicons name='color-fill-outline' size={30}/>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.filterItem}>
//                     <TouchableOpacity onPress={() => handlePress('sharpness')}>
//                         <MaterialCommunityIcons name='diamond' size={30}/>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//         </View>
//     );
// };

// export default FilterInterface;

// const styles = StyleSheet.create({
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         alignContent: 'space-around',
//         gap: 20,
//         padding: 5,
//         height: '100%',
//         width: '100%',
//         borderWidth: 2, borderColor: 'red',
//       },
//       settings: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignContent: 'center',
//         width: '100%',
//         borderWidth: 1, borderColor: 'blue',
//       },
//       filterItems: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//       },
//       filterItem: {
//         display: 'flex',
//         flexDirection: 'column',
//       },
// });
