import { useState } from 'react';
import { Fontisto, Ionicons, Octicons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import StyledIconContainer from '../utils/styledIconContainer';
import PhotoSelectTool from '../ImageSelection/PhotoSelectTool';
import DrawTool from '../../tools/drawing/DrawTool';
import StickerTool from '../../tools/Stickers/StickerTool';
import BackgroundTool from '../background/BackgroundTool';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

interface ViewEditorToolsProps {
    backgroundMenuToggle: () => void,
    drawMenuToggle: () => void,
    stickerMenuToggle: () => void
}

const ViewEditorTools: React.FC<ViewEditorToolsProps> = ({backgroundMenuToggle, drawMenuToggle, stickerMenuToggle}) => {

    const router = useRouter();

    // callback to be handled as prop value upon using the stickerTool comp
    // maybe replace the tool content with one of these tools  isntead of menu callbacks?
    const handleToggleStickerMenu = () => {
        stickerMenuToggle();
    }

    const handleToggleBackgroundMenu = () => {
        backgroundMenuToggle();
    }

    const handleToggleDrawMenu = () => {
        drawMenuToggle();
    }

    return (
    <StyledIconContainer dimensions={40}> 

        {/* button to select photos from library */}
        <PhotoSelectTool>
            <Fontisto name='photograph' size={30}/> 
        </PhotoSelectTool>
        
        {/* callback used to toggle background menu if x to close is clicked from child */}
        <BackgroundTool menuToggle={handleToggleBackgroundMenu}>
            <Ionicons name='image-outline' size={30}/>
        </BackgroundTool>

        <TouchableOpacity onPress={() => {router.push('/(screens)/sketchBook')}}>
            <SimpleLineIcons name='pencil' size={30}/>
        </TouchableOpacity>

        <Feather name='layout' size={30}/>

        <StickerTool menuToggle={handleToggleStickerMenu}> 
            <Octicons name='smiley' size={30}/>
        </StickerTool>
                  
    </StyledIconContainer>
  );
}

export default ViewEditorTools;