import {createClient} from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl = Constants?.expoConfig?.extra?.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = Constants?.expoConfig?.extra?.REACT_APP_SUPABASE_ANNON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);