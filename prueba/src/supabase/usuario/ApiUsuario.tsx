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
            .from('users')
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

export const signIn = async (email:string, password:string) => {
    const { data, error } = await supabase
        .from('Usuarios')
        .select('id, nombre, correo, role')
        .eq('correo', email)
        .eq('password', password)
        .single();

    if (error || !data) {
        console.error('Credenciales inválidas:', error ? error.message : 'No se encontró usuario');
        return null;
    } else {
        console.log('Usuario autenticado:', data);
        return data;
    }
};

export const addUsuario = async (nombre: string, correo: string, password:string, role:string ) => {
    try {
        const { data, error } = await supabase
            .from('Usuarios')
            .insert([{ nombre, correo, password, role}])
            .select();

        if (error) {
            return error.message
        }

        return data[0] || null;

    }catch (error) {
        console.error('Error al registrar el usuario:', error.message);
        return [];
    }
}

export const addSerieToUser = async (idUser: number, idSerie: number) => {

    try {
        const {error} = await supabase
            .from('Usuarios')
            .update({id_serie:idSerie})
            .eq('id', idUser)

        if (error) console.log(error.message);

        return true
    }catch (e){
        console.log(e.message())
    }

}
