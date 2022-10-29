import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, View } from "react-native";
//import BackgroundTracker from "../../../components/BackGroundTracker";
import EventButton from "../../../components/CustomButton/EventButton";
import CustomText from "../../../components/CustomText/CustomText";
import GetCurrentLocation from "../../../components/GetCurrentLocation";
import Header from "../../../components/Header";
import { MATERIALS_TRACKING } from "../../../utils/error-handlers/constants";
//import WatchPosition from "../../../components/WatchPosition";

const TrackMaterialsMovement = (props) => {
    
 
    const [showLocation, setShowLocation] = useState(false);
    let v = 5;
    const asyncStuff = AsyncStorage.getItem(MATERIALS_TRACKING).then((value)=> {
        if(v === 5 && value ==="1")
        {
            v = value;
            setShowLocation(value === "1")}
        });
        

    const [startWatching, setStartWatching] = useState(false);

    const navigation = useNavigation();
    const startTracking = () => {
        setShowLocation(true);
        AsyncStorage.setItem(MATERIALS_TRACKING, "1");
        Alert.alert("Development still in progress. This should trigger the tracking");
        //navigation.navigate('Incident');
        // trigger background location tracker
    }
    const stopTracking = () => {
        setShowLocation(false);
        Alert.alert("Development still in progress. This should stop the tracking");
        AsyncStorage.removeItem(MATERIALS_TRACKING);
        //navigation.navigate('Incident');
        //stop background location tracker
    }

    const back = () => {
        navigation.replace('Events');
    }
    
    return (
    <>
        {showLocation && <GetCurrentLocation />}
        
        <Header 
            title="TRACK MOVEMENT" 
            buttonTitle="<< Back >>" 
            onPress={back} />
        { !showLocation && <View style={{marginLeft:20, marginRight:20}}>
            <CustomText text='' size="30" />
            <EventButton text='START' onPress={startTracking} type="PRIMARY" />
        </View>}
        {/* <BackgroundTracker /> */}
        {/* { showLocation && <View style={{marginLeft:20, marginRight:20}}><WatchPosition /></View>} */}
        { showLocation && <View style={{marginLeft:20, marginRight:20}}>
            <CustomText text='' size="30" color={"red"} />
            <CustomText value='Tracking currently in progress' size="20" />
            <EventButton text='STOP' onPress={stopTracking} type="SECONDARY" />
        </View>}
    </>)
}
export default TrackMaterialsMovement;