// import { StyleSheet, View } from "react-native";
// import React from 'react';
// import Slider from "@react-native-community/slider";
// import { useImageCxt } from "@/hooks/contexts/useImageCtx";
// import { useEffect, useState } from "react";
// import * as ImageManipulator from 'expo-image-manipulator';

// // slider and actual 
// const ContrastSettings = () => {

//     const { updateImageInfo, activeImageCtx } = useImageCxt(); // msut remove filterable image from view
//     const [ contrast, setContrast ] = useState<number>();
//     // state = {
//     //     ...settings,
//     //     hue: 0.0,
//     //     blur: 0.0,
//     //     sepia: 0,
//     //     sharpen: 0.0,
//     //     negative: 0,
//     //     contrast: 1,
//     //     saturation: 1,
//     //     brightness: 0.5,
//     //     temperature: 400,

//     useEffect(() => {
//     }, [contrast])

   
//     const handleAdjustContrast = async () => {
//         if (activeImageCtx) {
//             try {
//                 const manipulatedImage = await ImageManipulator.manipulateAsync(
//                     activeImageCtx?.imageInfo.uri,
//                     [
//                         {
//                             ad: 'adjust',
//                             contrast: 1.5, // Adjust contrast (value between -1 and 1)
//                             saturation: 0.5, // Adjust saturation (value between -1 and 1)
//                             brightness: 0.2, // Adjust brightness (value between -1 and 1)
//                           },
//                           {
//                             type: 'adjust',
//                             temperature: 5000, // Adjust white balance temperature (kelvin)
//                             tint: -100, // Adjust white balance tint (value between -100 and 100)
//                           },
//                     ], // Adjust the contrast value as needed (1.0 = normal, <1.0 = less contrast, >1.0 = more contrast)
//                     { compress: 1, format: ImageManipulator.SaveFormat.PNG }
//                 );
//                 return result.uri;
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Slider 
//                 style={styles.slider}
//                 minimumValue={0}
//                 maximumValue={20}
//                 minimumTrackTintColor="#0000FF"
//                 maximumTrackTintColor="#000000"
//                 thumbTintColor="#0000FF"
//                 value={contrast}
//                 onValueChange={(sliderValue) => setContrast(sliderValue)}
//             />
//         </View>
//     );
// }

// export default ContrastSettings;

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         width: '100%', height: 40, // wnat to make hiehgt grow dynamically with the space
//         borderWidth: 1, borderColor: 'green',
//         justifyContent: 'center',
//         alignContent: 'center'
//     },
//     slider: {
//         width: '90%',
//         height: 40,
//     }
// });