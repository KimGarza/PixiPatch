import { StyleSheet, TouchableOpacity, View, } from "react-native";
import { useRouter } from "expo-router";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import SpeechBubble from "../utils/speechBubble";
import { useItemCtx } from "@/src/hooks/contexts/useItemCtx";
import GlobalTheme from "@/src/components/global/GlobalTheme";

const { colors } = GlobalTheme();
// Little popup toolbox for editing options on a specific image
// some props drilling here, passing up tool name to activate elsewhere since it doesnt make good sense to activate viewModifyImage here
export const viewModifyImageToolbox = () => {

    const { createItems, updatePendingChanges } = useItemCtx();
    const router = useRouter();
    const { activeItemCtx } = useItemCtx();

    const handlePencilPress = () => {

        router.push({ pathname: '/(screens)/modifyImage', params: { image: JSON.stringify(activeItemCtx) }})
        updatePendingChanges()
    }

    return (
        <View style={styles.editingTools}>
            <SpeechBubble>
                <TouchableOpacity onPress={() => handlePencilPress()}>
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
       borderWidth: 1, borderColor: colors.Twilight, borderRadius: 10,
      },
});