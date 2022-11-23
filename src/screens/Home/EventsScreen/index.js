import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert as DefaultAlert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import EventButton from "../../../components/CustomButton/EventButton";
import Alert from '../../../components/CustomText/Alert';
import CustomText from "../../../components/CustomText/CustomText";
import Header from "../../../components/Header";
import Loader from "../../../components/Loader";
import { apiRequest } from "../../../lib/api";
import { eventRecords, events } from "../../../lib/url";

const EventsScreen = (props) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState();
    const [myEvents, setMyEvents] = useState();
    const [myEventRecords, setMyEventRecords] = useState();
    const [currentEvent, setCurrentEvent] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [alert, setAlert] = useState({
      isError:false,
      message:''
    });

    const materialsMovement = (e) => {
        setCurrentEvent(e);
        //navigation.replace('materials-movement');
        setModalVisible(true);
    }

    const handleAlert = (message, isError) =>{
      setAlert({message, isError});
      setTimeout(()=>setAlert({message:"", isError:false}), 5000);
    }

    const submitRecord = (myStatus) => {
        setIsLoading(true);
        setModalVisible(false);
        const values = {
            "eventId":currentEvent.id,
            "pollingUnit":props.user.pollingUnitId,
            "eventStatus":myStatus,
            "agentId":props.user.phone,
            "lga":props.user.lga,
            "code":currentEvent.code,
            "description":currentEvent.description
        };
        apiRequest(props.user.token, eventRecords, 'post', values)
        .then((res)=>{
            console.log("Res", res);
            setIsLoading(false);
            loadEventRecordsByPU();
            handleAlert("Successfully submitted", false);
        })
        .catch((err) => {
            setIsLoading(false);
            handleAlert(`${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`, true)
        });
    }

    const loadEventRecordsByPU = () => {
        apiRequest(props.user.token, `${eventRecords}/pu-events`, 'get',{params:{"pollingUnit":props.user.pollingUnitId}})
        .then((res)=>{
            setMyEventRecords(res.eventRecords);
            console.log("Event Records:", res.eventRecords);
        })
        .catch((e) => {
          console.log("EEEERRR:", e);
        });
    }

    const loadEvents = () => {
        setIsLoading(true);
        loadEventRecordsByPU();
        apiRequest(props.user.token, events, 'get')
        .then((res)=>{
          console.log("PU:",props.user.pollingUnitId);
            setIsLoading(false);
            setMyEvents(res.events);
        })
        .catch((err) => {
            setIsLoading(false);
            setAlert({message:`${err?.response?.data.statusCode || "Error"}: ${err?.response?.data.statusMessage || "Something went wrong. Please try again later."}`, isError:true})
        });
    }

    useEffect(()=>loadEvents(), [])
    
    const back = () => {
        navigation.replace('Home');
    }
    
    return (
    <>        
        <Header 
            title="EVENTS" 
            buttonTitle="<< Back >>" 
            onPress={back} />
            
            <Confirmation modalVisible={modalVisible} setModalVisible={setModalVisible} currentEvent={currentEvent} submitRecord={submitRecord} />
        <ScrollView>
        { isLoading===true?
        <Loader />:<View style={{marginLeft:20, marginRight:20}}>
          <Alert isError={alert.isError} message={alert.message} />
            <CustomText text='' size="30" />
            { myEvents?.map(e=>{
              const eventPresent = myEventRecords?.filter(eventRecord => eventRecord.eventId === e.id);
              let type = "PRIMARY";
              console.log("Event Present:", eventPresent)
              if(eventPresent.length ===0){
                type = "SECONDARY";
              }
              else if(eventPresent[0].eventStatus === true){
                type = "DISABLED";
                return <EventButton key={e.id} text={e.description.toUpperCase()} onPress={()=>DefaultAlert.alert("Event has already completed")} type={type} />
              }
                return <EventButton key={e.id} text={e.description.toUpperCase()} onPress={()=>materialsMovement(e)} type={type} />
              }
            )}
            {/* <EventButton text='HAS INEC OFFICIAL ARRIVED?' onPress={materialsMovement} type="PRIMARY" /> */}
        </View>}
        </ScrollView>
    </>)
}

const mapStateToProps = ( state ) => {
    let {user} = state.user;
    return { user }
  }
  
export default connect(mapStateToProps)(EventsScreen);


const Confirmation = ({modalVisible, setModalVisible, currentEvent, submitRecord}) => {
    // https://reactnative.dev/docs/modal
    return (
      <View>
        <Modal style={styles.centeredView}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{currentEvent?.description?.toUpperCase()}</Text>
              <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonPositive]}
                onPress={() => submitRecord(true)}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonNegative]}
                onPress={() => submitRecord(false)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
              <Pressable
                style={styles.button2}
                onPress={() => setModalVisible(false)}
              >
                <Text
                style={styles.textStyleRed}>X</Text>
              </Pressable></View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 5 ,
      padding: 10,
      paddingTop: 2,
      paddingBottom: 5,
      margin:5,
      elevation: 2
    },
    button2: {
      borderRadius: 5,
      padding: 10,
      paddingTop: 2,
      paddingBottom: 5,
      margin:5,
      borderWidth:1,
      borderColor:"red"
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row'
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonNegative: {
      backgroundColor: "#F33621",
    },
    buttonPositive: {
      backgroundColor: "#21a346",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    textStyleRed: {
      color: "red",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold"
    }
  });