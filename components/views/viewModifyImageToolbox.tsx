import StyledIconContainer from "../utils/styledIconContainer";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router";
import Tool from "../modifyImage/tool";

interface ImageInfo {
    uri: string;
    width: number;
    height: number;
    type: string | undefined;
  }
  interface ImageData {
    imageInfo: ImageInfo;
    top: number;
    left: number;
    width: number;
    height: number;
  }

  interface Props {
    image: ImageData
}

// Little popup toolbox for editing options on a specific image
const viewModifyImageToolbox = ({image}: Props) => {

    const router = useRouter();

    console.log("imae here ", JSON.stringify(image))

    
    return (
        <View style={styles.editingTools}>
            
            {/* each tool is essentially a button which routes to the modifyImage screen and passes through props a specific name such as 'crop' */}
            <StyledIconContainer dimensions={35}> 

                <Tool image={image} editToolName="crop">
                    <Feather name='crop' size={30}/>
                </Tool>

                <Tool image={image} editToolName="mirror">
                    <MaterialCommunityIcons name='mirror' size={30}/>
                </Tool>

                <Tool image={image} editToolName="filter">
                    <Feather name='filter' size={30}/>
                </Tool>

                <TouchableOpacity>
                    <MaterialCommunityIcons name='tune-variant' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity> 
                    <MaterialCommunityIcons name='checkerboard-remove' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity>
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