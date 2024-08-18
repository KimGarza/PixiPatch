
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import { useLocalSearchParams  } from 'expo-router';
import { useEffect, useState } from 'react';
import CropSettings from '@/components/modifyImage/cropSettings';
import MirrorSettings from '@/components/modifyImage/mirrorSettings';

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();

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
    const [imageData, setImageData] = useState<ImageData>();
    const [encodedUri, setEncodedUri] = useState<ImageSourcePropType>();
    const [activeEditTool, setActiveEditTool] = useState<string | string[]>('');
    const [imageDimension, setImageDimensions] = useState<{imgWidth: number, imgHeight: number}>();

    useEffect(() => {

        if (image) {
            try {

              // this is the ONLY way I can read the image, cannot use ImageInfo, ImageSourcePropType w/out encoded URI or just uri in the uri: attribute
              const parsedImg: ImageData = JSON.parse(image as string);
              setImageData(parsedImg);
              const encodedUri = encodeURI(parsedImg.imageInfo.uri);
              setEncodedUri({ uri: encodedUri });

              setActiveEditTool(type);
              console.log("type", type);

              const { imgWidth, imgHeight } = adjustImageSize(parsedImg.width, parsedImg.height);
              setImageDimensions({imgWidth, imgHeight});

            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        } else {
            console.error("No image parameter found");
        }

    }, [])

    // evaluates current image aspect ratio, compares agaisnt the screen's and 
    const adjustImageSize = (currWidth: number, currHeight: number) => {

      const canvasAspectRatio = width / canvasHeight; // Example aspect ratio
      const imageAspectRatio = currWidth / currHeight;

      let imgWidth, imgHeight;

      if (imageAspectRatio > canvasAspectRatio ) {
          // Image is wider than the container
          imgWidth = width;
          imgHeight = width / imageAspectRatio;
      } else {
          // Image is taller than or equal in aspect ratio to the container
          imgHeight = height;
          imgWidth = height * imageAspectRatio;
      }

      return { imgWidth, imgHeight };
  }

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
          <Image style={[styles.image, {height: imageDimension?.imgHeight, width: imageDimension?.imgWidth}]} source={encodedUri}
          /> 
        </View>
        }

        </View>
      </View>
    </View>

    <View style={styles.editSettings}>
    {activeEditTool == 'crop' ? (
        <View>
          <CropSettings/>
        </View>
      ) : activeEditTool == 'mirror' ? (
        <View>
          <MirrorSettings/>
        </View>
      ) : (<></>)}
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
      height: headerHeight
    },
    headerImg: {
      width: '100%',
    },  
    canvasContainer: {
      height: canvasHeight * .85,
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
        // maxWidth: '100%',
        // maxHeight: '100%',
        // height: '100%',
        // width: '100%',
    },
    editSettings: {
      display: 'flex',
      flexDirection: 'row',
      borderWidth: 2, borderColor: 'green',
      height: canvasHeight * .15, width: '100%',
      backgroundColor: '#bec6ba',
    },
    primaryTools: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%', 
      height: height - canvasHeight - headerHeight,
      gap: 30,
      zIndex: 99999999999,
      padding: 15,
      borderTopWidth: .6, borderColor: 'black',
      backgroundColor: '#bec6ba',
    },
  });