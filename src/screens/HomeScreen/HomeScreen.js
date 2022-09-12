import React from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../assets/images/election.jpg';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';
import CustomText from '../../components/CustomText/CustomText';
//import '../../assets/styles/main.css';

const HomeScreen = (props) => {
    const {height} = useWindowDimensions();
    
    const navigation = useNavigation();
    const openEvents = () => {
      navigation.navigate('Events');
    }
    const openIncidents = () => {
      navigation.navigate('Incident');
    }
    const openResults = () => {
      navigation.navigate('Results');
    }

  return (
    <View style={styles.root}>
      <Image source={Logo} className="logo" style={[{height: height * 0.3}]} resizeMode="contain" />
      <CustomText value="" />
      <CustomText value={`Welcome ${props.user.fullname}`} />
      <CustomText value="" />
      <CustomButton text='TRACK EVENTS' onPress={openEvents} type="PRIMARY" />
      <CustomButton text='REPORT INCIDENTS' onPress={openIncidents} type="PRIMARY" />
      <CustomButton text='SUBMIT RESULT' onPress={openResults} type="PRIMARY" />
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '70%',
        maxWidth:500,
        height: 100,
        maxHeight: 300
    }
})


const mapStateToProps = ( state ) => {
  let {user} = state.user;
  return { user }
}

export default connect(mapStateToProps)(HomeScreen);
