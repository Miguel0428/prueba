import { supabase } from "../client";

export const getAllPlataformas = async () => {
    try {
        const { data, error } = await supabase
            .from('Plataforma')
            .select('*');

        return data;
    } catch (error) {
        console.error('Error fetching plataformas:', error.message);
        return [];
    }
};

export const submitPlatform = async (newPlatform:string) => {
    try {
       return  await supabase.from("Plataforma").insert({ Nombre: newPlatform }).select();

    }catch (e){
        console.log(e.message)
    }
}
export const deletePlatform = async (id: number) => {
    try {
        const { data, error } = await supabase
            .from('Plataforma')
            .delete()
            .eq('id', id);

        if (error) throw error;

        console.log('Plataforma eliminada:', data);

    } catch (error) {
        console.error('Error al eliminar la plataforma:', error.message);
    }
};

export const editPlatform = async (id: number, newName: string) => {
    try {
        const { data, error } = await supabase
            .from('Plataforma')
            .update({ Nombre: newName })
            .eq('id', id);

        if (error) {
            console.error('Error al actualizar la plataforma:', error);
            return null;
        }

        console.log('Plataforma actualizada con éxito:', data);
        return data;
    } catch (error) {
        console.error('Error en la actualización:', error);
        return null;
    }
};

