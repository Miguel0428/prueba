import {FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import WatchSerieScreen from "./WatchSerieScreen";
import {useState} from "react";

const images = {
    'Proximamente': require('../assets/Próximamente.png'),
    'matrix': require('../assets/matrix.png'),
    'el_proyecto_de_la_bruja_de_blair': require('../assets/el_proyecto_de_la_bruja_de_blair.png')

};

export const RenderList = ({series, generoId}) => {
    const [selectedSerieId, setSelectedSerieId] = useState(null);

    const handleShowFullScreen = (serieId) => {
        setSelectedSerieId(serieId);
    };

    const handleCloseFullScreen = () => {
        setSelectedSerieId(null);
    };

    if (selectedSerieId) {
        return <WatchSerieScreen data={selectedSerieId} onClose={handleCloseFullScreen} />;
    }


    const seriesFiltradas = series.filter((serie) => serie.id_genero.toString() === generoId.toString());

    return (
        <FlatList
            data={seriesFiltradas}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.seriesItem} onPress={() => handleShowFullScreen(item)}>
                    <ImageBackground
                        source={item.imageSource || images.Proximamente}
                        style={styles.seriesImage}
                        imageStyle={{ borderRadius: 10 }}
                    >
                        <View style={styles.seriesGradient}>
                            <Text style={styles.seriesTitle}>{item.titulo}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
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
})

export default  RenderList;