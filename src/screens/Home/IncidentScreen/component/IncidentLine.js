import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Delete from '../../../../assets/images/delete.png';
import Edit from '../../../../assets/images/edit.png';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import CustomText from '../../../../components/CustomText/CustomText';
import Loader from '../../../../components/Loader';


const IncidentLine = ({incidents, loading, onDelete}) => {
    
    const incidentWeight = ["","Not Critical", "Not Very Critical", "Manageable", "Critical","Very Critical"]
    
    const onEdit = (item) => {
        console.log("Item:", {item})
        navigation.replace('update-incident', {item: item});
    }
  
    const navigation = useNavigation();
    const incidentItem = ({item}) => {
        return <View style={[styles.padding]}>
            <View style={styles.root}>
                <CustomText size="16" value={item.incidentType['name']} />
                <Pressable style={{right:0, position:'absolute'}} onPress={()=>onEdit(item)}>
                    <Image source={Edit} resizeMode="contain" style={styles.icon}/>
                </Pressable>
            </View>
            
            <View style={styles.root}>
                <CustomText color="grey" value={`at ${item.reportedLocation} (${item.incidentStatus['name']})`} />
                <Pressable style={{right:0, position:'absolute'}} onPress={()=>onDelete(item)}>
                    <Image source={Delete} resizeMode="contain" style={styles.icon}/>
                </Pressable>
            </View>
            <View style={styles.root}>
                <CustomText size="12" value={`PU: ${item.pollingUnit['code']} - ${item.pollingUnit['name']}`} />
            </View>
            <View style={styles.root}>
                <CustomText value={`Ward: ${item.ward['code']} - ${item.ward['name']}, ${item.lga['name']} lga`} />
            </View>
            {item.description && (<View style={styles.root}>
                <CustomText value={item.description} />
            </View>)}
            <View style={styles.flex}>
                <View style={styles.root}>
                    <CustomText bold color="#333" value={`Severity: ${incidentWeight[item.weight]}`} />
                </View>
                <View style={{flex:1}} />
                <View><CustomButton text='Edit' onPress={headerComponent} type="TERTIARY" /></View>
            </View>
        </View>
    }

    itemSeparator = () =>{
        return <View style={styles.separator} />
    }

    headerComponent =()=>{
        return <Text style={styles.listHeadline}>Total Incidents: {incidents.length}</Text>
    }

    return (
        loading===true?
        <Loader />:(<SafeAreaView>
            {incidents?.length > 0 ? 
            <><View style={styles.separator}/><FlatList
                contentContainerStyle={styles.padding}
                ListHeaderComponentStyle={styles.listHeader}
                ListHeaderComponent={headerComponent}
                data={incidents}
                renderItem={incidentItem}
                ListEmptyComponent={ <Text>No record found</Text>}
                keyExtractor={ incidents => incidents.id}
                ItemSeparatorComponent={ itemSeparator}
             /><View style={{marginBottom:-100}}/></>:<Text style={[styles.listHeadline]}>{'\n\n'}No reported incident yet</Text>}
        </SafeAreaView>)
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    padding: {
        paddingVertical: 13
    },
    column: {
        backgroundColor: "#cccccc"
    },
    super: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        marginTop: 10,
    },
    flex:{
        display:'flex',
        flexDirection: 'row'
    },
    listHeader: {
        height:17,
        alignSelf:'flex-end'
    },
    listHeadline: {
        color: '#333',
        fontSize:14,
        fontWeight: 'bold',
    },
    separator: {
        height: 5,
        width: "100%",
        backgroundColor: "#CCC"
    },
    icon: {
        position: 'absolute',
        right: 0,
        height:20,
        width:20
    }
})

export default IncidentLine;