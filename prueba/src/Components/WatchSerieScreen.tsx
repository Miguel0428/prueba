import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

const images = {
    'Proximamente': require('../assets/Próximamente.png'),
    'matrix': require('../assets/matrix.png'),
    'el_proyecto_de_la_bruja_de_blair': require('../assets/el_proyecto_de_la_bruja_de_blair.png')
};

const WatchSerieScreen = ({ data, onClose }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const addComment = () => {
        if (comment.trim() !== '') {
            setComments([...comments, comment]);
            setComment('');
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
                        source={images[data.image] || images.Proximamente}
                        style={styles.seriesImage}
                    >
                        <View style={styles.overlay} />
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                    </ImageBackground>

                    <View style={styles.contentContainer}>
                        <Text style={styles.seriesTitle}>{data.titulo}</Text>
                        <Text style={styles.seriesDescription}>{data.description}</Text>

                        <View style={styles.infoContainer}>
                            <Text style={styles.infoText}>Género: {data.genre}</Text>
                            <Text style={styles.infoText}>Puntuación: {data.rating}/10</Text>
                        </View>

                        <View style={styles.commentsSection}>
                            <Text style={styles.commentsSectionTitle}>Comentarios</Text>
                            {comments.map((comment, index) => (
                                <View key={index} style={styles.commentItem}>
                                    <Text style={styles.commentText}>{comment}</Text>
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
                    <TouchableOpacity style={styles.commentButton} onPress={addComment}>
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
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    scrollView: {
        flex: 1,
    },
    seriesImage: {
        width: '100%',
        height: 300,
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
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        padding: 20,
    },
    seriesTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    seriesDescription: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoText: {
        color: '#fff',
        fontSize: 14,
    },
    commentsSection: {
        marginTop: 20,
    },
    commentsSectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentItem: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    commentText: {
        color: '#fff',
    },
    commentInputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    commentInput: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#fff',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    commentButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    commentButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default WatchSerieScreen;