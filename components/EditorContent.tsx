import { useContext, useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { ImageCtx } from './ImageSelection/ImageCtx';

import PhotoSelectTool from './ImageSelection/PhotoSelectTool';
import DrawTool from './Drawing/DrawTool';
import StickerTool from './Stickers/StickerTool';
import StickerMenu from './Stickers/StickerMenu';
import BackgroundMenu from './background/BackgroundMenu';

import StyledIconContainer from './styledIconContainer';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { DrawCtx } from './Drawing/DrawCtx';
import { StickerCtx } from './Stickers/StickersCtx';
import BackgroundTool from './background/BackgroundTool';
import { BackgroundCtx, useBackground } from './background/BackgroundCtx';

// pic collage: standard 1800 x 1800 and HD 3600 x 3600 
// photo i took on pixel: 3072 x 4080
const EditorContent = () => {
    
    const { imagesData } = useContext(ImageCtx);
    const { drawingData } = useContext(DrawCtx);
    const { stickers } = useContext(StickerCtx);
    const { background } = useContext(BackgroundCtx);

    const [ stickerMenuToggle, setStickerMenuToggle ] = useState<boolean>(false);
    const [ backgroundMenuToggle, setBackgroundMenuToggle ] = useState<boolean>(false);

    // call back to be handled as prop value upon using the stickerTool comp
    const handleToggleStickerMenu = () => {
      setStickerMenuToggle(!stickerMenuToggle);
    }

    const handleToggleBackgroundMenu = () => {
      setBackgroundMenuToggle(!backgroundMenuToggle);
    }

return (
  <View style={styles.screenContainer}>

    <Image style={styles.headerImg} // later use screenOptions?
      source={require('../assets/images/ElementalEditorBanner.png')}
    />

    <View style={styles.screenContainer}>

      <View style={styles.canvasContainer}>

        {/* PHOTOS */}
        {imagesData.length > 0 &&
          <View style={styles.canvas}>
            {imagesData.map((imageCtx, index) => (
              <View>
                {/* image will need to have set default randomized scattered location data, and if user moves it, that will be updated location data top/left 
                Thinking that I will make an Image object and it will contain an imageInfo and top, left values. if the imageInfo in the particular object matches 
                this index here it will use the corresponding top and left data. Can't jsut add it to image info bc that has known specific data */}
                <Image 
                  key={ index }
                  source={{ uri: imageCtx.imageInfo.uri }}
                  style={{ 
                    width: 100, height: 100, 
                    flexDirection: 'column', // idk why but this helps with the scattering
                    top: `${imageCtx.top}%`,
                    left: `${imageCtx.left}%` }} 
              />  
              </View>
            ))}
          </View>
        }

        {/* Stickers provided from context in parent (editor) */}
        <View>
          {stickers.map((stickerCtx, index) => ( // review everything here
            <View>
                <Image
                  key={ index }
                  source={ stickerCtx.sticker }
                  style={{
                    width: 50, height: 50, 
                    flexDirection: 'column',
                    position: 'relative',
                    top: `${stickerCtx.top}%`,
                    left: `${stickerCtx.left}%` 
                  }} 
                    />
            </View>
          ))}
        </View>
        
        {/* Background provided from context in parent (editor) */}
        <View>
            <Image
              source={ background }
              style={{
                width: '100%', height: '100%', 
                flexDirection: 'column',
                position: 'relative',
              }} 
                />
        </View>

      </View>
       
      {/* sticker menu or editor toolbar */}
      <View style={styles.editorTools}>

        { stickerMenuToggle ? (
          <View>
            <StickerMenu menuToggle={handleToggleStickerMenu}/>
          </View>
          ) : backgroundMenuToggle ? (
          <View>
            <BackgroundMenu menuToggle={handleToggleBackgroundMenu}/>
          </View>
          ) : (
            <StyledIconContainer>

              <PhotoSelectTool>
                <Fontisto name='photograph' size={35}/> 
              </PhotoSelectTool>
              
              <BackgroundTool menuToggle={handleToggleBackgroundMenu}> 
              <Ionicons name='image-outline' size={35}/>
              </BackgroundTool>

              <DrawTool>
                <SimpleLineIcons name='pencil' size={35}/>
              </DrawTool>

              <Feather name='layout' size={35}/>

            {/* callback activates true for toggleStickerMenu since user clicked icon */}
              <StickerTool menuToggle={handleToggleStickerMenu}> 
                <Octicons name='smiley' size={35}/>
              </StickerTool>
                            
            </StyledIconContainer>
            )}

        </View>
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
    borderColor: 'blue',
    borderWidth: 2,
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
    borderTopWidth: 1,
    padding: 15,
  },
});
  