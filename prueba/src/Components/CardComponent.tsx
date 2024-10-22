import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CardComponentProps {
    item: {
        id: number;
        Nombre: string;
    };
    onDelete: (id: number) => Promise<void>;
    editFunction: (id: number, newName: string) => Promise<void>;
}

export const CardComponent: React.FC<CardComponentProps> = ({ item, onDelete, editFunction }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showEditInput, setShowEditInput] = useState(false);
    const [editedValue, setEditedValue] = useState(item.Nombre);
    const [isEditing, setIsEditing] = useState(false);

    const scaleAnim = useState(new Animated.Value(1))[0];

    const handleLongPress = () => {
        setShowOptions(!showOptions);
        Animated.spring(scaleAnim, {
            toValue: showOptions ? 1 : 1.05,
            useNativeDriver: true,
        }).start();
    };

    const handleEditToggle = () => {
        setShowEditInput(!showEditInput);
        setShowOptions(false);
    };

    const editPlataforma = async (id: number) => {
        if (editedValue.trim() === '') {
            Alert.alert('Error', 'El nombre de la plataforma no puede estar vacío');
            return;
        }
        setIsEditing(true);
        try {
            await editFunction(id, editedValue);
            setShowEditInput(false);
            Alert.alert('Éxito', 'La plataforma se ha actualizado correctamente');
        } catch (e) {
            console.log(e.message);
            Alert.alert('Error', 'No se pudo actualizar la plataforma. Por favor, intenta de nuevo.');
        } finally {
            setIsEditing(false);
        }
    };

    const handleDelete = async (id: number) => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Estás seguro de que quieres eliminar esta plataforma?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await onDelete(id);
                            Alert.alert('Éxito', 'La plataforma se ha eliminado correctamente');
                        } catch (e) {
                            console.log(e.message);
                            Alert.alert('Error', 'No se pudo eliminar la plataforma. Por favor, intenta de nuevo.');
                        }
                    }
                },
            ]
        );
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
            <Pressable onLongPress={handleLongPress} delayLongPress={300}>
                <Text style={styles.title}>{item.Nombre}</Text>

                {showOptions && (
                    <View style={styles.optionsContainer}>
                        <Pressable onPress={handleEditToggle} style={styles.actionButton}>
                            <Icon name="pencil" size={20} color="#ffffff" />
                            <Text style={styles.buttonText}>Editar</Text>
                        </Pressable>
                        <Pressable onPress={() => handleDelete(item.id)} style={[styles.actionButton, styles.deleteButton]}>
                            <Icon name="trash" size={20} color="#ffffff" />
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </Pressable>
                    </View>
                )}
            </Pressable>

            {showEditInput && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Editar nombre de la plataforma"
                        placeholderTextColor="#a0a0a0"
                        value={editedValue}
                        onChangeText={setEditedValue}
                    />
                    <Pressable
                        style={[styles.saveButton, isEditing && styles.disabledButton]}
                        onPress={() => editPlataforma(item.id)}
                        disabled={isEditing}
                    >
                        {isEditing ? (
                            <Text style={styles.buttonText}>Actualizando...</Text>
                        ) : (
                            <>
                                <Icon name="checkmark" size={20} color="#ffffff" />
                                <Text style={styles.buttonText}>Guardar</Text>
                            </>
                        )}
                    </Pressable>
                </View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.5,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#3498db',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: '#1981c3',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#c0392b',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 5,
    },
    inputContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#3498db',
        padding: 10,
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#2c3e50',
        color: '#ffffff',
    },
    saveButton: {
        backgroundColor: '#27ae60',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: '#7f8c8d',
    },
});