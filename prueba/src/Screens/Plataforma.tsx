import { FlatList } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { useState, useEffect } from "react";
import {supabase} from '../supabase/client'
import AddPostForm from "../Components/AddPostForm";
import { fetchPosts, posts } from "../supabase/api";

const Plataforma = () => {
    const [posts, setPosts] = useState([]);
    const [data, setData] = useState<posts>([])
    useEffect(() => {
        
        fetchPosts().then((data) =>setPosts(data))  ;
      }, []);

      const handleSubmit = async (Nombre:string) =>{
       const {data,error}= await supabase.from("Plataforma"). insert({Nombre}).select();
       if (error) {
        console.log(error);
       } else{
        setPosts([data[0],...posts]);
       }
      }

      console.log(posts);
    return (
        <View style={styles.container}>
            <AddPostForm onSubmit={handleSubmit}/>
            <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.Nombre}</Text>}
      />
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

export default Plataforma;
