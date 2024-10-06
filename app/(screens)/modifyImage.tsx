import { View, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import GlobalDimensions from '@/src/components/dimensions/globalDimensions';
import { useLocalSearchParams  } from 'expo-router';
import { useEffect, useState } from 'react';
import Crop from '@/src/components/modification/crop/crop';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import CroppableImage from '@/src/components/modification/crop/croppableImage';
import FilterableImage from '@/src/components/modification/Filters/filterableImage';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';
import { ImageItem } from '@/src/customTypes/itemTypes';
import GlobalTheme from '@/src/hooks/contexts/GlobalTheme';

const { colors } = GlobalTheme();

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();

// Content related to the ModifyImageScreen (due to ctx wrappers needed to make this comp but will change how ctx is used to avoid this)
export default function ModifyImageScreen() {

  const { image } = useLocalSearchParams(); // retrieve the params from accessing modifyImageScreen

  const router = useRouter();
  const {images} = useItemCtx();

  const [encodedUri, setEncodedUri] = useState<ImageSourcePropType>();
  const [imageItem, setImageItem] = useState<ImageItem>();
  const [imageDimensions, setImageDimensions] = useState<{imgWidth: number, imgHeight: number}>();
  const [activeTool, setActiveTool] = useState<string>('');

  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  useEffect(() => {
  }, [images, imageItem])

// Since some manipulations affect imageInfo in image coming through as the param.... it won't reflect on view bc not pulling image from context here
  useEffect(() => {
    if (image) {
      try {
        const parsedImg: ImageItem = JSON.parse(image as string); // deserialized the local param into ImageData
        setImageItem(parsedImg);
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
  }, [ activeTool ])

  // Evaluates current image aspect ratio from imageInfo, compares against the screen's, and scales to largest size with no cutting off.
  // Reason for using ImageInfo here when canvas uses imageItem is bc some image manipulations affect image at the pixel level.
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
          source={require('../../src/assets/images/ElementalEditorBanner.png')}
      />
      <TouchableOpacity onPress={() => router.push('/(screens)')} style={styles.back}>
        <Ionicons name={'arrow-back'} size={35}/>
      </TouchableOpacity>
        
    </View>

    <View style={styles.canvasContainer} >
      <View style={styles.canvas} >
        <View style={styles.imageContainer} >

        {encodedUri && (
        <View>
          {/* Primary image: Appears always, darkened if cropping */}
          <Image
            style={[isCropping ? styles.imageDark : styles.image]}
            resizeMode="contain"
            source={encodedUri}
          />

          {/* Conditional rendering based on current mode (cropping, filtering, etc.) */}
          {isCropping && imageItem && imageDimensions ? (
            <CroppableImage image={imageItem} encodedUri={encodedUri} dimensions={imageDimensions}/>
          ) : isFiltering && imageItem && imageDimensions ? (
            <FilterableImage image={imageItem} encodedUri={encodedUri} dimensions={imageDimensions}/>
          // ) : isErasing ? (
          //   // Default view or image when not in any specific mode
          //   <ErasableImage image={imageData} encodedUri={encodedUri} />
          // ) : isDrawing ? (
          //   // Default view or image when not in any specific mode
          //   <DrawableImage image={imageData} encodedUri={encodedUri} />
          ) : (<></>)}
        </View>
      )}
        </View>
      </View>
    </View>

    {/* placement of settings for active tool, (active tool would be displayed where bottom toolbar is) */}
    <View style={styles.editSettings}>
      {/* {isFiltering && <FilterInterface/>} */}
    </View>

    {/* bottom toolbar */}
    <View style={styles.primaryTools}>
    </View>

  </View>
)}

const styles = StyleSheet.create({
  screenContainer: {
    width: width,
    backgroundColor: colors.DarkCoffee
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
  },
  canvas: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      height: '100%', width: '100%',
      borderWidth: 1, borderColor: 'black',
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
    height: canvasHeight * .15, width: '100%',
    backgroundColor: colors.Sage,
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
    backgroundColor: colors.Sage,
  },
});