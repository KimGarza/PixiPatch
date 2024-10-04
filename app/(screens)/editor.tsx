// react & expo
import { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image, Text} from 'react-native';
// context
import { useBackgroundCtx } from '@/src/components/features/background/BackgroundCtx';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';
import { useTextCtx } from '@/src/components/features/Text/useTextCtx';
// editing tools and menus
import StickerMenu from '@/src/components/features/Stickers/StickerMenu';
import BackgroundMenu from '@/src/components/features/background/BackgroundMenu';
import TextMenu from '@/src/components/features/Text/textMenu';
// import FilterMenu from './Filters/FilterMenu';
import SaveButtonAndMenu from '@/src/components/save/saveButtonAndMenu';
import HomeButton from '@/src/components/utils/homeButton';
// views
import ViewEditorTools from '@/src/components/views/viewEditorTools';
import ViewStickers from '@/src/components/views/viewStickers';
import ViewImages from '@/src/components/views/viewImages';
import ViewDrawings from '@/src/components/views/viewDrawings';
import ViewText from '@/src/components/views/viewText';
// misc
import GlobalDimensions from '@/src/components/dimensions/globalDimensions';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TrashButton from '@/src/components/utils/trashButton';

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();

const EditorScreen = () => {
  // contexts
  const { background } = useContext(useBackgroundCtx);
  const { images, stickers, drawings, texts, activeItemCtx } = useItemCtx();
  // menus
  const [stickerMenuToggle, setStickerMenuToggle] = useState<boolean>(false);
  const [backgroundMenuToggle, setBackgroundMenuToggle] = useState<boolean>(false);
  const [textMenuToggle, setTextMenuToggle] = useState<boolean>(false);
  // misc
  const viewRef = useRef(null); // used to capture the canvas container View elemenet

  useEffect(() => {
  }, [images, drawings, stickers, texts]);

  // Menu Callbacks - allows for conditional displaying of menus based on opened or closed
  const handleToggleStickerMenuCallback = () => {
    setStickerMenuToggle(!stickerMenuToggle);
  };

  const handleToggleBackgroundMenuCallback = () => {
    setBackgroundMenuToggle(!backgroundMenuToggle);
  };

  const handleToggleMenuCallback = (menuName: string) => {
    if (menuName == 'text') {
      setTextMenuToggle(!textMenuToggle);
    } else if (menuName == 'background') {
      setBackgroundMenuToggle(!backgroundMenuToggle);
    } else if (menuName == 'sticker') {
      setStickerMenuToggle(!stickerMenuToggle);
    }
  };

  return (
    <View style={styles.screenContainer}>
      {/* header */}
      <View style={styles.headerNav}>
        <Image
          style={styles.headerImg}
          source={require('../../src/assets/images/ElementalEditorBanner.png')}
        />
        <HomeButton />
        {/* viewRef is ref of canvas container 'View' element. Passing into SaveWorkButton bc this contains the user's beautiful creation that will be saved! */}
        <SaveButtonAndMenu viewRef={viewRef.current} />
      </View>

      {/* main canvas */}
      <View style={styles.canvasContainer} ref={viewRef} collapsable={false}>
        <ImageBackground source={background} style={styles.imageBackground}>
          <View style={styles.canvas}>

            {activeItemCtx && 
            <View style={styles.trashIcon}>
              <TrashButton/>
            </View>}

            {/* Stickers */}
            <ViewStickers stickers={stickers} />

            {/* Drawing */}
            <ViewDrawings drawings={drawings} />

            {/* Pictures */}
            <ViewImages images={images} />

            <ViewText texts={texts}/>

          </View>
        </ImageBackground>
      </View>

      {/* Bottom Toolbar - alternates between primary editing tools and menus for active in-use tool */}
      {stickerMenuToggle ? (
        <StickerMenu menuToggle={handleToggleStickerMenuCallback} />
      ) : backgroundMenuToggle ? (
        <BackgroundMenu menuToggle={handleToggleBackgroundMenuCallback} />
      ) : textMenuToggle ? (
        <TextMenu menuToggle={handleToggleMenuCallback} />
      ) : (
        // primary tools
        <View style={styles.primaryTools}>
          <ViewEditorTools
            backgroundMenuToggle={handleToggleMenuCallback}
            stickerMenuToggle={handleToggleMenuCallback}
            textMenuToggle={handleToggleMenuCallback}
          />
          
        </View>
      )}
    </View>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  screenContainer: {
    width: width,
  },
  headerNav: {
    zIndex: 9999999,
    height: headerHeight,
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
    height: '100%',
    width: '100%',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  primaryTools: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    height: height - canvasHeight - headerHeight,
    gap: 30,
    zIndex: 9999999,
    padding: 15,
    borderTopWidth: 0.6,
    borderColor: 'black',
  },
  trashIcon: {
    position: 'absolute', // Important for zIndex to take effect
    right: 10,
    top: 10,
    zIndex: 999999999999,  // High zIndex value
    elevation: 10,
  },
});
