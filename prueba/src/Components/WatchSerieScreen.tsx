import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from "../supabase/auth/AuthContext";
import { addSerieToUser } from "../supabase/usuario/ApiUsuario";
import { addCritica, getCommentsBySerieId } from "../supabase/series/ApiSeries";
import { Picker } from "@react-native-picker/picker";

const images = {
    'Proximamente': require('../assets/Próximamente.png'),
    'matrix': require('../assets/matrix.png'),
    'el_proyecto_de_la_bruja_de_blair': require('../assets/el_proyecto_de_la_bruja_de_blair.png')
};

interface Genero {
    id: number;
    nombre: string;
}

interface SerieData {
    id: number;
    id_genero: number;
    titulo: string;
    genero: Genero,
    critica: string;
    description: string;
    created_at: string;
    id_critica: number | null;
    rating: number;
}

const WatchSerieScreen = ({ data, onClose }: { data: SerieData; onClose: () => void }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<{ nombre: string; comentario: string }[]>([]);
    const [puntuacion, setPuntuacion] = useState(0);
    const [puntuacionSelected, setPuntuacionSelected] = useState<number>(0);

    const { user } = useAuth();

    useEffect(() => {
        const fetchComments = async () => {
            const comentarios = await getCommentsBySerieId(data.id);
            const fetchedComments = comentarios.map(comment => ({
                nombre: comment.resena.nombre,
                comentario: comment.resena.comentario,
            }));

            const totalPuntuacion = comentarios.reduce((sum, comentario) => {
                return sum + parseInt(comentario.puntuacion, 10);
            }, 0);

            const puntuacionMedia = comentarios.length > 0 ? totalPuntuacion / comentarios.length : 0;
            setPuntuacion(puntuacionMedia);
            setComments(fetchedComments);
        };

        fetchComments();
    }, [data.id]);

    const addSerie = async () => {
        const response = await addSerieToUser(user.id, data.id);
        if (!response) throw new Error("Error al agregar la serie al usuario");
    };

    const addCommentToList = () => {
        if (comment.trim() !== '') {
            setComments([...comments, { nombre: user.nombre, comentario: comment }]);
            setComment('');
        }
    };

    const addResena = async () => {
        const resena = { nombre: user.nombre, comentario: comment };
        await addCritica(resena, puntuacionSelected, data.id);
    };

    const handleUploadData = async () => {
        try {
            await addSerie();
            addCommentToList();
            await addResena();
        } catch (error) {
            console.error("Error en el proceso de carga de datos:", error.message);
        }
    };

    return (
        <Modal transparent={true} animationType="slide" visible={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView style={styles.scrollView}>
                    <View style={styles.imageContainer}>
                        <ImageBackground
                            source={images[data.titulo.toLowerCase().replace(/\s+/g, '_')] || images.Proximamente}
                            style={styles.seriesImage}
                            imageStyle={styles.imageStyle}
                            resizeMode="cover"
                        >
                            <View style={styles.overlay} />
                        </ImageBackground>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Icon name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.seriesTitle}>{data.titulo}</Text>
                        <Text style={styles.seriesDescription}>{data.description}</Text>

                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Género: {data.genero?.nombre}</Text>
                            <Text style={styles.infoText}>
                                Puntuación: {puntuacion > 0 ? puntuacion : "Aún no hay calificaciones"}
                            </Text>
                        </View>

                        <View style={styles.ratingPickerContainer}>
                            <Text style={styles.label}>Tu puntuación:</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={puntuacionSelected}
                                onValueChange={(itemValue) => setPuntuacionSelected(itemValue)}
                            >
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Picker.Item key={value} label={value.toString()} value={value} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.commentsSection}>
                            <Text style={styles.commentsSectionTitle}>Comentarios</Text>
                            {comments.map((comment, index) => (
                                <View key={index} style={styles.commentItem}>
                                    <Text style={styles.commentUser}>{comment.nombre}</Text>
                                    <Text style={styles.commentText}>{comment.comentario}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.commentInputContainer}>
                    <TextInput
                        style={styles.commentInput}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Escribe un comentario..."
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.commentButton} onPress={handleUploadData}>
                        <Text style={styles.commentButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        height: 200,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    seriesImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: '50%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#fff',
    },
    ratingPickerContainer: {
        marginBottom: 20,
    },
    picker: {
        height: 35,
        width: 100,
        color: '#fff',
        backgroundColor: '#2e2e2e',
        borderRadius: 8,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    contentContainer: {
        padding: 20,
    },
    seriesTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    seriesDescription: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    commentsSection: {
        marginTop: 20,
    },
    commentsSectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    commentItem: {
        backgroundColor: '#2e2e2e',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    commentUser: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 5,
    },
    commentText: {
        fontSize: 14,
        color: '#fff',
    },
    commentInputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#2e2e2e',
    },
    commentInput: {
        flex: 1,
        height: 40,
        backgroundColor: '#3e3e3e',
        borderRadius: 20,
        paddingHorizontal: 15,
        color: '#fff',
        marginRight: 10,
    },
    commentButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default WatchSerieScreen;
