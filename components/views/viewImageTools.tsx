import {View, StyleSheet} from 'react-native';
import StyledIconContainer from '../utils/styledIconContainer';

import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from 'react';

import FilterTool from '../Filters/FilterTool';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width; // or 'window'
const screenHeight = Dimensions.get('screen').height; // or 'window' // for some reason this is 22 larger with get window and 50 too large with screen! And using useDimensions from react same result. Using 100% in styling as opposed to this works not sure why
const aspectRatio = 10/16; // 9: 16 is normal, but shrinking height for canvas purposes, may have black on top and bottom
const canvasHeight = screenWidth / aspectRatio;
var headerImageHeight = 0;
var toolbarHeight = 0;
if (headerImageHeight) { toolbarHeight = screenHeight - canvasHeight - headerImageHeight;}

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
        width: screenWidth,
        height: screenHeight - canvasHeight - headerImageHeight - 100, // WHY THE 100 OMG
        gap: 30,
        zIndex: 99999,
        padding: 15,
        borderBottomWidth: 5,
        borderColor: 'blue'
      },
});