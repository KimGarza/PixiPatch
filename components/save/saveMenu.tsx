import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";

const SaveMenu = () => {

    return (
        <View style={styles.modalContainer}>
            <Text>Test</Text>
        </View>
    )
}

export default SaveMenu;

const styles = StyleSheet.create({
    modalContainer: {
        display: 'flex',
        borderLeftWidth: 1, borderBottomWidth: 1, borderTopWidth: 1,
        borderColor: 'black',
        backgroundColor: '#ffcab0',
        position: 'absolute',
        borderRadius: 15,
        height: 200,
        width: 120,
        zIndex: 9999,
        right: 0,
        top: 2,
    },
})