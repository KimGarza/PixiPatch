import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { useState } from "react";
import { useItemCtx } from "@/hooks/contexts/useItemCtx";

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
        <AntDesign name={'home'} size={30}/>
    </TouchableOpacity>
  );
}

export default HomeButton;

const styles = StyleSheet.create({
    homeIcon: {
      position: 'absolute',
      left: '4%',
      top: '50%',
      borderWidth: .5,
      borderColor: 'black',
      borderRadius: 20,
      padding: 2,
      transform: [{ translateY: -15 }],
      color: 'black',
      zIndex: 9999
    },
})