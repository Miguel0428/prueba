import { supabase } from "./client";

export const fetchPosts = async () => {
    const { data, error } = await supabase.from("Plataforma").select("*").order('created_at',{ascending: false,});

    if (error) {
      console.log(error);
      return [];
    } else {
      return data;
    }
  };

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

export const deletePlatform = async (id) => {
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

  export type posts = Awaited<ReturnType<typeof fetchPosts>>;