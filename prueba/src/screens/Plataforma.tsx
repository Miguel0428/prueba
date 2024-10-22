import React, { useCallback, useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import { deletePlatform, editPlatform, getAllPlataformas, submitPlatform } from "../supabase/plataforma/Api-plataforma";
import { CardComponent } from '../Components/CardComponent';
import Icon from 'react-native-vector-icons/Ionicons';

interface PlataformaItem {
    id: number;
    Nombre: string;
}

const Plataforma = () => {
    const [newPlatform, setNewPlatform] = useState<string>("");
    const [plataformas, setPlataformas] = useState<PlataformaItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchPlataformas = useCallback(async () => {
        try {
            setIsLoading(true);
            const plataformasData = await getAllPlataformas();
            setPlataformas(plataformasData);
        } catch (error) {
            console.error("Error al obtener plataformas:", error);
            Alert.alert("Error", "No se pudieron cargar las plataformas. Por favor, intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPlataformas();
    }, [fetchPlataformas]);

    const handleEditNewPlatform = useCallback(async (id: number, newName: string) => {
        try {
            await editPlatform(id, newName);
            await fetchPlataformas();
        } catch (error) {
            console.error("Error al editar la plataforma:", error);
            Alert.alert("Error", "No se pudo editar la plataforma. Por favor, intenta de nuevo.");
        }
    }, [fetchPlataformas]);

    const handleDeletePlatform = useCallback(async (id: number) => {
        try {
            await deletePlatform(id);
            await fetchPlataformas();
        } catch (error) {
            console.error("Error al eliminar la plataforma:", error);
            Alert.alert("Error", "No se pudo eliminar la plataforma. Por favor, intenta de nuevo.");
        }
    }, [fetchPlataformas]);

    const handleSubmit = useCallback(async () => {
        if (newPlatform.trim() === "") {
            Alert.alert("Error", "El nombre de la plataforma no puede estar vacío");
            return;
        }

        try {
            await submitPlatform(newPlatform);
            await fetchPlataformas();
            setNewPlatform("");
        } catch (error) {
            console.error("Error al enviar la plataforma:", error);
            Alert.alert("Error", "No se pudo añadir la plataforma. Por favor, intenta de nuevo.");
        }
    }, [newPlatform, fetchPlataformas]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>¡Descubre tu próxima serie!</Text>
                <Text style={styles.description}>
                    Explora un vasto catálogo de plataformas de streaming con miles de series para elegir.
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.infoText}>¡Ingresa tu propia plataforma!</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Agregar plataforma de series"
                        placeholderTextColor="#b0bec5"
                        value={newPlatform}
                        onChangeText={setNewPlatform}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                        <Icon name="add-circle-outline" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.h3Text}>Plataformas Disponibles</Text>

            {isLoading ? (
                <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
            ) : (
                plataformas.map((item) => (
                    <CardComponent
                        key={item.id}
                        item={item}
                        onDelete={handleDeletePlatform}
                        editFunction={handleEditNewPlatform}
                    />
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#ffffff',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#b0bec5',
        paddingHorizontal: 20,
    },
    h3Text: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#ffffff',
    },
    inputContainer: {
        marginVertical: 30,
        width: '100%',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 18,
        marginBottom: 15,
        color: '#ffffff',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#3498db',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 10,
        marginLeft: 10,
    },
    loader: {
        marginTop: 20,
    },
});

export default Plataforma;