import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from "react";
const Actores = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Actores</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: '20%',
    },
});

export default Actores;
