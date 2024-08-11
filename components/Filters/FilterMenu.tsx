// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Feather from '@expo/vector-icons/Feather';
// import StyledIconContainer from '../utils/styledIconContainer';
// import { Fontisto } from '@expo/vector-icons';
// import { ImageFilter } from 'react-native-image-filter-kit';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import { useState } from 'react';
// interface ImageInfo {
//   uri: string;
//   width: number;
//   height: number;
//   type: string | undefined;
// }
// interface ImageData {
//   imageInfo: ImageInfo;
//   // String for %age of each for positioning
//   top: number;
//   left: number;
// }
// interface FilterMenuProps {
//   menuToggle: () => void,
//   activeImage: ImageData
// }


// const FilterMenu: React.FC<FilterMenuProps> = ({menuToggle}) => {

//   const [toggleFilter1, setToggleFilter1] = useState<boolean>(false);
  
//   const [brightness, setBrightness] = useState(1);

//   const handleCloseMenu = () => {
//     menuToggle();
//   }
  
//   const handleToggleFilter1 = () => {
//     setToggleFilter1(!toggleFilter1);
//   }
//   const localImage = require('../../assets/images/welcome.png');

//   return (
//     <View style={styles.menuLayout}>
    
//       <View style={styles.close}>

//           <TouchableOpacity onPress={() => handleCloseMenu()}>
//             <Fontisto name={'close'} size={25}/>
//           </TouchableOpacity>

//       </View>

//       <View style={styles.bottomToolbar}>

//         <StyledIconContainer dimensions={40}>

//         <TouchableOpacity onPress={() => handleToggleFilter1()}>
//           <Feather name={'sunrise'} size={15}/>
//         </TouchableOpacity>

        
          
//           <FontAwesome5 name={'eraser'} size={15}/>
//           <FontAwesome5 name={'eraser'} size={15}/>
//           <FontAwesome5 name={'eraser'} size={15}/>
//           <FontAwesome5 name={'eraser'} size={15}/>
//           <FontAwesome5 name={'eraser'} size={15}/>
//           <FontAwesome5 name={'eraser'} size={15}/>

//           {/* <ImageFilter config={{name: 'Brightness', amount: 1, image: <Image source={require('../../assets/images/welcome.png')}/>}}/> */}

//         </StyledIconContainer>

//       </View>
//     </View>
//   );
// }

// export default FilterMenu;

// const styles = StyleSheet.create({
//   image: {
//     display: 'flex'
//   },
//   bottomToolbar: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 40,
//     rowGap: 30,
//     padding: 30,
//     borderWidth: 1,
//     borderColor: 'pink',
//     borderRadius: 30
//   },
//   menuLayout: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     flexDirection: 'column',
//   },
//   close: {
//     position: 'absolute',
//     right: '-1%',
//     top: '8%',
//     zIndex: 9999 
//   },
// })