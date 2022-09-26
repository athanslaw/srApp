import React from "react";
import { View, StyleSheet} from 'react-native'
import CustomText from "./CustomText";

export default function Alert({isError, message}){
    return (
        message.length>0 && <View style={isError?styles.rootError:styles.rootSuccess}>
            <CustomText value={message} bold color="white" />
        </View>
    )
}

const styles = StyleSheet.create({
    rootError: {
        backgroundColor:'red',
        width: '100%',
        padding:10,
        borderRadius:5,
    },
    rootSuccess: {
        backgroundColor:'#00af00',
        padding:10,
        borderRadius:5,
        width: '100%'
    }
})