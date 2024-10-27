import { supabase } from '../client';
import Constants from "expo-constants";

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
    const { user, error }: any = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) console.error('Error al iniciar sesión:', error.message);
    else console.log('Usuario autenticado:', user);
};

// export const loginUser = async (email, password) => {
//     const response = await fetch('https://bdpiemftjbfrhtkqfdor.supabase.co/auth/v1/token', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'apikey': Constants?.expoConfig?.extra?.REACT_APP_SUPABASE_ANNON_KEY,
//         },
//         body: JSON.stringify({
//             email,
//             password,
//             grant_type: 'password',
//         }),
//     });

//     const data = await response.json();
//
//     if (data.error) {
//         console.error('Error al iniciar sesión:', data.error);
//     } else {
//         console.log('Usuario autenticado:', data);
//     }
// };

export const addUsuario = async (nombre: string, correo: string, password:string ) => {
    try {
        const { data, error } = await supabase
            .from('users')
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
