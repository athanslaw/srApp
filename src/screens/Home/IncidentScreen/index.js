import React from 'react';
import { View, StyleSheet, FlatList } from "react-native";
import CustomText from "../../../components/CustomText/CustomText";
import Header from "../../../components/Header";
import IncidentLine from './component/IncidentLine';
import { useNavigation } from '@react-navigation/native';

const IncidentScreen = (props) => {
    const navigation = useNavigation();
    
    const addIncident = () => {
        console.log("Athans Incidents")
        navigation.navigate('create-incident');
    }

    const incidents = [{
        'id': 1,
        'Incident Type': 'Ballot Box Snatching',
        'Location':'Deeper life',
        'Description':'It happened when the election just started',
        'Severity': 'Critical'
    },{
        'id': 2,
        'Incident Type': 'Delay of Electoral Materials',
        'Location':'Deeper life',
        'Description':'It happened when the election just started',
        'Severity': 'Critical'
    },
    {
        'id': 3,
        'Incident Type': 'Device not working',
        'Location':'Deeper life',
        'Description':'It happened when the election just started',
        'Severity': 'Critical'
    }
    ];
    return (
        <>
        <Header 
            title="INCIDENTS" 
            buttonTitle="Add Incident" 
            onPress={addIncident} 
            />
            
        <View style={{marginLeft:20, marginRight:20}}>
            <CustomText value='' size="30" />
            <View style={styles.super}></View>
            <IncidentLine incidents={incidents} />
        </View>
    </>)
}

const styles = StyleSheet.create({
    super: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
    }
})

export default IncidentScreen;