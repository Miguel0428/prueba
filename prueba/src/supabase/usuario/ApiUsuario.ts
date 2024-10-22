import { supabase } from '../client';

interface usuario {
    id?: number;
    nombre: string;
    correo: string;
    password: string;
}

export const getUsuarios = async (): Promise<usuario[]> => {
    try {
        const { data, error } = await supabase
            .from('usuario')
            .select('nombre, correo, password');

        if (error) {
            throw new Error(error.message);
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching series:', error.message);
        return [];
    }
};

export const addUsuario = async (nombre: string, correo: string, password:string ) => {
    try {
        const { data, error } = await supabase
            .from('usuario')
            .insert([{ nombre, correo, password, }])
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return data[0] || null;

    }catch (error) {
        console.error('Error fetching series:', error.message);
        return [];
    }
}
