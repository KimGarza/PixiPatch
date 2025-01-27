import StyledIconContainer from "../utils/styledIconContainer";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import GlobalTheme from "@/src/components/global/GlobalTheme";
import { ScrollView } from "react-native-gesture-handler";

const { colors } = GlobalTheme();

const ImageEditingTools = () => {

    return (
        <View style={styles.editingTools}>

            <ScrollView
                horizontal
                contentContainerStyle={styles.scrollViewContent}
                showsHorizontalScrollIndicator={false}
                bounces={true}
            >
                <StyledIconContainer dimensions={55}> 

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
            </ScrollView>
        </View>
);
}

export default ImageEditingTools;

const styles = StyleSheet.create({
    editingTools: {
       flexDirection: 'row',
       alignItems: 'center',
       borderWidth: 1, borderRadius: 10, borderColor: 'green',
       backgroundColor: colors.DarkCoffee,
       width: '100%',
       padding: 5, gap: 30,
       overflow: 'hidden'
      },
      scrollViewContent: {
        gap: 30,
        paddingHorizontal: 15,
      },
});