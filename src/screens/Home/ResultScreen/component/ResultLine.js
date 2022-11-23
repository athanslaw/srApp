import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Delete from '../../../../assets/images/delete.png';
import Edit from '../../../../assets/images/edit.png';
import CustomText from '../../../../components/CustomText/CustomText';
import Loader from '../../../../components/Loader';

const ResultLine = ({results, loading, onDelete}) => {
    const navigation = useNavigation();
    const electionTypes = [
        {
            "id":"1",
            "name":"Gubernatorial"
        },
        {
            "id":"2",
            "name":"Presidential"
        },
        {
            "id":"3",
            "name":"Senatorial"
        },
        {
            "id":"4",
            "name":"Federal House of Representative"
        },
        {
            "id":"5",
            "name":"State House of Assembly"
        },
        {
            "id":"6",
            "name":"LGA Chairmanship"
        },
        {
            "id":"7",
            "name":"Councilorship"
        }
    ]

    const onEdit = (item) => {
        navigation.replace('update-result', {item: item});
    }

    const resultItem = ({item}) => {
        return <View style={[styles.padding]}>
            
                <View style={styles.root}>
                    <CustomText value={`${electionTypes[(item?.electionType && item?.electionType - 1) || 0].name.toUpperCase()} ELECTION`} bold color="#950020" />
                </View>
                <View style={styles.root}>
                    <CustomText color="grey" bold value={`${item.votingLevel.name} Result`} />
                </View>
                
                <View >
                    <CustomText value="------------------------------" color="#000055" bold />
                </View>
                <View style={styles.root}>
                    <CustomText value="Accredited Voters: " />
                    <CustomText value={item.accreditedVotersCount} bold />
                    <Pressable style={{right:0, position:'absolute'}} onPress={()=>onEdit(item)}>
                        <Image source={Edit} resizeMode="contain" style={styles.icon}/>
                    </Pressable>
                </View>
                <View style={styles.root}>
                    <CustomText value="Registered Voters: " />
                    <CustomText value={item.registeredVotersCount} bold />
                    <Pressable style={{right:0, position:'absolute'}} onPress={()=>onDelete(item)}>
                        <Image source={Delete} resizeMode="contain" style={styles.icon}/>
                    </Pressable>
                </View>

                {item.lga.name && <View style={styles.root}>
                    <CustomText value={`${item.lga.name} LGA`} bold />
                </View>}
                {item.ward.name && <View style={styles.root}>
                    <CustomText value={`Ward ${item.ward['code']} (${item.ward['name']})`} />
                </View>}
                <View style={styles.root}>
                    {item.pollingUnit.name && <CustomText value={`PU ${item.pollingUnit['code']} (${item.pollingUnit['name']})`} />}
                </View>
                
                
                <View style={styles.root}>
                    <CustomText value="PARTY RESULTS" color="#005500" bold />
                </View>
                <View style={styles.root}>
                    <CustomText bold value={`${item.resultPerParties[0]?.politicalParty.name}: ${item.resultPerParties[0]?.voteCount}; `} />
                    <CustomText bold value={`${item.resultPerParties[1]?.politicalParty.name}: ${item.resultPerParties[1]?.voteCount}; `} />
                </View>
                
                <View style={styles.root}>
                    <CustomText bold value={`${item.resultPerParties[2]?.politicalParty.name}: ${item.resultPerParties[2]?.voteCount}; `} />
                    <CustomText bold value={`${item.resultPerParties[3]?.politicalParty.name}: ${item.resultPerParties[3]?.voteCount}; `} />
                </View>
                <View style={styles.root}>
                    <CustomText bold value={`${item.resultPerParties[4]?.politicalParty.name}: ${item.resultPerParties[4]?.voteCount}; `} />
                    <CustomText bold value={`${item.resultPerParties[5]?.politicalParty.name}: ${item.resultPerParties[5]?.voteCount}; `} />
                </View>
                
            </View>

    }

    const itemSeparator = () =>{
        return <View style={styles.separator} />
    }

    const headerComponent =()=>{
        return <Text style={styles.listHeadline}>Total results: {results.length}</Text>
    }

    return (
        loading===true?
        <Loader />:(<SafeAreaView>
            {results?.length > 0 ? 
            <>
            <FlatList
                contentContainerStyle={styles.padding}
                ListHeaderComponentStyle={styles.listHeader}
                ListHeaderComponent={headerComponent}
                data={results}
                renderItem={resultItem}
                ListEmptyComponent={ <Text>No record found</Text>}
                keyExtractor={ results => results.id}
                ItemSeparatorComponent={ itemSeparator}
             />
             {results.length > 2 && <View style={{marginBottom:-100}}/>}
             </>:<Text style={[styles.listHeadline]}>{'\n\n'}No result entry yet</Text>}
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

export default ResultLine;