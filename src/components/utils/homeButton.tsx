import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { useState } from "react";
import { useItemCtx } from "@/src/hooks/contexts/useItemCtx";

const HomeButton = () => {

  const [disabled, setDisabled] = useState(false);
    
  const router = useRouter();
  const { updatePendingChanges } = useItemCtx();

  const goHome = () => {
    if (disabled) return; // prevent doubleclicks

    setDisabled(true);

    updatePendingChanges();
    router.push('/(screens)');

    setTimeout(() => {
      setDisabled(false); // Re-enable the button after 500ms (adjust as needed)
    }, 500);
  }

  return(
    <TouchableOpacity 
        onPress={goHome}
        style={styles.homeIcon} >
        <AntDesign name={'home'} size={35}/>
    </TouchableOpacity>
  );
}

export default HomeButton;

const styles = StyleSheet.create({
    homeIcon: {
      position: 'absolute',
      top: '0%',
      color: 'black',
      padding: 10,
      zIndex: 9999
    },
})