import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import EventButton from "../../../components/CustomButton/EventButton";
import CustomText from "../../../components/CustomText/CustomText";
import Header from "../../../components/Header";

const EventsScreen = (props) => {
    const navigation = useNavigation();
    const materialsMovement = () => {
        navigation.replace('materials-movement');
    }

    const back = () => {
        navigation.replace('Home');
    }
    
    return (
    <>        
        <Header 
            title="EVENTS" 
            buttonTitle="<< Back >>" 
            onPress={back} />
        <View style={{marginLeft:20, marginRight:20}}>
            <CustomText text='' size="30" />
            <EventButton text='TRACK ELECTORAL MATERIALS MOVEMENT' onPress={materialsMovement} type="PRIMARY" />
        </View>
    </>)
}
export default EventsScreen;