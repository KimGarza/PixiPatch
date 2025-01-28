// react & expo
import { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ImageBackground} from 'react-native';
// context
import { useBackgroundCtx } from '@/src/hooks/contexts/BackgroundCtx';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';
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
import GlobalDimensions from '@/src/components/global/globalDimensions';
import TrashButton from '@/src/components/utils/trashButton';
import GlobalTheme from '@/src/components/global/GlobalTheme';

const { colors } = GlobalTheme();
const { dimensions } = GlobalDimensions();

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
    <View>

      <HomeButton/>
      {/* viewRef is ref of canvas container 'View' element. Passing into SaveWorkButton bc this contains the user's beautiful creation that will be saved! */}
      <SaveButtonAndMenu viewRef={viewRef.current} />

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
  canvasContainer: {
    height: dimensions.canvasHeight,
    width: dimensions.width,
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
    height: dimensions.height - dimensions.canvasHeight - dimensions.headerHeight,
    gap: 30,
    zIndex: 9999999,
    padding: 15,
    borderTopWidth: 0.6,
    borderColor: colors.DarkRust,
  },
  trashIcon: {
    position: 'absolute', // Important for zIndex to take effect
    right: 10,
    top: 10,
    zIndex: 9999999,  // High zIndex value
    elevation: 10,
  },
});
