import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useItemCtx } from "@/src/hooks/contexts/useItemCtx";
import GlobalTheme from "@/src/components/global/GlobalTheme";
import Ionicons from '@expo/vector-icons/Ionicons';

const { colors } = GlobalTheme();

const BackToEditorButton = () => {

  const [disabled, setDisabled] = useState(false);
    
  const router = useRouter();
  const { updatePendingChanges } = useItemCtx();

  const goHome = () => {
    if (disabled) return; // prevent doubleclicks

    setDisabled(true);

    updatePendingChanges();
    router.push('/(screens)/editor');

    setTimeout(() => {
      setDisabled(false); // Re-enable the button after 500ms (adjust as needed)
    }, 500);
  }

  return(
    <TouchableOpacity 
        onPress={goHome}
        style={styles.homeIcon} >
        <Ionicons name={'arrow-back-outline'} size={25} color={colors.Rust} />
    </TouchableOpacity>
  );
}

export default BackToEditorButton;

const styles = StyleSheet.create({
    homeIcon: {
      position: 'absolute',
      top: 0, left: 0,
      padding: 5, margin: 5,
      zIndex: 9999,
      display: 'flex', flexWrap: 'wrap', flexDirection: 'row',
      justifyContent: 'space-around', alignItems: 'center',
      borderWidth: 0, borderColor: colors.DarkClay, borderRadius: 10,
      backgroundColor: colors.Peach, color: 'black',
    },
})