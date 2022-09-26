import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { connect } from 'react-redux';
import Logo from '../../assets/images/election.jpg';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomText from '../../components/CustomText/CustomText';

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
      navigation.navigate('Result');
    }

  return (
    <View style={styles.root}>
      <Image source={Logo} className="logo" style={[{height: height * 0.3}]} resizeMode="contain" />
      <CustomText value="" />
      <CustomText value={`Welcome ${props.user.fullname}`} />
      <CustomText value="" />
      <CustomButton text='TRACK EVENTS' onPress={openEvents} type="PRIMARY" />
      <CustomButton text='REPORT INCIDENTS' onPress={openIncidents} type="PRIMARY" />
      <CustomButton text='ELECTION RESULTS' onPress={openResults} type="PRIMARY" />
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
