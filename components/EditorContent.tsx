import { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { ImageCtx } from './ImageSelection/ImageCtx';
import { DrawCtx } from './Drawing/DrawCtx';
import { StickerCtx } from './Stickers/StickersCtx';
import { BackgroundCtx } from './background/BackgroundCtx';
import PhotoSelectTool from './ImageSelection/PhotoSelectTool';
import DrawTool from './Drawing/DrawTool';
import StickerTool from './Stickers/StickerTool';
import BackgroundTool from './background/BackgroundTool';
import StickerMenu from './Stickers/StickerMenu';
import BackgroundMenu from './background/BackgroundMenu';
import StyledIconContainer from './styledIconContainer';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import DrawUtil from './Drawing/DrawUtil';
import ImageEditTools from './ImageEditTools';

// pic collage: standard 1800 x 1800 and HD 3600 x 3600 
// photo i took on pixel: 3072 x 4080
const EditorContent = () => {
    
    const { imagesData } = useContext(ImageCtx);
    const { drawingData } = useContext(DrawCtx);
    const { stickers } = useContext(StickerCtx);
    const { background } = useContext(BackgroundCtx);

    const [ stickerMenuToggle, setStickerMenuToggle ] = useState<boolean>(false);
    const [ backgroundMenuToggle, setBackgroundMenuToggle ] = useState<boolean>(false);
    const [ drawMenuToggle, setDrawMenuToggle ] = useState<boolean>(false);

    const [ activeImageToEdit, setActiveImageToEdit ] = useState<ImageData>();
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
    const handleToggleStickerMenu = () => {
      setStickerMenuToggle(!stickerMenuToggle);
    }

    const handleToggleBackgroundMenu = () => {
      setBackgroundMenuToggle(!backgroundMenuToggle);
    }

    const handleToggleDrawMenu = () => {
      setDrawMenuToggle(!drawMenuToggle);
      console.log("menu toggle for draw actiavated");
    }

    const handleImageTapToEdit = (image: ImageData) => {
      setActiveImageToEdit(image);
      console.log("active image:", image);
    }

return (
  <View style={styles.screenContainer}>

    <Image style={styles.headerImg}
      source={require('../assets/images/ElementalEditorBanner.png')}
    />

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
          <View>
            {stickers.map((stickerCtx, index) => (
              <View>
                  <Image
                    key={ index }
                    source={ stickerCtx.sticker }
                    style={{
                      width: 50, height: 50, 
                      zIndex: 9999, 
                      flexDirection: 'column',
                      position: 'absolute',
                      top: stickerCtx.top, 
                      left: stickerCtx.left,
                    }} 
                      />
              </View>
            ))}
          </View>

          {/* Drawing */}
          {drawMenuToggle && <DrawUtil isDrawing={drawMenuToggle}/>}

            {/* Pictures */}
            {imagesData.length > 0 &&
              <View>
                {imagesData.map((imageCtx, index) => (
                  <View>
                    <TouchableOpacity onPress={() => handleImageTapToEdit(imageCtx)}>
                      <Image 
                        key={ index }
                        source={{ uri: imageCtx.imageInfo.uri }}
                        style={[{ 
                          width: 200, height: 200,
                          position: 'absolute',
                          zIndex: 99, 
                          flexDirection: 'column', // idk why but this helps with the scattering
                          top: imageCtx.top,
                          left: imageCtx.left,
                        }, activeImageToEdit?.imageInfo.uri == imageCtx.imageInfo.uri && styles.imageSelected,]}
                      />  
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            }
            
          </View>
        </ImageBackground>

      </View>
       

      {/* Bottom Toolbar - alternates between editing tools and menu for specific tools in use */}
      { activeImageToEdit == undefined ? (
        <View style={styles.editorTools}>

          { stickerMenuToggle ? ( // sticker menu
            <View>
              <StickerMenu menuToggle={handleToggleStickerMenu}/>
            </View>
            ) : backgroundMenuToggle ? ( // background menu
            <View>
              <BackgroundMenu menuToggle={handleToggleBackgroundMenu}/>
            </View>
            ) : (  // actively selected image
              
            // editor toolbar
            <StyledIconContainer dimensions={60}> 

              <PhotoSelectTool>
                <Fontisto name='photograph' size={35}/> 
              </PhotoSelectTool>
              
              {/* callback used to toggle background menu if x to close is clicked from child */}
              <BackgroundTool menuToggle={handleToggleBackgroundMenu}>
              <Ionicons name='image-outline' size={35}/>
              </BackgroundTool>

              <DrawTool menuToggle={handleToggleDrawMenu}>
                <SimpleLineIcons name='pencil' size={35}/>
              </DrawTool>

              <Feather name='layout' size={35}/>

              <StickerTool menuToggle={handleToggleStickerMenu}> 
                <Octicons name='smiley' size={35}/>
              </StickerTool>
                            
            </StyledIconContainer>
            )}
          </View>
          ) : ( <ImageEditTools />)}

      </View>
    </View>
  );
}
      
export default EditorContent;

const styles = StyleSheet.create({
  headerImg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    top: '10%',
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
  editorTools: {
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
  },
});
  