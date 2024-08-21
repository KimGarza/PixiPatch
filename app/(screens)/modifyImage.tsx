
import { View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import { useLocalSearchParams  } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import CropImage from '@/components/modifyImage/cropImage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { ImageCtx } from '@/components/ImageSelection/ImageCtx';

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();

interface ImageInfo {
  uri: string;
  width: number;
  height: number;
}
interface ImageData {
  imageInfo: ImageInfo;
  top: number;
  left: number;
  width: number;
  height: number;
}

export default function ModifyImageScreen() {

    const { image, activatedTool, images } = useLocalSearchParams(); // Retrieve the image params

    const router = useRouter();
    const { activeImageCtx, updateImageInfo } = useContext(ImageCtx);

    const [encodedUri, setEncodedUri] = useState<ImageSourcePropType>();
    const [imageData, setImageData] = useState<ImageData>();
    const [imageDimension, setImageDimensions] = useState<{imgWidth: number, imgHeight: number}>();

    const [currentTool, setCurrentTool] = useState<string | string[]>(activatedTool);

    // need to reinstate this is screen can be used instead
    useEffect(() => {

      if (image) {
        try {

          // this is the ONLY way I can read the image, cannot use ImageInfo, ImageSourcePropType w/out encoded URI or just uri in the uri: attribute
          const parsedImg: ImageData = JSON.parse(image as string); // deserialized into ImageData
          setImageData(parsedImg);
          // When to Use encodeURI:
          // Before Making HTTP Requests: If you're passing the URI as part of an HTTP request (like an image fetch), encoding ensures that the request is correctly formed.
          // In Image Sources: If you're setting an image source in a component, encoding the URI can prevent issues if the URI contains spaces or other special characters.
          // Generating URLs: If you're dynamically generating URLs or URIs that include user input or filenames, encoding helps avoid errors.
          setEncodedUri({ uri: encodeURI(parsedImg.imageInfo.uri) });

          const { imgWidth, imgHeight } = adjustImageSize(parsedImg.imageInfo.width, parsedImg.imageInfo.height);
          setImageDimensions({imgWidth, imgHeight});

        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
      } else {
          console.error("No image parameter found");
      }
    }, [])

    // useEffect(() => {

    //   if (imageData) { // if parsed image from local search params has populated the useState
    //     activatedTool == 'crop' ? CropImage(imageData, updateImageUri) : null // pass the image and the ctx function (can't do it within or breaks hook rules)

    //   }
    // }, [ currentTool, imageData, activeImageCtx ])

    useEffect(() => {
      if (imageData) {
        console.log("updated image size ", imageData?.imageInfo.width, imageData?.imageInfo.height);
      }
    }, [ images, imageData, imageData?.imageInfo, imageData?.imageInfo.width ])


    // evaluates current image aspect ratio, compares agaisnt the screen's and scales to largest size with no cutting off.
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

  const handlePress = async () => {
    console.log("old image size ", imageData?.imageInfo.width, imageData?.imageInfo.height)
    if (activatedTool == 'crop') {
      console.log("in crop handle press in modify image")
        try {
            if (imageData) { await CropImage(imageData, updateImageInfo); }// Await the async function here
        } catch (error) {
            console.error("Error in handleModifyImage while flipping image:", error);
        }
    }
}

return (
  <View style={styles.screenContainer}>

  {/* header */}
    <View style={styles.headerNav}>
      <Image
          style={styles.headerImg}
          source={require('../../assets/images/ElementalEditorBanner.png')}
      />
      <TouchableOpacity onPress={() => router.push('/(screens)/editor')} style={styles.back}>
        <Ionicons name={'arrow-back'} size={35}/>
      </TouchableOpacity>
        
    </View>

    <View style={styles.canvasContainer} >
      <View style={styles.canvas} >
        <View style={styles.imageContainer} >

        {encodedUri && 
        <View>
          <Image style={[{height: imageDimension?.imgHeight, width: imageDimension?.imgWidth}]} source={encodedUri}
          /> 
        </View>
        }

        </View>
      </View>
    </View>

    {/* placement of settings for active tool, (active tool would be displayed where bottom toolbar is) */}
    <View style={styles.editSettings}>
    </View>

    {/* bottom toolbar */}
    <View style={styles.primaryTools}>
      <TouchableOpacity onPress={() => handlePress()}>
        <Feather name='crop' size={30}/>
      </TouchableOpacity>
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
    height: headerHeight,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImg: {
    width: '100%',
  },  
  back: {
    position: 'absolute',
    zIndex: 999999999999999,
    marginLeft: 10
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