import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSelect from '../../../../components/CustomSelect';
import Alert from '../../../../components/CustomText/Alert';
import Header from '../../../../components/Header';

const IncidentForm = (props) => {
  const navigation = useNavigation();
  const scrollRef = useRef();
  const {onPress, formField, setFormField, title, isLoading, alert, incidentLevelsList, incidentTypeList} = props;
  
  const handleFieldChange = (event, fieldName) => {
   setFormField({...formField, [fieldName]:event});
  }
 
  const incidentStatuses = [{
    "name": "Resolved",
    "id": 1
  },
  {
      "name": "Unresolved",
      "id": 2
  }];

  const incidentWeight = [
    {id:1, name:'Not Critical'},
    {id:2, name:'Not Very Critical'},
    {id:3, name:'Manageable'},
    {id:4, name:'Critical'},
    {id:5, name:'Very Critical'}
  ]
  const back = () => {
    navigation.replace('Home');
  }

  const reset = () => {
    setFormField({...formField,
        incidentItem:"",
        incidentTypeId:"",
        reportedLocation: "",
        description: "",
        phoneNumberToContact: "",
    });
  }
  
  const onSave = () => {
    onPress();
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
          {title !=="Add Result" && <>
          <Text style={styles.labelUpdate}>Incident Level: {formField.incidentLevelName}</Text>
          
          {formField.incidentLevelId===3 && <Text style={styles.labelUpdate}>PU: { formField.pollingUnitName }</Text>}
          <View style={styles.separator} />
          </>}
          {title ==="Add Incident" && <>
          <Text style={styles.label}>Incident Level</Text>
          <CustomSelect dataList={incidentLevelsList}
            onSelect={(e)=>handleFieldChange(e, 'incidentLevelId')} 
            type="name" defaultButtonText="Select Incident Level" />
            
          {formField.incidentLevelId===3 && <><Text style={styles.label}>Polling Unit</Text>
            <CustomSelect 
            dataList={formField.pollingUnits} 
            onSelect={(e)=>handleFieldChange(e, 'pollingUnitId')} defaultButtonText="Select Polling Unit" />
          </> }

          </>}
          <Text style={styles.label}>Incident Type</Text>
          <CustomSelect dataList={incidentTypeList} onSelect={(e)=>handleFieldChange(e, 'incidentTypeId')} type="name" defaultButtonText="Select Incident Type" />

          <Text style={styles.label}>Incident Weight</Text>
          <CustomSelect dataList={incidentWeight}
            onSelect={(e)=>handleFieldChange(e, 'weight')} 
            type="name" defaultButtonText="Select Weight" />

          <Text style={styles.label}>Incident Status</Text>
          <CustomSelect dataList={incidentStatuses}
            onSelect={(e)=>handleFieldChange(e, 'incidentStatusId')} 
            type="name" defaultButtonText="Select Incident Status" />

          <Text style={styles.label}>Location</Text>
          <CustomInput
            placeholder="Location here"
            value={`${formField.reportedLocation}`}
            setValue={(e)=>handleFieldChange(e, 'reportedLocation')}
          />

          <Text style={styles.label}>Phone Number</Text>
          <CustomInput
            placeholder="Phone number here"
            value={`${formField.phoneNumberToContact}`}
            setValue={(e)=>handleFieldChange(e, 'phoneNumberToContact')}
          />

          <Text style={styles.label}>Description</Text>
          <CustomInput
            placeholder="Description here"
            value={`${formField.description}`}
            setValue={(e)=>handleFieldChange(e, 'description')}
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

export default connect(mapStateToProps)(IncidentForm);