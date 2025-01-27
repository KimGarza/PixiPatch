import Feather from '@expo/vector-icons/Feather';
import { StyleSheet } from 'react-native';


const Trashcan = () => {

    return (
        <Feather name='trash' size={35} style={styles.trash}/>
    )
}

const styles = StyleSheet.create({
    trash: {
        zIndex: 9999999,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 100, padding: 8,
        right: 15, top: 15
    }
})

export default Trashcan;