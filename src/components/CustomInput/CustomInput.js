import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, keyboardType}) => {
    return (
        <View style={styles.container}>
            <TextInput
            value={value}
            onChangeText={setValue}
             placeholder={placeholder} 
             style={styles.input}
             placeholderTextColor="grey" 
             keyboardType={keyboardType}
             secureTextEntry={secureTextEntry} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width:'100%',
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius: 5,
        paddingHorizontal:10,
        marginVertical: 5,
    },
    input:{
        color: '#333333'
    }
})

export default CustomInput