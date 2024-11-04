import React, {useEffect, useState} from 'react';
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

import {addUsuario, signIn} from "../supabase/usuario/ApiUsuario";
import Icon from 'react-native-vector-icons/Ionicons';

const ErrorMessage = ({ message, onHide }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onHide();
        }, 5000);

        return () => clearTimeout(timer);
    }, [message, onHide]);

    if (!message) return null;

    return (
        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{message}</Text>
        </View>
    );
};

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageError, setMessageError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegister = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await addUsuario(name, email, password, "user");
            if (response.toString().includes('duplicate')) {
                setMessageError('El correo ya existe, por favor pruebe con otro');
                return;
            }
            if (response.id !== null) {
                const responseLogin = await signIn(email, password);
                if (responseLogin.id !== null) {
                    setName('')
                    setEmail('')
                    setPassword('')
                    navigation.navigate('Home');
                }
            }
        } catch (error) {
            console.log(error.message);
            setMessageError('Ocurrió un error durante el registro');
        } finally {
            setIsSubmitting(false);
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
                <ErrorMessage
                    message={messageError}
                    onHide={() => setMessageError('')}
                />

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

                <TouchableOpacity
                    style={[styles.button, isSubmitting && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={isSubmitting}
                >
                    <Text style={styles.buttonText}>
                        {isSubmitting ? 'Registrando...' : 'Registrarse'}
                    </Text>
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
        backgroundColor: '#1e1e1e',
    },
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    form: {
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#555',
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
        color: '#007AFF',
        fontSize: 14,
    },
    errorContainer: {
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    errorText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default RegisterScreen;