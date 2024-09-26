import { StyleSheet, Text, View, TextInput } from 'react-native'
import {useState} from 'react'
import Button from './Button'

interface Props {
    onSubmit: (Nombre:String)=>void;
}

export default function AddPostForm({onSubmit}:Props) {
    const [Nombre, setNombre] = useState("")
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={Nombre} onChangeText={setNombre}></TextInput>
      <Button onPress={()=>{
        onSubmit(Nombre);
        setNombre("");
      }}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        padding:16,
    },
    input:{
        borderColor:"black",
        borderWidth:1,
        padding:8,
    },
});