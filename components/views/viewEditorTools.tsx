import { useState } from 'react';
import { Fontisto, Ionicons, Octicons, Feather, SimpleLineIcons } from '@expo/vector-icons';
import StyledIconContainer from '../styledIconContainer';
import PhotoSelectTool from '../ImageSelection/PhotoSelectTool';
import DrawTool from '../Drawing/DrawTool';
import StickerTool from '../Stickers/StickerTool';
import BackgroundTool from '../background/BackgroundTool';

interface ViewEditorToolsProps {
    backgroundMenuToggle: () => void,
    drawMenuToggle: () => void,
    stickerMenuToggle: () => void
}

const ViewEditorTools: React.FC<ViewEditorToolsProps> = ({backgroundMenuToggle, drawMenuToggle, stickerMenuToggle}) => {

    // callback to be handled as prop value upon using the stickerTool comp
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
  );
}

export default ViewEditorTools;