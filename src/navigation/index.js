import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
// import { useTheme } from 'react-native-paper';

import EventsScreen from "../screens/Home/EventsScreen/index";
import TrackMaterialsMovement from "../screens/Home/EventsScreen/TrackMaterialsMovement";
import CreateIncidentScreen from "../screens/Home/IncidentScreen/CreateIncidentScreen";
import IncidentScreen from "../screens/Home/IncidentScreen/index";
import UpdateIncidentScreen from "../screens/Home/IncidentScreen/UpdateIncidentScreen";
import CreateResultScreen from "../screens/Home/ResultScreen/CreateResultScreen";
import ResultScreen from "../screens/Home/ResultScreen/index";
import UpdateResultScreen from "../screens/Home/ResultScreen/UpdateResultScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SignInScreen from "../screens/SigninScreen/SignInScreen";

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
                <Stack.Screen name="create-result" component={CreateResultScreen} />
                <Stack.Screen name="update-result" component={UpdateResultScreen} />
                <Stack.Screen name="Incident" component={IncidentScreen} />
                <Stack.Screen name="create-incident" component={CreateIncidentScreen} />
                <Stack.Screen name="update-incident" component={UpdateIncidentScreen} />
                <Stack.Screen name="Events" component={EventsScreen} />
                <Stack.Screen name="materials-movement" component={TrackMaterialsMovement} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;