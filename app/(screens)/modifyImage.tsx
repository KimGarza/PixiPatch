
import { View, StyleSheet, Image, Text, ImageSourcePropType } from 'react-native';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import { useLocalSearchParams  } from 'expo-router';
import { useEffect, useState } from 'react';

const { width, height, canvasHeight } = GlobalDimensions();

interface ImageInfo {
    uri: string;
    width: number;
    height: number;
    type: string | undefined;
  }
  interface ImageData {
    imageInfo: ImageInfo;
    top: number;
    left: number;
    width: number;
    height: number;
  }


export default function ModifyImageScreen() {

    const { image, type } = useLocalSearchParams(); // Retrieve the image param
    const [encodedUri, setEncodedUri] = useState<ImageSourcePropType>();

    const [activeEditTool, setActiveEditTool] = useState<string | string[]>('');

    useEffect(() => {

        if (image) {
            try {

                // this is the ONLY way I can read the image, cannot use ImageInfo, ImageSourcePropType w/out encoded URI or just uri in the uri: attribute
                const parsedImg: ImageData = JSON.parse(image as string);
                const encodedUri = encodeURI(parsedImg.imageInfo.uri);
                setEncodedUri({ uri: encodedUri });

                setActiveEditTool(type);
                console.log("type", type);

            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.error("No image parameter found");
        }

    }, [])

return (
   <View style={styles.screenContainer}>

    {/* header */}
    <View style={styles.headerNav}>
        <Image
            style={styles.headerImg}
            source={require('../../assets/images/ElementalEditorBanner.png')}
        />
        
    </View>

    <View style={styles.canvasContainer} >
      <View style={styles.canvas} >
        <View style={styles.imageContainer} >

        {encodedUri && 
        <View>
          <Image style={styles.image} source={encodedUri}/> 
        </View>
        }

        </View>
      </View>
    </View>

    <View style={styles.primaryTools}>

    </View>


    </View>
)}

const styles = StyleSheet.create({
    screenContainer: {
      width: width,
      backgroundColor: '#1d1c1a'
    },
    headerNav: {
      zIndex: 9999999,
    },
    headerImg: {
      width: '100%',
    },  
    canvasContainer: {
      height: canvasHeight,
      width: width,
      zIndex: 999999999999999
    },
    canvas: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        height: '100%', width: '100%',
        borderWidth: 1, borderColor: 'black',
        zIndex: 999999999999999
    },
    // image container and image were very tricky to get right and center due to some confusion with alignItems making img disapear
    imageContainer: {
        display: 'flex',
        alignContent: 'center', justifyContent: 'flex-end', // flex end or else it isn't centered??
        borderWidth: .5, borderColor: 'black',
        height: '95%', width: '95%',
        overflow: 'hidden',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        height: '100%',
        width: '100%',
    },
    primaryTools: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      gap: 30,
      zIndex: 9999999,
      padding: 15,
      borderTopWidth: .6, color: 'black',
    },
  });