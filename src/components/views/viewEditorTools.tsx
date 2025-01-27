import { Fontisto, Ionicons, Octicons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import StyledIconContainer from '../utils/styledIconContainer';
import PhotoSelectTool from '../ImageSelection/PhotoSelectTool';
import StickerTool from '../features/Stickers/StickerTool';
import BackgroundTool from '../features/background/BackgroundTool';
import { useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useItemCtx } from '@/src/hooks/contexts/useItemCtx';

interface ViewEditorToolsProps {
    backgroundMenuToggle: (menuName: string) => void,
    stickerMenuToggle: (menuName: string) => void,
    textMenuToggle: (menuName: string) => void
}

const ViewEditorTools: React.FC<ViewEditorToolsProps> = ({backgroundMenuToggle, stickerMenuToggle, textMenuToggle}) => {

    const router = useRouter();
    const { updatePendingChanges } = useItemCtx();

    const [disabled, setDisabled] = useState(false); // this is to disable the sketchbook button after it is selected considering any time delay

    // callback to be handled as prop value upon using the stickerTool comp
    // maybe replace the tool content with one of these tools  isntead of menu callbacks?

    const handleToggleMenu = (menuName: string) => {
        if (menuName == 'text') {
            textMenuToggle(menuName);
        } else if (menuName == 'background') {
            backgroundMenuToggle(menuName);
        } else if (menuName == 'sticker') {
            stickerMenuToggle(menuName);
        }
    }

    const goToSketchbook = () => {
        if (disabled) return; // prevent doubleclicks
    
        setDisabled(true);
    
        updatePendingChanges();
        router.push('/(screens)/sketchBook');
    
        setTimeout(() => {
          setDisabled(false); // Re-enable the button after 500ms (adjust as needed)
        }, 500);
      }

    return (

        <View style={styles.test}>
    <StyledIconContainer dimensions={50}> 

        {/* button to select photos from library */}
        <PhotoSelectTool>
            <Fontisto name='photograph' size={35}/> 
        </PhotoSelectTool>
        
        {/* callback used to toggle background menu if x to close is clicked from child */}
        <BackgroundTool menuToggle={() => handleToggleMenu('background')}>
            <Ionicons name='image-outline' size={35}/>
        </BackgroundTool>

        <StickerTool menuToggle={() => handleToggleMenu('sticker')}> 
            <Octicons name='smiley' size={35}/>
        </StickerTool>

        <StickerTool menuToggle={() => handleToggleMenu('text')}> 
            <MaterialCommunityIcons name='format-text' size={35}/>
        </StickerTool>

        <TouchableOpacity onPress={goToSketchbook}>
            <SimpleLineIcons name='pencil' size={35}/>
        </TouchableOpacity>

        <Feather name='layout' size={35}/>
                  
    </StyledIconContainer>
    </View>
  );
}


const styles = StyleSheet.create({
    test: {
      display: 'flex', flexDirection: 'row',
      gap: 15,
      paddingHorizontal: 10,
      alignItems: 'center'
    },
})

export default ViewEditorTools;