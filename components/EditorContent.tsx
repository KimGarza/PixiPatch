// react & expo
import { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
// context
import { ImageCtx } from './ImageSelection/ImageCtx';
import { BackgroundCtx } from './background/BackgroundCtx';
// editing tools and menus
import StickerMenu from './Stickers/StickerMenu';
import BackgroundMenu from './background/BackgroundMenu';
import DrawUtil from './modification/drawing/DrawUtil';
// import FilterMenu from './Filters/FilterMenu';
import SaveButtonAndMenu from './save/saveButtonAndMenu';
import HomeButton from './utils/homeButton';
// misc
import ViewEditorTools from './views/viewEditorTools';
import ViewStickers from './views/viewStickers';
import { StickerCtx } from './Stickers/StickersCtx';
import ViewImages from './views/viewImages';
import GlobalDimensions from './dimensions/globalDimensions';

const { width, height, canvasHeight } = GlobalDimensions();

const EditorContent = () => { 
  // contexts
  const { stickers } = useContext(StickerCtx);
  const { images } = useContext(ImageCtx);
  const { background } = useContext(BackgroundCtx);
  // menus
  const [ stickerMenuToggle, setStickerMenuToggle ] = useState<boolean>(false);
  const [ backgroundMenuToggle, setBackgroundMenuToggle ] = useState<boolean>(false);
  const [ drawMenuToggle, setDrawMenuToggle ] = useState<boolean>(false);
  const [ filterMenuToggle, setFilterMenuToggle ] = useState<boolean>(false);
  // misc
  const [ activeImageToEdit, setActiveImageToEdit ] = useState<ImageData | null>(null);
  const viewRef = useRef(null); // used to capture the canvas container View elemenet

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

  // Menu Callbacks - allows for conditional displaying of menus based on opened or closed
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
  }

  // user selected image
  const handleImageTapToEdit = (image: ImageData | null) => {
    setActiveImageToEdit(image);
  }

return (
  <View style={styles.screenContainer}>

    {/* header */}
    <View style={styles.headerNav}>
      <Image
        style={styles.headerImg}
        source={require('../assets/images/ElementalEditorBanner.png')}
      />
        <HomeButton/>
        {/* viewRef is ref of canvas container 'View' element. Passing into SaveWorkButton bc this contains the user's beautiful creation that will be saved! */}
        <SaveButtonAndMenu viewRef={viewRef.current}/>
    </View>

    {/* main canvas */}
    <View style={styles.canvasContainer} ref={viewRef} collapsable={false} >

      <ImageBackground source={background} style={styles.imageBackground}>

        <View style={styles.canvas} >

            {/* Stickers */}
            <ViewStickers stickers={stickers}/>

            {/* Drawing */}
            {drawMenuToggle && <DrawUtil isDrawing={drawMenuToggle}/>}

            {/* Pictures */}
            <ViewImages images={images} activatedImage={handleImageTapToEdit}/> 

        </View>
      </ImageBackground>
    </View>

    {/* Bottom Toolbar - alternates between primary editing tools and menus for active in-use tool */}
    { 1 + 1 == 2 && (
        stickerMenuToggle ? (
          <StickerMenu menuToggle={handleToggleStickerMenuCallback}/>
        ) : backgroundMenuToggle ? (
          <BackgroundMenu menuToggle={handleToggleBackgroundMenuCallback}/>
        ) : (
          // primary tools
      <View style={styles.primaryTools}>
        <ViewEditorTools
          backgroundMenuToggle={handleToggleBackgroundMenuCallback}
          drawMenuToggle={handleToggleDrawMenuCallback}
          stickerMenuToggle={handleToggleStickerMenuCallback}
        />
      </View>
  ))}
    </View>
  );
}

export default EditorContent;

const styles = StyleSheet.create({
  screenContainer: {
    width: width,
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
  },
  canvas: {
    overflow: 'hidden',
    height: '100%', width: '100%',
  },
  imageBackground: {
    width: '100%', height: '100%',
    zIndex: 1,
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
