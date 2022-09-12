import React from "react";
import { View } from "react-native";
import CustomText from "../../../components/CustomText/CustomText";
import CustomButton from "../../../components/CustomButton/CustomButton";
import Header from "../../../components/Header";

const EventsScreen = (props) => {
    const trackElectoralMaterials = () => {
        console.log("Athanasius Events")
        //navigation.navigate('Incident');
    }
    const addEvent = () => {
        console.log("Athans Events")
        //navigation.navigate('Incident');
    }

    return (
    <>
        <Header title="EVENTS" onPress={addEvent} />
        <View style={{marginLeft:20, marginRight:20}}>
            <CustomText text='' size="30" />
            <CustomButton text='Track Election Materials Movement' onPress={trackElectoralMaterials} type="PRIMARY" />
            <CustomButton text='REPORT INCIDENTS' onPress={trackElectoralMaterials} type="PRIMARY" />
            <CustomButton text='SUBMIT RESULT' onPress={trackElectoralMaterials} type="PRIMARY" />
        </View>
    </>)
}
export default EventsScreen;