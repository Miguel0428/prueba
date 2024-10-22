import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {deletePlatform, editPlatform, getAllPlataformas, submitPlatform} from "../supabase/plataforma/Api-plataforma";
import {CardComponent} from '../Components/CardComponent'

interface PlataformaItem {
    id: number;
    Nombre: string;
}

const Plataforma = () => {
    const [newPlatform, setNewPlatform] = useState<string>("");
    const [plataforma, setNewPlataforma] = useState<PlataformaItem[]>([]);

    const fetchPlataformas = async () => {
        try {
            const plataformasData = await getAllPlataformas();
            setNewPlataforma(plataformasData);
        } catch (error) {
            console.error("Error al obtener plataformas:", error);
        }
    };

    useEffect(() => {
        fetchPlataformas();
    }, []);


    const handleEditNewPlatform = useCallback(async (id: number, newName: string) => {
        try {
            await editPlatform(id, newName);
            await fetchPlataformas();
        } catch (error) {
            console.error("Error al editar la plataforma:", error);
        }
    }, []);

    const handleDeletePlatform = useCallback(async (id: number) => {
        try {
            await deletePlatform(id);
            await fetchPlataformas();
        } catch (error) {
            console.error("Error al eliminar la plataforma:", error);
        }
    }, []);

    const handleSubmit = useCallback(async () => {
        if (newPlatform.trim() === "") {
            console.log("El nombre de la plataforma no puede estar vacío");
            return;
        }

        try {
            await submitPlatform(newPlatform);
            await fetchPlataformas();
            setNewPlatform("");
        } catch (error) {
            console.error("Error al enviar la plataforma:", error);
        }
    }, [newPlatform]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>¡Descubre tu próxima serie!</Text>
                <Text style={styles.description}>
                    Explora un vasto catálogo de plataformas de streaming con miles de series para elegir.
                </Text>
            </View>

            <View>
                <Text style={styles.h3Text}>Plataformas Disponibles</Text>
            </View>

            {plataforma.map((item) => (
                <View key={item.id}>
                    <CardComponent
                        item={item}
                        onDelete={handleDeletePlatform}
                        editFunction={handleEditNewPlatform}
                    />
                </View>
            ))}

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
        backgroundColor: '#121212',
        paddingHorizontal: 20,
    },
    h3Text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
        color: '#ffffff',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'center',
    },

    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#ffffff',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#b0bec5',
    },
    inputContainer: {
        marginVertical: 20,
        width: '100%',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 20,
        marginBottom: 10,
        color: '#ffffff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#3498db',
        padding: 10,
        width: '80%',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
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
        backgroundColor: '#1e1e1e',
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
        color: '#ffffff',
    },
});
export default Plataforma;
