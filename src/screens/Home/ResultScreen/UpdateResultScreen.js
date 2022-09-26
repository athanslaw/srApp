import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { apiRequest } from "../../../lib/api";
import { allVotingLevels, electionTypes, getPollingUnit, result } from "../../../lib/url";
import ResultForm from "./component/ResultForm";


const UpdateResultScreen = ( props) => {
    const navigation = useNavigation();

    const [item, setItem] = useState(navigation.getState('item').routes[
        navigation.getState('item').routes.length - 1
    ]['params']['item'])
    
    const [isLoading, setIsLoading] = useState(false);
    const [votingLevels, setVotingLevels] = useState([]);

    const [parties, setParties] = useState({});
    
    const [formField, setFormField] = useState({
        electionType: item.electionType,
        id: item.id,
        votingLevelId: item.votingLevel.id,
        votingLevelName: item.votingLevel.name,
        pollingUnit: item.pollingUnit.id,
        voidVotes: item.voidVotes,
        accreditedVotersCount:item.accreditedVotersCount,
        registeredVotersCount: item.registeredVotersCount,
        submitLabel:"SAVE"
    });

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
            apiRequest(props.user.token, `${result}/${formField.id}`, 'put', values)
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
    
    const getPollingUnitList = () => {
        apiRequest(props.user.token, `${getPollingUnit}/ward/${props.user.wardId}`, 'get')
        .then((res)=>{
            let pollingUnits = {...formField};
            pollingUnits['pollingUnitName'] = res.pollingUnits.filter(pu=>pu.id==item.pollingUnit.id)[0].name;
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
        apiRequest(props.user.token, allVotingLevels, 'get')
        .then((res)=>{
            setVotingLevels(res.votingLevels);
        })
    }

    const partiesMapping = () => {
        let partyMap = {};
        item.resultPerParties.forEach((p)=>{
            partyMap[p.politicalParty['code']] = p['voteCount'];
            partyMap[`${p.politicalParty['code']}Label`] = p.politicalParty['name'];
        });
        setParties(partyMap);
    }

    useEffect(
        ()=>{
            getElectionTypeList();
            getPollingUnitList();
            getVotingLevelList();
            partiesMapping();
        },
        []
    );
    return (
    <>
        <View>
            <ResultForm title="Update Result" party={parties} setParty={setParties} votingLevelList={votingLevels} electionTypeList={electionTypeList} formField={formField} setFormField={setFormField} isLoading={isLoading} alert={alert} onPress={onSubmit} />
        </View>
    </>)
    
    
}

const mapStateToProps = ( state ) => {
    let {user} = state.user;
    return { user }
  }
  
export default connect(mapStateToProps)(UpdateResultScreen);