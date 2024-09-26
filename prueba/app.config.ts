import * as dotenv from 'dotenv';
import { ExpoConfig,ConfigContext } from 'expo/config';

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        slug: 'App-series-desde-cero',
        name: 'App-series-desde-cero',
        extra: {
            ...config.extra,
            REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL,
            REACT_APP_SUPABASE_ANNON_KEY: process.env.REACT_APP_SUPABASE_ANNON_KEY,
        }
    }
}