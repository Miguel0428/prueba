import { supabase } from '../client';
import {Alert} from "react-native";

interface Serie {
    id?: number;
    titulo: string;
    url_video: string;
    id_genero: number;
    id_critica: number;
}

interface Genero {
    id?: number,
    nombre: string
}

export const getSeries = async (): Promise<Serie[]> => {
    try {
        const { data, error } = await supabase
            .from('Series')
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching series:', error.message);
        return [];
    }
};

export const addSeries = async (titulo: string, description: string, id_genero:number ): Promise<Serie> => {
    try {
        const { data, error } = await supabase
            .from('Series')
            .insert([{ titulo, description, id_genero }])
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return data[0];
    } catch (error) {
        console.error('Error adding series:', error.message);
        throw error;
    }
};

// export const apiUploadFile = async (file: any) => {
//     const response = await fetch('http://localhost:3000/upload', {
//         method: 'POST',
//         body: file
//     })
//
//     const data = await response.json()
//
//     if (response.ok){
//         Alert.alert('Éxito', `El video se ha guardado en la ruta: ${data.filePath}`);
//     }else{
//         throw new Error(data.message || 'Error al subir el video.');
//     }
// }

export const getGeneros = async (): Promise<Genero[]> => {
    try {
        const {data, error} = await supabase
            .from('genero')
            .select('*');

        if (error){
            throw new Error(error.message)
        }

        return data || []


    }catch (error){
        throw new Error(error.message())
    }
}