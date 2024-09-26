import {StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'

interface ButtonProps{
    onPress: ()=>void;
}

const Button = ({onPress}:ButtonProps) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>Button</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    buttonContainer: {
        width:"50%",
        backgroundColor: '#1A202C',
        borderRadius:10,
        paddingVertical: 8,
        paddingHorizontal:16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color:"#FFFF",
        alignSelf:'center',
        textAlign: 'center',
    },
});

export default Button