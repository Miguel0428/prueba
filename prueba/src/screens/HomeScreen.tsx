import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getGeneros, getSeries} from "../supabase/series/ApiSeries";
import {RenderList} from "../Components/RenderList";
import Spinner from 'react-native-loading-spinner-overlay';
import {useAuth} from "../supabase/auth/AuthContext";
import {useNavigation} from "@react-navigation/native";


const HomeScreen = () => {

    const [series, setSeries] = useState([])
    const [generos, setGeneros] = useState([])
    const [fileteredSerie, setFilteredSerie] = useState("")
    const [seriesMostradas, setSeriesMostradas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();

    const {user} = useAuth();

    useEffect(() => {
        Promise.all([getSeries(), getGeneros()])
            .then(([seriesData, generosData]) => {
                setSeries(seriesData);
                setSeriesMostradas(seriesData);
                setGeneros(generosData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, []);

    const handleFilteredData = (text) => {
        setFilteredSerie(text);

        if (text === "") {
            setSeriesMostradas(series);
        } else {
            const filteredSeries = series.filter(serie =>
                serie.titulo.toLowerCase().includes(text.toLowerCase())
            );
            setSeriesMostradas(filteredSeries);
        }
        console.log('Filtradas', seriesMostradas);
    };
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const navigateToLogin = () => {
        setMenuVisible(false);
    };

    const navigateToLogout = () => {
        setMenuVisible(false);
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <Spinner
                visible={isLoading}
                textContent={'Cargando...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <Text style={styles.title}>SeriesApp</Text>
                <TouchableOpacity onPress={toggleMenu}>
                    <Text>{user ? `Bienvenido ${user.nombre}` : ''}</Text>
                    <Icon name="person-circle-outline" size={30} color="#fff" />
                </TouchableOpacity>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={menuVisible}
                    onRequestClose={toggleMenu}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={toggleMenu}
                    >
                        <View style={styles.menuContainer}>
                            {user ? (
                                <>
                                    <Text style={styles.menuText}>Bienvenido, {user.nombre}</Text>
                                    <TouchableOpacity style={styles.menuItem} onPress={navigateToLogout}>
                                        <Text style={styles.menuItemText}>Cerrar sesión</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <TouchableOpacity style={styles.menuItem} onPress={navigateToLogin}>
                                    <Text style={styles.menuItemText}>Iniciar sesión</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>

            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#fff" style={styles.searchIcon}/>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar series..."
                    placeholderTextColor="#a0a0a0"
                    value={fileteredSerie}
                    onChangeText={handleFilteredData}
                />
            </View>

            <Text style={styles.sectionTitle}>Peliculas populares</Text>

            {!isLoading && generos.length > 0 ? (
                generos.map((genero) => (
                    <View key={genero.id}>
                        <Text style={styles.titleMovie}>{genero.nombre}</Text>
                        <RenderList series={seriesMostradas} generoId={genero.id}/>
                    </View>
                ))
            ) : null}


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a2e',
    },
    titleMovie: {
        color: '#FFFFFF',
        fontSize: 26
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
        width: 250,
        height: 170,
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
    spinnerTextStyle: {
        color: '#FFF'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    menuContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginTop: 50,
        marginRight: 10,
        minWidth: 150,
    },
    menuText: {
        fontSize: 16,
        marginBottom: 10,
    },
    menuItem: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    menuItemText: {
        fontSize: 16,
    },
});

export default HomeScreen;