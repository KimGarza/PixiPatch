// react & expo
import { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// context
import { ImageCtx } from './ImageSelection/ImageCtx';
import { BackgroundCtx } from './background/BackgroundCtx';
// editing tools and menus
import PhotoSelectTool from './ImageSelection/PhotoSelectTool';
import DrawTool from './Drawing/DrawTool';
import StickerTool from './Stickers/StickerTool';
import BackgroundTool from './background/BackgroundTool';
import StickerMenu from './Stickers/StickerMenu';
import BackgroundMenu from './background/BackgroundMenu';
import DrawUtil from './Drawing/DrawUtil';
import ImageEditTools from './ImageEditTools';
import FilterMenu from './Filters/FilterMenu';
// misc
import ViewEditorTools from './views/viewEditorTools';
import ViewStickers from './views/viewStickers';
import { StickerCtx } from './Stickers/StickersCtx';
import ViewImages from './views/viewImages';

const EditorContent = () => {
    
  // contexts provided to EditorContent
  const { stickers } = useContext(StickerCtx);
  const { imagesData } = useContext(ImageCtx);
  const { background } = useContext(BackgroundCtx);
  // menus
  const [ stickerMenuToggle, setStickerMenuToggle ] = useState<boolean>(false);
  const [ backgroundMenuToggle, setBackgroundMenuToggle ] = useState<boolean>(false);
  const [ drawMenuToggle, setDrawMenuToggle ] = useState<boolean>(false);
  // misc
  const [ activeImageToEdit, setActiveImageToEdit ] = useState<ImageData | null>(null);
  const [ activeImageTool, setActiveImageTool ] = useState<string>('');

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
    console.log("menu toggle for draw actiavated");
  }

  const handleImageTapToEdit = (image: ImageData | null) => {
    setActiveImageToEdit(image);
  }

  const handleUpdateImageTool = (toolName: string) => {
    setActiveImageTool(toolName);
  }

  const router = useRouter();

return (
  <View style={styles.screenContainer}>

    <View style={styles.headerNav}>
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
          size={30}
          />
        </TouchableOpacity>
    </View>

      <View style={styles.screenContainer}>
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

          // activeImageToEdit != undefined
          ) :
          (<ImageEditTools activeImageTool={handleUpdateImageTool}/>)}
        </View>
        
      </View>
    </View>
  );
}
      
export default EditorContent;

const styles = StyleSheet.create({
  headerNav: {
    position: 'relative',
    width: '100%',
  },
  headerImg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    top: '10%',
  },
  homeIcon: {
    position: 'absolute',
    left: '4%',
    top: '50%',
    transform: [{ translateY: -15 }],
    color: 'black',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
    padding: 8
  },
  screenContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  canvasContainer: {
    position: 'absolute',
    top: '11%',
    height: '59%',
    width: '100%'
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
  },
  bottomToolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    rowGap: 15,
    top: '130%',
    borderTopWidth: .5,
    padding: 15,
  },
  imageEditorTools: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    rowGap: 15,
    top: '130%',
    borderTopWidth: .5,
    padding: 15,
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
  