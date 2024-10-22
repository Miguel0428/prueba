import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from "expo-file-system"
import Icon from 'react-native-vector-icons/Ionicons';

const SaveLocalVideoScreen = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectVideo = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
            console.log('result', result)
            if (result && result.assets && result.assets.length > 0) {
                const selectedFile = result.assets[0];
                const videoFile = {
                    uri: selectedFile.uri,
                    name: selectedFile.name,
                    type: selectedFile.mimeType || selectedFile.file?.type,
                };
                setVideoFile(videoFile);
            } else {
                Alert.alert('Error', 'No se seleccionó ningún video.');
            }
        } catch (error) {
            console.error('Error selecting video:', error);
            Alert.alert('Error', 'No se pudo seleccionar el video. Por favor, intenta de nuevo.');
        }
    };

    const handleSave = async () => {
        if (!videoFile) {
            Alert.alert('Error', 'Por favor, selecciona un video primero.');
            return;
        }

        if (!title.trim()) {
            Alert.alert('Error', 'Por favor, ingresa un título para el video.');
            return;
        }

        setIsLoading(true);
        try {
            const fileName = `${Date.now()}_${videoFile.name}`;
            const destPath = `${FileSystem.documentDirectory}${fileName}`;

            await FileSystem.copyAsync({
                from: videoFile.uri,
                to: destPath,
            });

            Alert.alert('Éxito', 'El video se ha guardado localmente.');

            setVideoFile(null);
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
            <Text style={styles.title}>Guardar Video Local</Text>

            <TouchableOpacity style={styles.selectButton} onPress={handleSelectVideo}>
                <Icon name="cloud-upload-outline" size={24} color="#fff" />
                <Text style={styles.selectButtonText}>Seleccionar Video</Text>
            </TouchableOpacity>

            {videoFile && (
                <View style={styles.fileInfo}>
                    <Icon name="videocam-outline" size={20} color="#3498db" />
                    <Text style={styles.fileName}>{videoFile.name}</Text>
                </View>
            )}

            <TextInput
                style={styles.input}
                placeholder="Título del video"
                placeholderTextColor="#a0a0a0"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descripción del video"
                placeholderTextColor="#a0a0a0"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />

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
                        <Text style={styles.buttonText}>Guardar Información</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    selectButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    selectButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    fileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    fileName: {
        color: '#3498db',
        marginLeft: 10,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#1e1e1e',
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        color: '#ffffff',
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#27ae60',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#7f8c8d',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default SaveLocalVideoScreen;