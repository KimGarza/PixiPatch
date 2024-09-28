import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Fontisto } from '@expo/vector-icons';

interface CloseButtonProps {
    menuToggle?: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ menuToggle }) => {
    
    const handleCloseMenu = () => {
        if (menuToggle) {menuToggle();}
    }

  return(
    <View style={styles.close}>
        <TouchableOpacity onPress={() => handleCloseMenu()}>
            <Fontisto name={'close'} size={25}/>
        </TouchableOpacity>
    </View>
  );
}

export default CloseButton;

const styles = StyleSheet.create({
    close: {
        position: 'absolute',
        right: '-1%',
        top: '-1%',
        zIndex: 99999 
    },
})