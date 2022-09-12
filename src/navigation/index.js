import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useTheme } from 'react-native-paper';

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SignInScreen from "../screens/SigninScreen/SignInScreen";
import ResultScreen from "../screens/Home/ResultScreen/ResultScreen";
import IncidentScreen from "../screens/Home/IncidentScreen/index";
import EventsScreen from "../screens/Home/EventsScreen/index";
import CreateIncidentScreen from "../screens/Home/IncidentScreen/CreateIncidentScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    
    // const theme = useTheme();
    // const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Signin" component={SignInScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Result" component={ResultScreen} />
                <Stack.Screen name="Incident" component={IncidentScreen} />
                <Stack.Screen name="create-incident" component={CreateIncidentScreen} />
                <Stack.Screen name="Events" component={EventsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;