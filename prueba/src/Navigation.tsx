import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//screens
import Plataforma from "./Screens/Plataforma";
import Actores from "./Screens/Actores";
import Directores from "./Screens/Directores";
import Idiomas from "./Screens/Idioma";
/*import { PlatformPressable } from "@react-navigation/elements";
import {AntDesgin} from '@expo/vector-icons'*/


const Tab= createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name= "Plataforma" component={Plataforma} />
            <Tab.Screen name= "Actores" component={Actores} />
            <Tab.Screen name= "Directores" component={Directores} />
            <Tab.Screen name= "Idiomas" component={Idiomas} />
        </Tab.Navigator>
    );
}
export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );  
}