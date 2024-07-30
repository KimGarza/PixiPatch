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
            <StyledIconContainer dimensions={40}> 


                <Feather name='crop' size={20}/>
                <MaterialCommunityIcons name='tune-variant' size={20}/>
                <Feather name='filter' size={20}/>
                <MaterialCommunityIcons name='checkerboard-remove' size={20}/>
                <FontAwesome5 name='eraser' size={20}/>
                <MaterialCommunityIcons name='mirror' size={20}/>
                            
            </StyledIconContainer>
        </View>
        <View style={styles.secondBox}></View>
    </View>
);
}

export default ImageEditTools;

const styles = StyleSheet.create({
    both: {
        display: 'flex',
        flexWrap: 'wrap',
        top: '130%',
        padding: 15,
        flexDirection: 'row',
        gap: 15,
    },
    editorToolBox: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 25,
        rowGap: 15,
        top: '130%',
        width: '45%',
        height: '95%',
        padding: 20,
        borderWidth: 1,
        borderColor: '#7cb88b',
        borderRadius: 30,
        zIndex: 1
      },
      secondBox: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 25,
        rowGap: 15,
        top: '130%',
        width: '45%',
        height: '95%',
        padding: 20,
        borderWidth: 1,
        borderColor: '#7cb88b',
        borderRadius: 30,
        zIndex: 1
      },
});