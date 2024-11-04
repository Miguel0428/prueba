import {supabase} from '../client';

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

interface Critica {
    id?: number,
    resena : Resena,
    puntuacion : number
}

interface Resena {
    nombre: string,
    comentario: string
}


export const getSeries = async (): Promise<Serie[]> => {
    try {
        const { data, error } = await supabase
            .from('Series')
            .select('*,genero:genero(nombre),critica:critica(resena,puntuacion)');

        if (error) {
            console.log(error.message)
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

export const addCritica = async (resena: Resena, puntuacion: number): Promise<Critica[]> => {
    try {
        const {data, error} = await supabase
            .from('critica')
            .insert([{ resena: resena, puntuacion: puntuacion }])
            .select()

        if (error) console.log(error)
        console.log('Critica', data)
        return data[0]

    }catch (e){
        console.log(e.message())
    }
}

export const addCriticaInSerie= async (idCritica: number, idSerie: number) => {
    try {
        const {error} = await supabase
            .from('Series')
            .update({id_critica : idCritica})
            .eq('id', idSerie)

        if (error) throw error;

        return true
    }catch (e){
        console.log(e.message())
    }
}