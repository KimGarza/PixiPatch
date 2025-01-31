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
import GlobalTheme from '@/src/components/global/GlobalTheme';
import GlobalDimensions from '@/src/components/global/globalDimensions';
import { Dimensions } from 'react-native';
const { dimensions } = GlobalDimensions();
const { colors } = GlobalTheme();

const windowHieght = Dimensions.get('window').height;
const toolbarHeight = windowHieght - dimensions.headerHeight - dimensions.canvasHeight
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
    <View style={styles.toolIcons}>
        <StyledIconContainer dimensions={50} > 

            {/* button to select photos from library */}
            <PhotoSelectTool>
                <Fontisto name='photograph' size={35} color={colors.Rust}/> 
            </PhotoSelectTool>
            
            {/* callback used to toggle background menu if x to close is clicked from child */}
            <BackgroundTool menuToggle={() => handleToggleMenu('background')}>
                <Ionicons name='image-outline' size={35} color={colors.Rust}/>
            </BackgroundTool>

            <StickerTool menuToggle={() => handleToggleMenu('sticker')}> 
                <Octicons name='smiley' size={35} color={colors.Rust}/>
            </StickerTool>

            <StickerTool menuToggle={() => handleToggleMenu('text')}> 
                <MaterialCommunityIcons name='format-text' size={35} color={colors.Rust}/>
            </StickerTool>

            <TouchableOpacity onPress={goToSketchbook}>
                <SimpleLineIcons name='pencil' size={35} color={colors.Rust}/>
            </TouchableOpacity>

            <Feather name='layout' size={35} color={colors.Rust}/>
                
        </StyledIconContainer>
    </View>
  );
}

const styles = StyleSheet.create({
    toolIcons: {
        flex: 1, flexDirection: 'row',
        zIndex: 9999999,
        alignItems: 'center', 
        //**** WANT TO USE BUT GAP WORKS ONLY justifyContent: 'space-evenly',
        gap: '5%',
        paddingHorizontal: 10,
    },
})

export default ViewEditorTools;