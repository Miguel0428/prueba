import React, { useEffect, useState } from 'react';
import {
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getGeneros, getSeries } from "../supabase/series/ApiSeries";
import { RenderList } from "../Components/RenderList";
import Spinner from 'react-native-loading-spinner-overlay';
import { useAuth } from "../supabase/auth/AuthContext";

const HomeScreen = ({navigation}) => {
    const [series, setSeries] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [filteredSerie, setFilteredSerie] = useState("");
    const [seriesMostradas, setSeriesMostradas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);

    const { user, signOut } = useAuth();

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

    const handleFilteredData = (text: React.SetStateAction<string>) => {
        setFilteredSerie(text);

        if (text === "") {
            setSeriesMostradas(series);
        } else {
            const filteredSeries = series.filter(serie =>
                serie.titulo.toLowerCase().includes(text.toString().toLowerCase())
            );
            setSeriesMostradas(filteredSeries);
        }
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const navigateToLogin = () => {
        setMenuVisible(false);
        navigation.navigate('Iniciar Sesion');
    };

    const handleLogout = async () => {
        setMenuVisible(false);
        await signOut();
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Spinner
                visible={isLoading}
                textContent={'Cargando...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.header}>
                <Text style={styles.title}>SeriesApp</Text>
                <View style={styles.userContainer}>
                    {user && <Text style={styles.userName}>{user.nombre}</Text>}
                    <TouchableOpacity onPress={toggleMenu}>
                        <Icon name="person-circle-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

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
                                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
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

            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#fff" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar series..."
                    placeholderTextColor="#a0a0a0"
                    value={filteredSerie}
                    onChangeText={handleFilteredData}
                />
            </View>

            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>Películas populares</Text>

                {!isLoading && generos.length > 0 ? (
                    generos.map((genero) => (
                        <View key={genero.id}>
                            <Text style={styles.genreTitle}>{genero.nombre}</Text>
                            <RenderList series={seriesMostradas} generoId={genero.id} />
                        </View>
                    ))
                ) : null}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#1e1e1e',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        color: '#fff',
        marginRight: 10,
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 20,
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
    content: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    genreTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
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
        backgroundColor: '#2e2e2e',
        padding: 10,
        borderRadius: 5,
        marginTop: 80,
        marginRight: 20,
        minWidth: 150,
    },
    menuText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },
    menuItem: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#3e3e3e',
    },
    menuItemText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default HomeScreen;