import { StyleSheet, Text, View } from 'react-native';
import React from "react";
const Directores = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Directores</Text>
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

export default Directores;
