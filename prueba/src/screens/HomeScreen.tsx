import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DUMMY_DATA = [
    { id: '1', title: 'Stranger Things', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'The Witcher', image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Breaking Bad', image: 'https://via.placeholder.com/150' },
    { id: '4', title: 'The Mandalorian', image: 'https://via.placeholder.com/150' },
];

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.title}>SeriesApp</Text>
                <TouchableOpacity>
                    <Icon name="person-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar series..."
                    placeholderTextColor="#a0a0a0"
                />
            </View>

            <Text style={styles.sectionTitle}>Series Populares</Text>

            <FlatList
                data={DUMMY_DATA}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.seriesItem}>
                        <ImageBackground
                            source={{ uri: item.image }}
                            style={styles.seriesImage}
                            imageStyle={{ borderRadius: 10 }}
                        >
                            <View style={styles.seriesGradient}>
                                <Text style={styles.seriesTitle}>{item.title}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a2e',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: '#fff',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    seriesItem: {
        marginRight: 15,
    },
    seriesImage: {
        width: 150,
        height: 225,
        justifyContent: 'flex-end',
    },
    seriesGradient: {
        height: '50%',
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    seriesTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;