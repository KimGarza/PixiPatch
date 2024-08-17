import StyledIconContainer from "../utils/styledIconContainer";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const ImageEditingTools = () => {

    return (
        <View style={styles.editingTools}>
            <StyledIconContainer dimensions={35}> 

                <TouchableOpacity>
                    <Feather name='crop' size={30}/>
                </TouchableOpacity>
        
                <TouchableOpacity>
                    <MaterialCommunityIcons name='tune-variant' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Feather name='filter' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity> 
                    <MaterialCommunityIcons name='checkerboard-remove' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <FontAwesome5 name='eraser' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity> 
                    <MaterialCommunityIcons name='mirror' size={30}/>
                </TouchableOpacity>

            </StyledIconContainer>
        </View>
);
}

export default ImageEditingTools;

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