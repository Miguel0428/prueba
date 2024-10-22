import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import RegisterScreen from "./src/screens/RegisterScreen";
import AgregarSerie from "./src/screens/AgregarSerie";
import Plataforma from "./src/screens/Plataforma";

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="HomeScreen">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Details" component={DetailsScreen} />
                <Drawer.Screen name="Login" component={Login}/>
                <Drawer.Screen name="Registro" component={RegisterScreen}/>
                <Drawer.Screen name="Series" component={AgregarSerie}/>
                <Drawer.Screen name="Plataformas" component={Plataforma}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}



