import {Animated, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {supabase} from '../supabase/client'
import {fetchPosts, getAllPlataformas, deletePlatform} from "../supabase/api";

const Plataforma = () => {
    const [posts, setPosts] = useState([]);
    const [newPlatform, setNewPlatform] = useState("");
    const [plataforma, setNewPlataforma] = useState([])


    const fetchPlataformas = async () => {
        const plataformasData = await getAllPlataformas();
        setNewPlataforma(plataformasData);
    };

    useEffect(() => {
        fetchPlataformas();
    }, []);


    useEffect(() => {
        fetchPosts().then((data) => setPosts(data));
    }, []);

    const handleDeletePlatform = async (id: number) => {
        await deletePlatform(id)
        fetchPlataformas()


    }

    const handleSubmit = async () => {
        if (newPlatform.trim() === "") {
            console.log("El nombre de la plataforma no puede estar vacío");
            return;
        }

        const { data, error } = await supabase.from("Plataforma").insert({ Nombre: newPlatform }).select();

        fetchPlataformas()

        if (error) {
            console.log(error);
        } else {
            setPosts([data[0], ...posts]);
            setNewPlatform("");
        }
    };
    const fadeAnim = React.useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Animated.View style={[styles.gradientBackground, { opacity: fadeAnim }]}>
                    <Text style={styles.title}>¡Descubre tu próxima serie!</Text>
                    <Text style={styles.description}>
                        Explora un vasto catálogo de plataformas de streaming con miles de series para elegir.
                    </Text>
                </Animated.View>
            </View>

            <View>
                <Text style={styles.h3Text}>Plataformas Disponibles</Text>
            </View>

            <FlatList
                data={plataforma}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText}>{item.Nombre}</Text>
                        <Pressable onPress={() => handleDeletePlatform(item.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Eliminar</Text>
                        </Pressable>
                    </View>
                )}
                style={{ height: '100%' }} // Ajusta la altura según tus necesidades
            />

            <View style={styles.inputContainer}>
                <Text style={styles.infoText}>¡Ingresa tu propia plataforma!</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Agregar plataforma de series"
                    value={newPlatform}
                    onChangeText={setNewPlatform}
                />
                <Pressable style={styles.pressable} onPress={handleSubmit}>
                    <Text style={styles.pressableText}>Añade Plataforma</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
    },
    h3Text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#2c3e50',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'center',
    },
    gradientBackground: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#2980b9',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#34495e',
    },
    inputContainer: {
        marginVertical: 20,
        width: '100%',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 20,
        marginBottom: 10,
        color: '#2980b9',
    },
    input: {
        borderWidth: 1,
        borderColor: '#2980b9',
        padding: 10,
        width: '80%',
        marginBottom: 10,
        borderRadius: 10,
    },
    pressable: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
        elevation: 5,
    },
    pressableText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deleteButton: {
        marginLeft: 10,
        backgroundColor: '#e74c3c',
        padding: 1,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    listItemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#34495e',
    },
});

export default Plataforma;
