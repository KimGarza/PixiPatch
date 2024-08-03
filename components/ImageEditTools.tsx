import {View, StyleSheet} from 'react-native';
import StyledIconContainer from './styledIconContainer';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const ImageEditTools = () => {

return (
    // editor toolbar
    <View style={styles.both}>
        <View style={styles.editorToolBox}>
            <StyledIconContainer dimensions={60}> 

                <Feather name='crop' size={30}/>
                <MaterialCommunityIcons name='tune-variant' size={30}/>
                <Feather name='filter' size={30}/>
                <MaterialCommunityIcons name='checkerboard-remove' size={30}/>
                <FontAwesome5 name='eraser' size={30}/>
                <MaterialCommunityIcons name='mirror' size={30}/>
                            
            </StyledIconContainer>
        </View>
    </View>
);
}

export default ImageEditTools;

const styles = StyleSheet.create({
    both: {
        display: 'flex',
        flexWrap: 'wrap',
        top: '130%',
        padding: 10,
        flexDirection: 'row',
        gap: 10,
    },
    editorToolBox: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 35,
        rowGap: 20,
        top: '120%',
        width: '100%',
        height: '95%',
        padding: 20,
        borderWidth: 1,
        borderColor: '#7cb88b',
        borderRadius: 30,
        zIndex: 1
      },
});