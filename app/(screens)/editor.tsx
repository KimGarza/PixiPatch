// react & expo
import { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image, Text} from 'react-native';
// context
import { BackgroundCtx } from '@/features/background/BackgroundCtx';
import { useItemCtx } from '@/hooks/contexts/useItemCtx';
import { useTextCtx } from '@/features/Text/useTextCtx';
// editing tools and menus
import StickerMenu from '@/features/Stickers/StickerMenu';
import BackgroundMenu from '@/features/background/BackgroundMenu';
import TextMenu from '@/features/Text/textMenu';
// import FilterMenu from './Filters/FilterMenu';
import SaveButtonAndMenu from '@/components/save/saveButtonAndMenu';
import HomeButton from '@/components/utils/homeButton';
// views
import ViewEditorTools from '@/components/views/viewEditorTools';
import ViewStickers from '@/components/views/viewStickers';
import ViewImages from '@/components/views/viewImages';
import ViewDrawings from '@/components/views/viewDrawings';
import ViewText from '@/components/views/viewText';
// misc
import GlobalDimensions from '@/components/dimensions/globalDimensions';

const { width, height, canvasHeight, headerHeight } = GlobalDimensions();

const EditorScreen = () => {
  // contexts
  const { background } = useContext(BackgroundCtx);
  const { images, stickers, drawings } = useItemCtx();
  const { texts } = useTextCtx();
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
          source={require('../../assets/images/ElementalEditorBanner.png')}
        />
        <HomeButton />
        {/* viewRef is ref of canvas container 'View' element. Passing into SaveWorkButton bc this contains the user's beautiful creation that will be saved! */}
        <SaveButtonAndMenu viewRef={viewRef.current} />
      </View>

      {/* main canvas */}
      <View style={styles.canvasContainer} ref={viewRef} collapsable={false}>
        <ImageBackground source={background} style={styles.imageBackground}>
          <View style={styles.canvas}>
            {/* Stickers */}
            <ViewStickers stickers={stickers} />

            {/* Drawing */}
            <ViewDrawings drawings={drawings} />

            {/* Pictures */}
            <ViewImages images={images} />

            <ViewText textsFromCtx={texts}/>

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
});
