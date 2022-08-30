import React, {useState} from "react";
import { Text, View } from "react-native";
import ResultForm from "./component/ResultForm";



const CreateResultScreen = () => {
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
    return <View><ResultForm formField={formField} onPress={onSubmit} /></View>;
    
    
}

export default CreateResultScreen;