import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import Login from "./src/screens/Login";
import RegisterScreen from "./src/screens/RegisterScreen";
import AgregarSerie from "./src/screens/AgregarSerie";
import Plataforma from "./src/screens/Plataforma";
import {AuthProvider, useAuth} from "./src/supabase/auth/AuthContext";

const Drawer = createDrawerNavigator();

function AppNavigator() {
    const { user } = useAuth();
    console.log(user)

    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            {!user && <Drawer.Screen name="Iniciar Sesion" component={Login} />}
            {!user && <Drawer.Screen name="Registro" component={RegisterScreen} />}
            {user && user.role === 'admin' && <Drawer.Screen name="serie" component={AgregarSerie} />}
            {user && user.role === 'admin' && <Drawer.Screen name="plataforma" component={Plataforma} />}
            {user && user.role === 'admin' && <Drawer.Screen name="Admin" component={DetailsScreen} />}

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



