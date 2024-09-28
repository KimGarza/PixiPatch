// import React, { useState } from 'react';
// import { View, Image, Button, StyleSheet } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';

// react-native-image-crop-picker is only usable with native build not expo env. Incorperated config plugin still didn't work

// const CropImage = () => {
//   const [image, setImage] = useState('@/src/assets/images/ElementalEditorBanner.png');

//   const handleCropImage = () => {
//     ImagePicker.openCropper({
//       mediaType: 'photo',
//       path: image,
//       width: 300,
//       height: 400,
//     }).then(croppedImage => {
//       setImage(croppedImage.path); // Updating the image state to display the cropped image
//     }).catch(e => {
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: image }} style={styles.image} />
//       <Button title="Crop Image" onPress={handleCropImage} />
//     </View>
//   );
  
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   image: {
//     width: 300,
//     height: 400,
//     marginBottom: 20,
//   },
// });

// export default CropImage;
