// import { supabase } from '../client';
//
// interface Serie {
//     id?: number;
//     titulo: string;
//     url_video: string;
//     id_genero: number;
//     id_critica: number;
// }
//
// export const getSeries = async (): Promise<Serie[]> => {
//     try {
//         const { data, error } = await supabase
//             .from('Series')
//             .select('*');
//
//         if (error) {
//             throw new Error(error.message);
//         }
//
//         return data || [];
//     } catch (error) {
//         console.error('Error fetching series:', error.message);
//         return [];
//     }
// };
//
// export const addSeries = async (titulo: string, url_video: string, description: string): Promise<Serie> => {
//     try {
//         const { data, error } = await supabase
//             .from('Series')
//             .insert([{ titulo, url_video, description}])
//             .select();
//
//         if (error) {
//             throw new Error(error.message);
//         }
//
//         return data[0];
//     } catch (error) {
//         console.error('Error adding series:', error.message);
//         throw error;
//     }
// };
//
// export const uploadVideoToSupabase = async (file) => {
//     const fileName = `public/${Date.now()}_${file.name}`;
//
//     const { data: uploadData, error: uploadError } = await supabase.storage
//         .from('videos')
//         .upload(fileName, file);
//
//     if (uploadError) {
//         throw uploadError; // Lanza un error si la subida falla
//     }
//
//     const { data} = supabase.storage
//         .from('videos')
//         .getPublicUrl(fileName);
//
//     console.log('data', data)
//
//
//     return data.publicUrl; // Devuelve la URL pública
// };