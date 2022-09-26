import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { apiRequest } from "../../../lib/api";
import { allIncidentTypes, getPollingUnit, incidentsBase } from "../../../lib/url";
import IncidentForm from "./component/IncidentForm";


const UpdateIncidentScreen = ( props) => {
    const navigation = useNavigation();

    const [item, setItem] = useState(navigation.getState('item').routes[
        navigation.getState('item').routes.length - 1
    ]['params']['item'])
    
    const [isLoading, setIsLoading] = useState(false);
    const [incidentTypeList, setIncidentTypeList] = useState([]);
    
    const [formField, setFormField] = useState({
        submitLabel:"SAVE",
        reportedLocation: item.reportedLocation,
        description:item.description,
        phoneNumberToContact: item.phoneNumberToContact,
        id: item.id,
        lgaId: item.lga.id,
        wardId: item.ward.id,
        pollingUnitId: item.pollingUnit.id,
        incidentLevelId: item.incidentLevel.id,
        incidentLevelName: item.incidentLevel.name,
        pollingUnit: item.pollingUnit.id,
    });

    const getIncidentTypeList = () => {
        apiRequest(props.user.token, allIncidentTypes, 'get')
        .then((res)=>{
            setIncidentTypeList(res.incidentTypes);
        })
      }
            
    const [alert, setAlert] = useState({
        isError:false,
        message:''
    });

    const onSubmit = (values) => {        
        setIsLoading(true);
        console.log("Values::",formField)
        apiRequest(props.user.token, `${incidentsBase}/${formField.id}`, 'put', formField)
        .then((res)=>{
            setIsLoading(false);
            setAlert({message:"Successfully submitted", isError:false})
        })
        .catch((err) => {
            setIsLoading(false);
            setAlert({message:`${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`, isError:true})
        });
    }
    
    const getPollingUnitList = () => {
        apiRequest(props.user.token, `${getPollingUnit}/ward/${props.user.wardId}`, 'get')
        .then((res)=>{
            let pollingUnits = {...formField};
            pollingUnits['pollingUnitName'] = res.pollingUnits.filter(pu=>pu.id==item.pollingUnit.id)[0].name;
            setFormField(pollingUnits);
        })
    }

    useEffect(
        ()=>{
            getIncidentTypeList();
            getPollingUnitList();
        },
        []
    );
    return (
    <>
        <View>
            <IncidentForm title="Update Incident" incidentTypeList={incidentTypeList} formField={formField} setFormField={setFormField} isLoading={isLoading} alert={alert} onPress={onSubmit} />
        </View>
    </>)
    
    
}

const mapStateToProps = ( state ) => {
    let {user} = state.user;
    return { user }
  }
  
export default connect(mapStateToProps)(UpdateIncidentScreen);