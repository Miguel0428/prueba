import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import {addUsuario} from "../supabase/usuario/ApiUsuario";
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
    try {
        const response = await addUsuario(name, email, password);

        if (response){
            console.log(response)
        }

    }catch (error){
        console.log(error.message)
    }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.title}>SeriesApp</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Icon name="person-outline" size={20} color="#fff" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre completo"
                        placeholderTextColor="#a0a0a0"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="mail-outline" size={20} color="#fff" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#a0a0a0"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock-closed-outline" size={20} color="#fff" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#a0a0a0"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    form: {
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        marginBottom: 15,
    },
    inputIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
        paddingVertical: 10,
        paddingRight: 10,
    },
    button: {
        backgroundColor: '#e94560',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        color: '#fff',
        fontSize: 14,
    },
});

export default RegisterScreen;