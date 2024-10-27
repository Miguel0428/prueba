import {FlatList, Text, ImageBackground, TouchableOpacity, View, StyleSheet} from "react-native";

export const RenderList = ({series, generoId}) => {
    const images = {
        'Proximamente': require('../assets/Próximamente.png'),
        'matrix': require('../assets/matrix.png'),
        'el_proyecto_de_la_bruja_de_blair': require('../assets/el_proyecto_de_la_bruja_de_blair.png')

    };

    const seriesFiltradas = series.filter((serie) => serie.id_genero.toString() === generoId.toString());

    return (
        <FlatList
            data={seriesFiltradas}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.seriesItem}>
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