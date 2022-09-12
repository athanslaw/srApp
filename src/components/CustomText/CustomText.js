import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { DEFAULT_COLOR } from '../../utils/error-handlers/constants';

const CustomText = ({value, color, backgroundColor, size, bold}) => {
    
    let styling = {};
    styling['color'] = typeof(color) != 'undefined'?color:DEFAULT_COLOR;
    if(typeof(backgroundColor) != 'undefined') styling['backgroundColor'] = backgroundColor;
    if(typeof(size) != 'undefined') styling['fontSize'] = size*1;
    if(typeof(bold) != 'undefined') styling['fontWeight'] = 'bold';
    
    return (
        <Text
            style={{...styling}}
            >
            {value}
        </Text>
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
    input:{}
})

export default CustomText