import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { apiRequest } from "../../../lib/api";
import { electionTypes, getPollingUnit, politicalPartiesByState, result } from "../../../lib/url";
import ResultForm from "./component/ResultForm";


const CreateResultScreen = ( props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [votingLevels, setVotingLevels] = useState([]);
    const [parties, setParties] = useState([]);
    const [electionTypeList, setElectionTypeList] = useState([]);
    const [alert, setAlert] = useState({
        isError:false,
        message:''
    });

    const onSubmit = (values) => {

        const sum = parseInt(values.party_1) + parseInt(values.party_2) + parseInt(values.party_3)
            + parseInt(values.party_4) + parseInt(values.party_5) + parseInt(values.party_6) + parseInt(values.voidVotes);
        if(isNaN(sum)){
            setAlert({message:"All fields are compulsory", isError:true});
            return;
        }
        if(values.accreditedVotersCount < sum){
            setAlert({message:"Accredited voters should not be less than the total sum of votes", isError:true});
        }else if(values.accreditedVotersCount > values.registeredVotersCount){
            setAlert({message:"Accredited voters should not be greater than registered voters", isError:true});
        }else{
            setIsLoading(true);
            apiRequest(props.user.token, result, 'post', {...values})
            .then((res)=>{
                setIsLoading(false);
                setAlert({message:"Successfully submitted", isError:false})
            })
            .catch((err) => {
                setIsLoading(false);
                setAlert({message:`${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`, isError:true})
            });
        }
    }
    
    const [formField, setFormField] = useState({
        submitLabel:"SAVE",
        voidVotes: "",
        accreditedVotersCount:"",
        registeredVotersCount: ""
    })

    const loadParties = () =>{
        apiRequest(props.user.token, `${politicalPartiesByState}/${props.user.state}`, 'get')
            .then((res)=>{
                let buildFormField = {};
                res.politicalParties.forEach((element, index) => {
                    buildFormField[element.code] = "";
                    buildFormField[`party_${index+1}Label`] = element.name;
                });
                setParties(buildFormField);
            })
    }
    
  const getPollingUnitList = () => {
    apiRequest(props.user.token, `${getPollingUnit}/ward/${props.user.wardId}`, 'get')
    .then((res)=>{
        let pollingUnits = {...formField};
        pollingUnits['pollingUnits'] = res.pollingUnits;
        setFormField(pollingUnits);
    })
  }

  const getElectionTypeList = () => {
    apiRequest(props.user.token, electionTypes, 'get')
    .then((res)=>{
        setElectionTypeList(res.electionTypes);
    })
  }
  
  const getVotingLevelList = () => {
    let levels = [
        {"code": "LGA", "id": 0, "name": "LGA"}, 
        {"code": "Ward", "id": 1, "name": "Ward"}, 
        {"code": "PollingUnit", "id": 2, "name": "Polling Unit"}
    ];
    if(props.user.role == "PU"){
        levels = [
            {"code": "PollingUnit", "id": 2, "name": "Polling Unit"}
        ];
    }
    else if(props.user.role==="Ward"){
        levels = [
            {"code": "Ward", "id": 1, "name": "Ward"}, 
            {"code": "PollingUnit", "id": 2, "name": "Polling Unit"}
        ];
    }
    setVotingLevels(levels);
  }

  useEffect(
      ()=>{
          loadParties();
          getElectionTypeList();
          getPollingUnitList();
          getVotingLevelList();
      },
      []
  );
    return (
    <>
        <View>
            <ResultForm title="Add Result" party={parties} setParty={setParties} votingLevelList={votingLevels} electionTypeList={electionTypeList} formField={formField} setFormField={setFormField} isLoading={isLoading} alert={alert} onPress={onSubmit} />
        </View>
    </>)
    
    
}

const mapStateToProps = ( state ) => {
    let {user} = state.user;
    return { user }
  }
  
export default connect(mapStateToProps)(CreateResultScreen);