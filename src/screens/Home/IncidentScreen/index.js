import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from "react-native";
import { connect } from 'react-redux';
import Header from "../../../components/Header";
import { apiRequest } from '../../../lib/api';
import { incidentsBase } from '../../../lib/url';
import IncidentLine from './component/IncidentLine';

const IncidentScreen = (props) => {
    const navigation = useNavigation();
    
    const [isLoading, setIsLoading] = useState(false);
    const [currentIncidents, setCurrentIncidents] = useState([]);
    const fetchIncidents = () => {
        setIsLoading(true);
        const url = `${incidentsBase}/ward/${props.user.wardId}`;
          apiRequest(props.user.token, url, 'get')
              .then((res) => {              
                  console.log(url,{res})
                    setCurrentIncidents(res.incidents);
                    setIsLoading(false);
              })
              .catch((err) => {
                console.log(err)
                console.log("Failed: "+ err.statusMessage);
                  setIsLoading(false);
              });
  
      }

      const showConfirmDialog = (item) => {
        return Alert.alert(
          "Delete Prompt",
          "Are you sure you want to delete the selected result?",
          [
            {
              text: "Yes",
              onPress: () => {
                onDelete(item);
              },
            },
            {
              text: "No",
            },
          ]
        );
      };

    const onDelete = (item) => {
        setIsLoading(true);
            apiRequest(props.user.token, `${incidentsBase}/delete/${item.id}`, 'delete')
            .then((res)=>{
              fetchIncidents();
            })
            .catch((err) => {
                setIsLoading(false);
                Alert.alert("Failed: "+err)
            });
    }

    const addIncident = () => {
        navigation.replace('create-incident');
    }


    useEffect(()=>fetchIncidents(),[]);

    return (
        <>
        <Header 
            title="INCIDENTS" 
            buttonTitle="Add Incident" 
            onPress={addIncident} 
            />
            
        <View style={{marginLeft:20, marginRight:20}}>
            <IncidentLine loading={isLoading} incidents={currentIncidents} onDelete={showConfirmDialog} />
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

const mapStateToProps = ( state ) => {
    return { user : state.user.user }
  }
  
export default connect(mapStateToProps)(IncidentScreen);