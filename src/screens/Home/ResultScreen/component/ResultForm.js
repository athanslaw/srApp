import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../../components/CustomSelect';
import Alert from '../../../../components/CustomText/Alert';
import Header from '../../../../components/Header';


const ResultForm = (props) => {
  const navigation = useNavigation();
  const scrollRef = useRef();
  const {onPress, formField, setFormField, title, party, setParty, isLoading, alert, votingLevelList, electionTypeList} = props;
  
  const handleFieldChange = (event, fieldName) => {
   setFormField({...formField, [fieldName]:event});
  }
  
  const handlePartyChange = (event, fieldName) => {
    setParty({...party, [fieldName]:event});
   }
 
  const back = () => {
    navigation.replace('Home');
  }

  const reset = () => {
    setFormField({...formField,
        voidVotes:"",
        accreditedVotersCount:"",
        registeredVotersCount: ""
    });
    
    setParty({...party,
      party_1:"",
      party_2:"",
      party_3:"",
      party_4:"",
      party_5:"",
      party_6:""
    });
  }
  
  const onSave = () => {
    onPress({
      'party_1':party.party_1, 'party_2':party.party_2, 'party_3':party.party_3, 'party_4':party.party_4, 'party_5':party.party_5, 'party_6':party.party_6, 
      'electionType':formField.electionType,
      'votingLevelId': formField.votingLevelId,
      'partyAgentId': props.user.username,
      'lgaId': props.user.lga,
      'wardId': props.user.wardId,
      'pollingUnitId': formField.pollingUnit,
      'accreditedVotersCount': formField.accreditedVotersCount,
      'registeredVotersCount': formField.registeredVotersCount,
      'voidVotes': formField.voidVotes
    });
  }

  useEffect(()=>{
    if(alert.isError === false && title ==="Add Result"){
      reset();
    }
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [alert.message]);

  return (
    <ScrollView ref={scrollRef}>
      
      <Header 
        title={title} 
        buttonTitle="<< Back >>" 
        onPress={back} 
      />
          <View style={{marginHorizontal:20}}>
          <View style={{paddingTop:10}}/>
          <Alert isError={alert.isError} message={alert.message} />
          {title ==="Add Result" && <>
          <Text style={styles.label}>Voting Level</Text>
          <CustomSelect dataList={votingLevelList}
            defaultValue={{ code: "LGA", id: 0 }} onSelect={(e)=>handleFieldChange(e, 'votingLevelId')} 
            type="name" defaultButtonText="Select Voting Level" />
          
          <Text style={styles.label}>Election Type</Text>
          <CustomSelect dataList={electionTypeList} onSelect={(e)=>handleFieldChange(e, 'electionType')} type="name" defaultButtonText="Select Election Type" />
          
          {formField.votingLevelId===2 && <><Text style={styles.label}>Polling Unit</Text>
            <CustomSelect 
            dataList={formField.pollingUnits} 
            onSelect={(e)=>handleFieldChange(e, 'pollingUnit')} defaultButtonText="Select Polling Unit" />
          </> }
          </>}
          {title !=="Add Result" && <>
          <Text style={styles.labelUpdate}>Voting Level: {formField.votingLevelName}</Text>
          
          <Text style={styles.labelUpdate}>Election Type: {electionTypeList[formField.electionType]?.name}</Text>
          {formField.votingLevelId===2 && <Text style={styles.labelUpdate}>PU: { formField.pollingUnitName }</Text>}
          <View style={styles.separator} />
          </>}
          <Text style={styles.label}>Registered Voters</Text>
          <CustomInput
            placeholder="Total registered voters"
            value={`${formField.registeredVotersCount}`}
            keyboardType='numeric'
            setValue={(e)=>handleFieldChange(e, 'registeredVotersCount')}
          />
          <Text style={styles.label}>Accredited Voters</Text>
          <CustomInput
            placeholder="Total Accredited Voters"
            value={`${formField.accreditedVotersCount}`}
            keyboardType='numeric'
            setValue={(e)=>handleFieldChange(e, 'accreditedVotersCount')}
          />
          <Text style={styles.label}>{party.party_1Label}</Text>
          <CustomInput
            placeholder={`Scores for ${party.party_1Label}`}
            value={`${party.party_1}`}
            keyboardType='numeric'
            setValue={(e)=>handlePartyChange(e, 'party_1')}
          />
          <Text style={styles.label}>{party.party_2Label}</Text>
          <CustomInput
            placeholder={`Scores for ${party.party_2Label}`}
            value={`${party.party_2}`}
            keyboardType='numeric'
            setValue={(e)=>handlePartyChange(e, 'party_2')}
          />
          <Text style={styles.label}>{party.party_3Label}</Text>
          <CustomInput
            placeholder={`Scores for ${party.party_3Label}`}
            value={`${party.party_3}`}
            keyboardType='numeric'
            setValue={(e)=>handlePartyChange(e, 'party_3')}
          />
          <Text style={styles.label}>{party.party_4Label}</Text>
          <CustomInput
            placeholder={`Scores for ${party.party_4Label}`}
            value={`${party.party_4}`}
            keyboardType='numeric'
            setValue={(e)=>handlePartyChange(e, 'party_4')}
          />
          <Text style={styles.label}>{party.party_5Label}</Text>
          <CustomInput
            placeholder={`Scores for ${party.party_5Label}`}
            value={`${party.party_5}`}
            keyboardType='numeric'
            setValue={(e)=>handlePartyChange(e, 'party_5')}
          />
          <Text style={styles.label}>{party.party_6Label}</Text>
          <CustomInput
            placeholder={`Scores for ${party.party_6Label}`}
            value={`${party.party_6}`}
            keyboardType='numeric'
            setValue={(e)=>handlePartyChange(e, 'party_6')}
          />
          <Text style={styles.label}>Void Votes</Text>
          <CustomInput
            placeholder="Total count of Void Votes"
            value={`${formField.voidVotes}`}
            keyboardType='numeric'
            setValue={(e)=>handleFieldChange(e, 'voidVotes')}
          />

          <CustomButton isLoading={isLoading} text={formField.submitLabel} onPress={onSave} />
        </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  label:{
    paddingTop:10,
    color:'grey'
  },
  labelUpdate:{
    paddingTop:2,
    color:'#772244',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  separator: {
      height: 5,
      width: "100%",
      backgroundColor: "#CCC",
      marginBottom:3,
      marginTop:10
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 0,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

});

const mapStateToProps = ( state ) => {
  return { user : state.user.user }
}

export default connect(mapStateToProps)(ResultForm);