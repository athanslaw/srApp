import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const EventButton = ({text, isLoading, onPress, type="PRIMARY"}) => {
    return (<>
            {!isLoading && <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]} >
                <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
            </Pressable>}
            {isLoading && <Pressable style={[styles[`container_loading`]]} >
                <Text style={[styles.text_loading]}>Loading...</Text>
            </Pressable>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        borderRadius: 5,
        padding:15,
        marginVertical: 5,
        alignItems: 'center',
    },
    container_loading: {
        width:'100%',
        borderRadius: 5,
        padding:15,
        marginVertical: 5,
        alignItems: 'center',
        backgroundColor: '#ddddee',
    },
    container_PRIMARY: {
        backgroundColor: '#337733'
    },
    container_SECONDARY: {
        backgroundColor: '#C93333'
    },
    text:{
        fontWeight: 'bold',
        color: 'white',
    },
    text_loading:{
        fontWeight: 'bold',
        color: '#aaaacc',
    },
    text_SECONDARY:{
        fontWeight: 'bold'
    }
})

export default EventButton