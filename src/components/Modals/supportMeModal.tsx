import { Modal, Text, View, StyleSheet } from "react-native";

export const SupportMeModal = () => {

    return (
        <Modal>
            <View style={styles.container}>  
                <Text style={styles.close}>X</Text>
                <Text>THIS IS A TEST: SupportMeModal</Text>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        borderWidth: 3, borderColor: 'gray', borderRadius: 30,
        height: '80%', width: '80%',
        justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
    },
    close: {
        position: 'absolute',
        top: 20, right: 20,
        fontSize: 32, color: 'gray'
    }
})