import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, View } from "react-native";
import { connect } from 'react-redux';
import Header from "../../../components/Header";
import { apiRequest } from '../../../lib/api';
import { getResultsByWard, result } from '../../../lib/url';
import ResultLine from './component/ResultLine';

const ResultScreen = (props) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [currentResults, setCurrentResults] = useState([]);
    const fetchResults = () => {
        setIsLoading(true);
        const url = `${getResultsByWard}/${props.user.wardId}`;
          apiRequest(props.user.token, url, 'get')
              .then((res) => {              
                  console.log(url,{res})
                    setCurrentResults(res.results);
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
            apiRequest(props.user.token, `${result}/delete/${item.id}`, 'delete')
            .then((res)=>{
              fetchResults();
            })
            .catch((err) => {
                setIsLoading(false);
                Alert.alert("Failed: "+err)
            });
    }

    const addResult = () => {
        navigation.replace('create-result');
    }


    useEffect(()=>fetchResults(),[]);

    return (
        <>
        <Header 
            title="RESULTS" 
            buttonTitle="Add Result" 
            onPress={addResult} 
            />
            
        <View style={{marginLeft:20, marginRight:20}}>
            <ResultLine loading={isLoading} results={currentResults} onDelete={showConfirmDialog} />
        </View>
    </>)
}

const mapStateToProps = ( state ) => {
    return { user : state.user.user }
  }
  
export default connect(mapStateToProps)(ResultScreen);