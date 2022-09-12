import React, {useState} from "react";
import { Text, View } from "react-native";
import IncidentForm from "./component/IncidentForm";



const CreateIncidentScreen = () => {
    const onSubmit = () => {
        console.warn("Here");
    }
    const formField = {
        party1:12,
        party2:22,
        party3:10,
        party4:12,
        party5:32,
        party1Label:"PDP",
        party2Label:"APC",
        party3Label:"LP",
        party4Label:"APGA",
        party5Label:"NNPP"
    }
    return <View><IncidentForm formField={formField} onPress={onSubmit} /></View>;
    
    
}

export default CreateIncidentScreen;