import StyledIconContainer from "../utils/styledIconContainer";
import { StyleSheet, TouchableOpacity, View, } from "react-native";
import { useContext } from "react";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { usePathname, useRouter } from "expo-router";
import { ImageCtx } from "../ImageSelection/ImageCtx";
import FlipImage from "../modifyImage/flipImage";

interface ImageInfo {
    uri: string;
    width: number;
    height: number;
  }

// Little popup toolbox for editing options on a specific image
// some props drilling here, passing up tool name to activate elsewhere since it doesnt make good sense to activate viewModifyImage here
const viewModifyImageToolbox = () => {

    const router = useRouter();

    const { activeImageCtx, updateImageUri } = useContext(ImageCtx);

    const handlePress = async (toolType: string) => {
        if (toolType == 'flip' && activeImageCtx) {
            try {
                await FlipImage(activeImageCtx, updateImageUri); // Await the async function here
            } catch (error) {
                console.error("Error in handleModifyImage while flipping image:", error);
            }} else {
            router.push({
                pathname: '/(screens)/modifyImage',
                params: { image: JSON.stringify(activeImageCtx), activatedTool: toolType }
            });
        }
    }

    return (
        <View style={styles.editingTools}>
            
            {/* each tool is essentially a button which routes to the modifyImage screen and passes through props a specific name such as 'crop' */}
            <StyledIconContainer dimensions={35}> 

                <TouchableOpacity onPress={() => handlePress('crop')}>
                    <Feather name='crop' size={30}/>
                </TouchableOpacity>

                {/* !!! ONLY WORKS ONCE  */}
                <TouchableOpacity onPress={() => handlePress('flip')}> 
                    <MaterialCommunityIcons name='mirror' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('filter')}>
                    <Feather name='filter' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('duplicate')}>
                    <Feather name='filter' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('backgroundErase')}>
                    <MaterialCommunityIcons name='checkerboard-remove' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('eraser')}>
                    <FontAwesome5 name='eraser' size={30}/>
                </TouchableOpacity>

            </StyledIconContainer>
        </View>
);
}

export default viewModifyImageToolbox;

const styles = StyleSheet.create({
    editingTools: {
       display: 'flex',
       flexDirection: 'row',
       flexWrap: 'wrap',
       justifyContent: 'center',
       alignContent: 'center',
       borderWidth: 1, borderColor: '#cdb6da', borderRadius: 10,
       backgroundColor: '#e8deee',
       width: 150,
       padding: 5, gap: 10,
       overflow: 'hidden'
      },
});