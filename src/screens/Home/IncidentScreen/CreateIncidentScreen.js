import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { apiRequest } from "../../../lib/api";
import { allIncidentLevels, allIncidentTypes, getPollingUnit, incidentsBase } from "../../../lib/url";
import IncidentForm from "./component/IncidentForm";


const CreateIncidentScreen = ( props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [incidentLevels, setIncidentLevels] = useState([]);
    const [incidentTypeList, setIncidentTypeList] = useState([]);
    const [alert, setAlert] = useState({
        isError:false,
        message:''
    });

    const onSubmit = () => {
        setIsLoading(true);
        const values = {"incidentLevelId":formField.incidentLevelId,
        "incidentTypeId":formField.incidentTypeId,"incidentStatusId":formField.incidentStatusId,
        "weight":formField.weight,"lgaId":props.user.lga,"wardId":props.user.wardId,"pollingUnitId":formField.pollingUnitId,
        "reportedLocation":formField.reportedLocation,
        "phoneNumberToContact":formField.phoneNumberToContact,
        "description":formField.description};
        console.log("Values:", values);
        apiRequest(props.user.token, incidentsBase, 'post', values)
        .then((res)=>{
            setIsLoading(false);
            setAlert({message:"Successfully submitted", isError:false})
        })
        .catch((err) => {
            setIsLoading(false);
            setAlert({message:`${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`, isError:true})
        });
    }
    
    const [formField, setFormField] = useState({
        submitLabel:"SAVE",
        reportedLocation: "",
        description:"",
        phoneNumberToContact: ""
    })
    
  const getPollingUnitList = () => {
    apiRequest(props.user.token, `${getPollingUnit}/ward/${props.user.wardId}`, 'get')
    .then((res)=>{
        let pollingUnits = {...formField};
        pollingUnits['pollingUnits'] = res.pollingUnits;
        setFormField(pollingUnits);
    })
  }

  const getIncidentTypeList = () => {
    apiRequest(props.user.token, allIncidentTypes, 'get')
    .then((res)=>{
        setIncidentTypeList(res.incidentTypes);
    })
  }
  
  const getIncidentLevelList = () => {
    apiRequest(props.user.token, allIncidentLevels, 'get')
    .then((res)=>{
        setIncidentLevels(res.incidentLevels);
    })
  }

  useEffect(
      ()=>{
          getIncidentTypeList();
          getPollingUnitList();
          getIncidentLevelList();
      },
      []
  );
  
    return (
    <>
        <View>
            <IncidentForm title="Add Incident" incidentLevelsList={incidentLevels} incidentTypeList={incidentTypeList} formField={formField} setFormField={setFormField} isLoading={isLoading} alert={alert} onPress={onSubmit} />
        </View>
    </>)
    
    
}

const mapStateToProps = ( state ) => {
    let {user} = state.user;
    return { user }
  }
  
export default connect(mapStateToProps)(CreateIncidentScreen);