import { View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import { useLocalSearchParams  } from 'expo-router';
import { useEffect, useState } from 'react';
import Crop from '@/components/modification/crop/crop';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useImageCxt } from '@/hooks/contexts/useImageCtx';
import CroppableImage from '@/components/modification/crop/croppableImage';

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();
interface ImageInfo {
  uri: string;
  width: number;
  height: number;
}
interface ImageData {
  imageInfo: ImageInfo;
  ogImageInfo: ImageInfo;
  top: number;
  left: number;
  width: number;
  height: number;
}

// Content related to the ModifyImageScreen (due to ctx wrappers needed to make this comp but will change how ctx is used to avoid this)
export default function ModifyImageScreen() {

  const { image, activatedTool } = useLocalSearchParams(); // retrieve the params from accessing modifyImageScreen

  const router = useRouter();
  const { updateImageInfo, activeImageCtx, images } = useImageCxt();

  const [encodedUri, setEncodedUri] = useState<ImageSourcePropType>();
  const [imageData, setImageData] = useState<ImageData>();
  const [imageDimension, setImageDimensions] = useState<{imgWidth: number, imgHeight: number}>();
  const [isCropping, setIsCropping] = useState<boolean>(true);

  useEffect(() => {
  }, [images, imageData])

// Since some manipulations affect imageInfo in image coming through as the param.... it won't reflect on view bc not pulling image from context here
  useEffect(() => {
    if (image) {
      try {
        const parsedImg: ImageData = JSON.parse(image as string); // deserialized the local param into ImageData
        setImageData(parsedImg);
        setEncodedUri({ uri: encodeURI(parsedImg.imageInfo.uri) }); // this is the only way to have a valid source for the image in the view!

        const { imgWidth, imgHeight } = adjustImageSize(parsedImg.imageInfo.width, parsedImg.imageInfo.height); // adjust image to fully fit the space
        setImageDimensions({imgWidth, imgHeight});

      } catch (error) {
          console.error("Error parsing JSON:", error);
      }
    } else {
        console.error("No image parameter found");
    }
  }, [])

  // activates whichever tool is the one which was selected or changed to
  useEffect(() => {

    // if (activatedTool == 'crop' && imageData) {
    //  setIsCropping(true);
    // }
  }, [ activatedTool, imageData ])

  // Evaluates current image aspect ratio from imageInfo, compares against the screen's, and scales to largest size with no cutting off.
  // Reason for using ImageInfo here when canvas uses ImageData is bc some image manipulations affect image at the pixel level.
  const adjustImageSize = (currWidth: number, currHeight: number) => {

    const canvasAspectRatio = width / canvasHeight;
    const imageAspectRatio = currWidth / currHeight;

    let imgWidth, imgHeight;

    if (imageAspectRatio > canvasAspectRatio ) { // if imageInfo is wider than the container
        imgWidth = width;
        imgHeight = width / imageAspectRatio;
    } else { // imageInfo is taller than or equal in aspect ratio to the container
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
      <TouchableOpacity onPress={() => router.push('/(screens)')} style={styles.back}>
        <Ionicons name={'arrow-back'} size={35}/>
      </TouchableOpacity>
        
    </View>

    <View style={styles.canvasContainer} >
      <View style={styles.canvas} >
        <View style={styles.imageContainer} >

        {/* primary image to edit appears but if currently in cropping mode, image will appear dark and another copy will overlay it which will be cropped */}
        {encodedUri &&
        <View>
          {/* <Image style={[{height: imageDimension?.imgHeight, width: imageDimension?.imgWidth}]} source={encodedUri} */}
          <Image // this image will appear regardless
            style={[isCropping ? styles.imageDark : styles.image]} 
            resizeMode='contain'
            source={encodedUri}
          />

          {isCropping && imageData &&
            <CroppableImage // this image is the active image being cropped and will overlay the other if being cropped to have live cropping
             image={imageData} encodedUri={encodedUri}
            />
          } 

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
      height: '95%', width: '95%',
      overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%', 
  },  
  imageDark: {
    height: '100%',
    width: '100%',
    opacity: .3 // may need ot add this over a black box the size of the iamge behind it
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