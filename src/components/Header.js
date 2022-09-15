import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from './CustomText/CustomText';
import { HEADER_SIZE, BACKGROUND_COLOR, WHITE_COLOR } from '../utils/error-handlers/constants';
import CustomButton from './CustomButton/CustomButton';

const Header = ({title, buttonTitle, onPress}) => {
    return (
        <View style={styles.root}>
            <View style={styles.flex}>
                <View>
                    <CustomText value="" size="7" />
                    <CustomText value={title} size={HEADER_SIZE} color={WHITE_COLOR} bold="true" />
                    {/* {'buttonTitle'}</Button> */}
                </View><View style={{flex:1 }} />
                {buttonTitle && <View style={{'width':110, height:50 }} >
                    <CustomButton text={buttonTitle} onPress={onPress} type="SECONDARY" />
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingTop:30,
        paddingLeft:10,
        paddingRight:5,
        backgroundColor: BACKGROUND_COLOR,
        height: 80,
        fontWeight: 'bold'
    },
    flex: {
        display: 'flex',
        flexDirection: 'row'
    }
})

export default Header;