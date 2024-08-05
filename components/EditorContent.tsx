// react & expo
import { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// context
import { ImageCtx } from './ImageSelection/ImageCtx';
import { BackgroundCtx } from './background/BackgroundCtx';
// editing tools and menus
import StickerMenu from './Stickers/StickerMenu';
import BackgroundMenu from './background/BackgroundMenu';
import DrawUtil from './Drawing/DrawUtil';
import ViewImageTools from './views/viewImageTools';
import FilterMenu from './Filters/FilterMenu';
// misc
import ViewEditorTools from './views/viewEditorTools';
import ViewStickers from './views/viewStickers';
import { StickerCtx } from './Stickers/StickersCtx';
import ViewImages from './views/viewImages';
import { Dimensions } from 'react-native';

// PUT ALL THIS IN A CONTEXT PROVIDER FOR EDITOR CONTENT
  // obtaining screen width and height dimensions dynamically using a specified aspect ratio to contrain canvas size.
  const screenWidth = Dimensions.get('screen').width; // or 'window'
  const screenHeight = Dimensions.get('screen').height; // or 'window' // for some reason this is 22 larger with get window and 50 too large with screen! And using useDimensions from react same result. Using 100% in styling as opposed to this works not sure why
  const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
  const canvasHeight = screenWidth / aspectRatio;
  var headerImageHeight = 0;
  var toolbarHeight = 0;
  if (headerImageHeight) { toolbarHeight = screenHeight - canvasHeight - headerImageHeight;}

const EditorContent = () => {

  const [headerHeight, setHeaderHeight] = useState(0);
  // contexts provided to EditorContent
  const { stickers } = useContext(StickerCtx);
  const { imagesData } = useContext(ImageCtx);
  const { background } = useContext(BackgroundCtx);
  // menus
  const [ stickerMenuToggle, setStickerMenuToggle ] = useState<boolean>(false);
  const [ backgroundMenuToggle, setBackgroundMenuToggle ] = useState<boolean>(false);
  const [ drawMenuToggle, setDrawMenuToggle ] = useState<boolean>(false);
  const [ filterMenuToggle, setFilterMenuToggle ] = useState<boolean>(false);
  // misc
  const [ activeImageToEdit, setActiveImageToEdit ] = useState<ImageData | null>(null);

  interface ImageData {
    imageInfo: ImageInfo;
    top: number;
    left: number;
  }
  interface ImageInfo {
    uri: string;
    width: number;
    height: number;
    type: string | undefined;
  }

  // callback to be handled as prop value upon using the stickerTool comp
  const handleToggleStickerMenuCallback = () => {
    setStickerMenuToggle(!stickerMenuToggle);
  }

  const handleToggleBackgroundMenuCallback = () => {
    setBackgroundMenuToggle(!backgroundMenuToggle);
  }

  const handleToggleDrawMenuCallback = () => {
    setDrawMenuToggle(!drawMenuToggle);
  }

  const handleToggleFilterMenuCallback = () => {
    setFilterMenuToggle(!filterMenuToggle);
    console.log("menu toggle for filter actiavated");
  }

  const handleImageTapToEdit = (image: ImageData | null) => {
    setActiveImageToEdit(image);
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    setHeaderHeight(height);
    headerImageHeight = height;
  }

  const router = useRouter();

  console.log("height", screenHeight);

return (
  <View style={styles.screenContainer}>

    {/* header */}
    <View style={styles.headerNav} onLayout={handleLayout}>
      <Image
        style={styles.headerImg}
        source={require('../assets/images/ElementalEditorBanner.png')}
      />
      {/* home icon */}
      <TouchableOpacity 
        onPress={() => router.push('/(screens)')}
        style={styles.homeIcon}
      >
        <FontAwesome6 
          name={'house-chimney'}
          size={20}
          />
      </TouchableOpacity>
    </View>


        {/* main canvas */}
    <View style={styles.canvasContainer}>

      <ImageBackground
      source={background}
      style={{
        width: '100%', height: '100%', 
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1
      }} >

        <View style={styles.canvas}>

          {/* Stickers */}
          <ViewStickers stickers={stickers}/>

          {/* Drawing */}
          {drawMenuToggle && <DrawUtil isDrawing={drawMenuToggle}/>}

          {/* Pictures */}
          <ViewImages images={imagesData} activeImage={handleImageTapToEdit}/>
          
        </View>
      </ImageBackground>

    </View>
       

    {/* Bottom Toolbar - alternates between primary editing tools and menus for active in-use tool */}
    <View style={styles.bottomToolbar}>
      {/* specific tool menus */}
      {activeImageToEdit == null ? (

        stickerMenuToggle ? (
          <StickerMenu menuToggle={handleToggleStickerMenuCallback}/>
        ) : backgroundMenuToggle ? (
          <BackgroundMenu menuToggle={handleToggleBackgroundMenuCallback}/>
        ) : 
          // primary tools
          <ViewEditorTools 
          backgroundMenuToggle={handleToggleBackgroundMenuCallback} 
          drawMenuToggle={handleToggleDrawMenuCallback}
          stickerMenuToggle={handleToggleStickerMenuCallback}
          />

      // activeImageToEdit != undefined which means image is currently selected for editing
      ) : filterMenuToggle ? (
        <FilterMenu menuToggle={handleToggleFilterMenuCallback} activeImage={activeImageToEdit}/>
      ) : 
      ( <ViewImageTools 
        filterMenuToggle={handleToggleFilterMenuCallback} />
      )}

        {/* <ImageFilter config={{name: 'Brightness', amount: 1, image: <Image source={require('../assets/images/welcome.png')}/>}}/> */}
    </View>
        
  </View>
  );
}
      
export default EditorContent;

const styles = StyleSheet.create({
  screenContainer: {
    display: 'flex',
    alignItems: 'center',
    width: screenWidth,
    height: '100%', // this is the only way to actually get 100% accuracy so far
    // height: screenHeight - 50, // see top where screenHeight is created for more details
    borderWidth: 1,
    borderColor: 'pink'
  },
  headerNav: {
    width: screenWidth,
    zIndex: 9999
  },
  headerImg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  homeIcon: {
    position: 'absolute',
    left: '4%',
    top: '45%',
    transform: [{ translateY: -15 }],
    color: 'black',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
    padding: 8,
  },
  canvasContainer: {
    height: canvasHeight,
    width: screenWidth,
    borderWidth: 1,
    borderColor: 'gold',
  },
  canvas: { // we must consider canvas container has  weird position so top height and width of each photo in canvas will be randomized to try and keep random but sort of central
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    overflow: 'hidden',
    height: '100%', // 100% of parent which is canvas container
    width: '100%', // 100% of parent which is canvas container
    borderWidth: 1,
    borderColor: 'gray'
  },
  bottomToolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    rowGap: 15,
    width: screenWidth,
    height: screenHeight - canvasHeight - headerImageHeight - 100, // WHY THE 100 OMG
    padding: 15,
    borderWidth: 5,
    borderColor: 'teal',
    zIndex: 99999,
  },
  imageEditorTools: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    rowGap: 15,
    width: screenWidth,
    height: screenHeight - canvasHeight - headerImageHeight,
    padding: 15,
    borderWidth: 1,
    borderColor: 'teal',
    zIndex: 99999,
  },
  imageSelected: {
    borderWidth: 2,
    borderColor: 'red',
    zIndex: 1
  },
  filterImage: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'green',
  },
});
  