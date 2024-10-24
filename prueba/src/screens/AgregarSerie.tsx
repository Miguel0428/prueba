import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { addSeries, getGeneros } from '../supabase/series/ApiSeries';
import { Picker } from '@react-native-picker/picker';

const SaveLocalVideoScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [genero, setGenero] = useState([]);
    const [generoSelected, setGeneroSelected] = useState(null);
    const [success, setSucces] = useState('')

    useEffect(() => {
        getGeneros()
            .then(data => {
                setGenero(data);
                if (data.length > 0) setGeneroSelected(data[0].id);
            });
    }, []);

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Por favor, ingresa un título para el video.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await addSeries(title, description, generoSelected);
            console.log(response);
            Alert.alert('Éxito', 'La serie se ha guardado correctamente.');
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error guardando el video:', error);
            Alert.alert('Error', 'No se pudo guardar el video. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.headerTitle}>Agregar Series</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título del video"
                    placeholderTextColor="#a0a0a0"
                    value={title}
                    onChangeText={setTitle}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Descripción del video"
                    placeholderTextColor="#a0a0a0"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Género</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        selectedValue={generoSelected}
                        onValueChange={(itemValue) => setGeneroSelected(itemValue)}
                    >
                        {genero.map((item) => (
                            <Picker.Item key={item.id} label={item.nombre} value={item.id} />
                        ))}
                    </Picker>
                </View>
            </View>

            <TouchableOpacity
                style={[styles.saveButton, isLoading && styles.disabledButton]}
                onPress={handleSave}
                disabled={isLoading}
            >
                {isLoading ? (
                    <Text style={styles.buttonText}>Guardando...</Text>
                ) : (
                    <>
                        <Icon name="save-outline" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Subir serie</Text>
                    </>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: '#ffffff',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 10,
        padding: 15,
        color: '#ffffff',
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 10,
        overflow: 'hidden',
    },
    picker: {
        color: '#1e1e1e',
        height: 50,
    },
    saveButton: {
        backgroundColor: '#27ae60',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#7f8c8d',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default SaveLocalVideoScreen;