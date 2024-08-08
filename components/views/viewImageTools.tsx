import {View, StyleSheet} from 'react-native';
import StyledIconContainer from '../utils/styledIconContainer';

import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from 'react';

import FilterTool from '../Filters/FilterTool';
import { Dimensions } from 'react-native';

// PUT ALL THIS IN A CONTEXT PROVIDER FOR EDITOR CONTENT
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const aspectRatio = 9/14.5; // 9:16 is typical
const canvasHeight = width / aspectRatio;
var headerHeight = 0;

interface viewImageToolsProps {
    filterMenuToggle: () => void, // passes back to editor content the name of the image setting in order to effect how somethings are displayed
}

const ViewImageTools: React.FC<viewImageToolsProps> = ({filterMenuToggle}) => {
    const [toggleFilterMenu, setToggleFilterMenu] = useState<boolean>();

    const handleFilterMenuToggle = () => {
        setToggleFilterMenu(!toggleFilterMenu);
        filterMenuToggle();
    }

return (
    // editor toolbar
    <View style={styles.editingTools}>
        <StyledIconContainer dimensions={40}> 

            <Feather name='crop' size={30}/>
            <MaterialCommunityIcons name='tune-variant' size={30}/>

            <FilterTool menuToggle={handleFilterMenuToggle}>
                <Feather name='filter' size={30}/>
            </FilterTool>

            <MaterialCommunityIcons name='checkerboard-remove' size={30}/>
            <FontAwesome5 name='eraser' size={30}/>
            <MaterialCommunityIcons name='mirror' size={30}/>
                        
        </StyledIconContainer>
    </View>
);
}

export default ViewImageTools;

const styles = StyleSheet.create({
    editingTools: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: width,
        height: height - canvasHeight - headerHeight - 100, // WHY THE 100 OMG
        gap: 30,
        zIndex: 999,
        padding: 15,
        borderTopWidth: .5, borderColor: 'black'
      },
});