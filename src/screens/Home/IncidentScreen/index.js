import React, { useEffect, useState} from 'react';
import { View, StyleSheet } from "react-native";
import Header from "../../../components/Header";
import IncidentLine from './component/IncidentLine';
import { useNavigation } from '@react-navigation/native';
import { apiRequest } from '../../../lib/api';
import { filterIncidents } from '../../../lib/url';
import { connect } from 'react-redux';

const IncidentScreen = (props) => {
    const navigation = useNavigation();
    
    const [isLoading, setIsLoading] = useState(false);
    const [currentIncidents, setCurrentIncidents] = useState([]);
    const fetchIncidents = () => {
        setIsLoading(true);
        url = `${filterIncidents}/lga/305`;
          apiRequest(props.user.token, url, 'get')
              .then((res) => {              
                  
                    setCurrentIncidents(res.incidents);
                    setIsLoading(false);
              })
              .catch((err) => {
                console.log("Failed: "+ err.statusMessage);
                  setIsLoading(false);
              });
  
      }

    const addIncident = () => {
        navigation.navigate('create-incident');
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
            <IncidentLine loading={isLoading} incidents={currentIncidents} />
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