import { StyleSheet, TouchableOpacity, View, } from "react-native";
import { useRouter } from "expo-router";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import SpeechBubble from "../utils/speechBubble";
import { useItemCtx } from "@/src/hooks/contexts/useItemCtx";

// Little popup toolbox for editing options on a specific image
// some props drilling here, passing up tool name to activate elsewhere since it doesnt make good sense to activate viewModifyImage here
export const viewModifyImageToolbox = () => {

    const router = useRouter();
    const { activeItemCtx } = useItemCtx();

    return (
        <View style={styles.editingTools}>
            <SpeechBubble>
                <TouchableOpacity onPress={() => router.push({ pathname: '/(screens)/modifyImage', params: { image: JSON.stringify(activeItemCtx) }})}>
                    <SimpleLineIcons name='pencil' size={35}/>
                </TouchableOpacity>
            </SpeechBubble>
        </View>
);
}

export default viewModifyImageToolbox;

const styles = StyleSheet.create({
    editingTools: {
        position: 'absolute',
       alignSelf: 'center',
       alignContent: 'center',
       borderWidth: 1, borderColor: '#cdb6da', borderRadius: 10,
      },
});