import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { addSeries, getGeneros } from '../supabase/series/ApiSeries';
import { Picker } from '@react-native-picker/picker';

const SaveLocalVideoScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [genero, setGenero] = useState([]);
    const [generoSelected, setGeneroSelected] = useState(null);
    const [success, setSuccess] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        getGeneros()
            .then(data => {
                setGenero(data);
                if (data.length > 0) setGeneroSelected(data[0].id);
            });
    }, []);

    useEffect(() => {
        if (success) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => setSuccess(false));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success, fadeAnim]);

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Por favor, ingresa un título para el video.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await addSeries(title, description, generoSelected);
            console.log(response);
            setSuccess(true);
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

            <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
                <Icon name="checkmark-circle" size={24} color="#fff" />
                <Text style={styles.successText}>Serie guardada correctamente</Text>
            </Animated.View>

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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 30,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    successMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#27ae60',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    successText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: '#ffffff',
        fontSize: 18,
        marginBottom: 8,
        fontWeight: '600',
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
        height: 120,
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
        color: '#ffffff',
        height: 50,
    },
    saveButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        elevation: 3,
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