import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import Login from "./src/screens/Login";
import RegisterScreen from "./src/screens/RegisterScreen";
import AgregarSerie from "./src/screens/AgregarSerie";
import Plataforma from "./src/screens/Plataforma";
import WatchSerieScreen from "./src/Components/WatchSerieScreen";
import { AuthProvider, useAuth } from "./src/supabase/auth/AuthContext";

function AppNavigator() {
    const { user } = useAuth();

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            {!user && <Drawer.Screen name="Iniciar Sesion" component={Login} />}
            {!user && <Drawer.Screen name="Registro" component={RegisterScreen} />}
            {user && user.role === 'admin' && <Drawer.Screen name="serie" component={AgregarSerie} />}
            {user && user.role === 'admin' && <Drawer.Screen name="plataforma" component={Plataforma} />}
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}
