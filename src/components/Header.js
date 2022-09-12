import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from './CustomText/CustomText';
import { HEADER_SIZE, BACKGROUND_COLOR, WHITE_COLOR } from '../utils/error-handlers/constants';
import CustomButton from './CustomButton/CustomButton';

const Header = ({title, buttonTitle, onPress}) => {
    return (
        <View style={styles.root}>
            <View>
            <CustomText value="" size="7" />
            <CustomText value={title} size={HEADER_SIZE} color={WHITE_COLOR} bold="true" />
            {/* {'buttonTitle'}</Button> */}
            </View>
            {buttonTitle && <View style={{'width':150, 'right':-242 }} >
                <CustomButton text={buttonTitle} onPress={onPress} type="SECONDARY" />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        padding: 4,
        paddingLeft:10,
        backgroundColor: BACKGROUND_COLOR,
        height: 70,
        fontWeight: 'bold'
    },
    logo: {
        width: '70%',
        maxWidth:500,
        height: 100,
        maxHeight: 300
    }
})

export default Header;