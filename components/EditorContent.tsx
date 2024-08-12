// react & expo
import { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
// context
import { ImageCtx } from './ImageSelection/ImageCtx';
import { BackgroundCtx } from './background/BackgroundCtx';
// editing tools and menus
import StickerMenu from './Stickers/StickerMenu';
import BackgroundMenu from './background/BackgroundMenu';
import DrawUtil from './Drawing/DrawUtil';
import ViewImageTools from './views/viewImageTools';
// import FilterMenu from './Filters/FilterMenu';
import SaveButtonAndMenu from './save/saveButtonAndMenu';
import HomeButton from './utils/homeButton';
// misc
import ViewEditorTools from './views/viewEditorTools';
import ViewStickers from './views/viewStickers';
import { StickerCtx } from './Stickers/StickersCtx';
import ViewImages from './views/viewImages';
import GlobalDimensions from './Dimensions/globalDimensions';

const { width, height, canvasHeight } = GlobalDimensions();

const EditorContent = () => { 
  // contexts
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
    console.log("handle tap to edit from editor content: ", image);
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
            <ViewImages images={imagesData} activatedImage={handleImageTapToEdit}/> 

        </View>
      </ImageBackground>
    </View>

    {/* Bottom Toolbar - alternates between primary editing tools and menus for active in-use tool */}
    { 1 + 1 == 2 && (
      activeImageToEdit == null ? (
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
    )
  )
  //  : filterMenuToggle ? (
    // <FilterMenu menuToggle={handleToggleFilterMenuCallback} activeImage={activeImageToEdit}/>
  // )
   : (
    <ViewImageTools filterMenuToggle={handleToggleFilterMenuCallback} />
  )
)}
    </View>
  );
}

export default EditorContent;

const styles = StyleSheet.create({
  screenContainer: {
    width: width,
    // display: 'flex',
    // alignItems: 'center',
    // height: height,
  },
  headerNav: {
    zIndex: 9999999,
    // width: width,
    // position: 'relative',
  },
  headerImg: {
    width: '100%',
  },  
  canvasContainer: {
    height: canvasHeight,
    width: width,
    // position: 'relative',
  },
  canvas: {
    overflow: 'hidden',
    height: '100%', width: '100%',
    // display: 'flex',
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // gap: 10,
    // position: 'absolute',
  },
  imageBackground: {
    width: '100%', height: '100%',
    zIndex: 1,
    // flexDirection: 'column',
    // position: 'relative',
  },
  primaryTools: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 30,
    zIndex: 9999999,
    padding: 15,
    borderTopWidth: .6, color: 'black',
    // display: 'flex',
    // flexWrap: 'wrap',
    // height: height - canvasHeight - headerHeight - 20, // no idea where 20 comes from, screen - window = 24 when not included, height is correct
  },
});
