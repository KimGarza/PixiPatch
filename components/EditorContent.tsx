import { useContext, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import PhotoSelectTool from './PhotoSelectTool';
import DrawTool from './/DrawTool';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import StyledIconContainer from './styledIconContainer';
import { ImageCtx } from './ImageCtx';
import RandomizePercentage from './RandomizePercentage';


const EditorContent = () => {
    
    const { imagesCtx } = useContext(ImageCtx); // used to pull the current images from it
    
    useEffect(() => {
      const randomPercentage = RandomizePercentage();
    })

return (
    <View style={styles.screenContainer}>

        <Image style={styles.headerImg} // later use screenOptions?
          source={require('../assets/images/ElementalEditorBanner.png')}
        />

        <View style={styles.screenContainer}>

          <View style={styles.canvasContainer}>

            {imagesCtx.length > 0 &&
              <View style={styles.canvas}>
                {imagesCtx.map((ImageCtx, index) => (
                  <Image 
                    key={ index }
                    source={{ uri: ImageCtx.uri }}
                    style={{ width: 100, height: 100, }}
                    // top: `${Math.floor(Math.random() * (30 - 20 + 1)) + 20}%`, // from 5%-95% top will decide where to add photo
                    // left: `${Math.floor(Math.random() * (30 - 10 + 1)) + 10}%`}} 
                  />  
                ))}
              </View>
            }
          </View>

          <View style={styles.editorTools}>
            <StyledIconContainer>

              <PhotoSelectTool>
                <Fontisto name='photograph' size={35}/> 
              </PhotoSelectTool>
              
              <Ionicons name='image-outline' size={35}/>

              <DrawTool>
                <SimpleLineIcons name='pencil' size={35}/>
              </DrawTool>

              <Feather name='layout' size={35}/>
              <Octicons name='smiley' size={35}/>
            </StyledIconContainer>

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
  