import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StatusBar, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getGeneros, getSeries} from "../supabase/series/ApiSeries";


const HomeScreen= () => {

    const [series, setSeries] = useState([])
    const [generos, setGeneros] = useState([])


    useEffect(() => {
        getSeries().then(data=> {
            console.log(data)
            setSeries(data)
        })
    }, []);

    useEffect(() => {
        getGeneros().then(data => {
            console.log(data)
            setGeneros(data)
        })
    }, [])

    const images = {
        'Proximamente': require('../assets/Próximamente.png'),
        'matrix': require('../assets/matrix.png'),
        'el_proyecto_de_la_bruja_de_blair': require('../assets/el_proyecto_de_la_bruja_de_blair.png')

    };

    const renderListByGenero = (generoId:string) => {
        const seriesFiltradas = series.filter((serie) => {
            return serie.id_genero.toString() === generoId.toString()
        });


        return (
            <FlatList
                data={seriesFiltradas}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.seriesItem}>
                        <ImageBackground
                            source={images[item.titulo.toLowerCase().replace(/ /g, '_')] || images.Proximamente}
                            style={styles.seriesImage}
                            imageStyle={{ borderRadius: 10 }}
                        >
                            <View  style={styles.seriesGradient} >
                                <Text style={styles.seriesTitle}>{item.titulo}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            />
        )
    }

    return (
        <ScrollView style={styles.container}>
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

            <Text style={styles.sectionTitle}>Peliculas populares</Text>

            {generos.length > 0 ? (
                generos.map((genero) => (
                    <View key={genero.id}>
                    <Text key={genero.id} style={styles.titleMovie}>{genero.nombre}</Text>
                        {renderListByGenero(genero.id)}
                    </View>
                ))
            ) : (
                <Text>Cargando...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a2e',
    },
    titleMovie:{
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
});

export default HomeScreen;