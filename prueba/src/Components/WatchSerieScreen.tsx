import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from "../supabase/auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import {addSerieToUser} from "../supabase/usuario/ApiUsuario";
import {addCritica, addCriticaInSerie} from "../supabase/series/ApiSeries";

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
    genero: Genero
    description: string;
    created_at: string;
    id_critica: number | null;
    rating: number;
}

const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Icon
                key={i}
                name={i <= rating / 2 ? "star" : "star-outline"}
                size={20}
                color="#FFD700"
            />
        );
    }
    return <View style={styles.starContainer}>{stars}</View>;
};

interface Resena {
    nombre: string,
    comentario: string
}

const WatchSerieScreen = ({ data, onClose }: { data: SerieData; onClose: () => void }, { navigation }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { user } = useAuth();


    const addSerie = async () => {
        const response = await addSerieToUser(user.id, data.id);
        if (!response) throw new Error("Error al agregar la serie al usuario");
    };

    const addCommentToList = () => {
        if (comment.trim() !== '') {
            setComments([...comments, { text: comment, user: user.nombre }]);
            setComment('');
        }
    };


    const addResena = async () => {
        const resena: Resena = {
            nombre: user.nombre,
            comentario: comment
        };
        const puntuacion = 5;

        const responseResena = await addCritica(resena, puntuacion);
        if (responseResena){
            await addCriticaInSerie(responseResena.id, data.id)
        }
    };


    const handleUploadData = async () => {
        try {
            await addSerie();
            addCommentToList();
            await addResena();

            console.log("Datos cargados exitosamente");
        } catch (error) {
            console.error("Error en el proceso de carga de datos:", error.message);
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={true}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView style={styles.scrollView}>
                    <ImageBackground
                        source={images.Proximamente}
                        style={styles.seriesImage}
                    >
                        <View style={styles.overlay} />
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Icon name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                    </ImageBackground>

                    <View style={styles.contentContainer}>
                        <Text style={styles.seriesTitle}>{data.titulo}</Text>
                        <Text style={styles.seriesDescription}>{data.description}</Text>

                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Género: {data.genero.nombre}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.infoText}>Puntuación: </Text>
                                <StarRating rating={data.rating} />
                            </View>
                        </View>

                        <View style={styles.commentsSection}>
                            <Text style={styles.commentsSectionTitle}>Comentarios</Text>
                            {comments.map((comment, index) => (
                                <View key={index} style={styles.commentItem}>
                                    <Text style={styles.commentUser}>{comment.user}</Text>
                                    <Text style={styles.commentText}>{comment.text}</Text>
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
    seriesImage: {
        height: 200,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 10,
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
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starContainer: {
        flexDirection: 'row',
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        justifyContent: 'center',
    },
    commentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default WatchSerieScreen;