import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";

const HomeButton = () => {
    
  const router = useRouter();

  return(
    <TouchableOpacity 
        onPress={() => router.push('/(screens)')}
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