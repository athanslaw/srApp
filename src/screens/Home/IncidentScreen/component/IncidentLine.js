import React from 'react';
import CustomText from '../../../../components/CustomText/CustomText';
import { View, StyleSheet, Text } from "react-native";

const IncidentLine = ({incidents}) => {
    return (
        <>
        {incidents.map(incident=>
            <View key={incident.id} style={styles.padding}>
                <View style={styles.root}>
                    <CustomText value="Incident Type" bold="true" /><Text style={{ color: 'black' }}>:&nbsp;</Text>
                    <CustomText value={incident["Incident Type"]} />
                </View>
                
                <View style={styles.root}>
                    <CustomText value="Location" bold="true" /><Text style={{ color: 'black' }}>:&nbsp;</Text>
                    <CustomText value={incident["Location"]} />
                </View>
                <View style={styles.root}>
                    <CustomText value="Description" bold="true" /><Text style={{ color: 'black' }}>:&nbsp;</Text>
                    <CustomText value={incident["Description"]} />
                </View>
                <View style={styles.root}>
                    <CustomText value="Severity" bold="true" /><Text style={{ color: 'black' }}>:&nbsp;</Text>
                    <CustomText value={incident["Severity"]} />
                </View>
                <View style={styles.super}></View>
            </View>
        )}
        </>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    padding: {
        paddingTop: 10
    },
    super: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        marginTop: 10,
    }
})

export default IncidentLine;