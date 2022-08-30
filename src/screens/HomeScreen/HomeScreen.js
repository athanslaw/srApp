import React from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../assets/images/election.jpg';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';
//import '../../assets/styles/main.css';

const HomeScreen = (props) => {
    const {height} = useWindowDimensions();
    
    const navigation = useNavigation();
    const onForgotPasswordPressed = () => {
      navigation.navigate('Home');
    }

  return (
    <View style={styles.root}>
      <Image source={Logo} className="logo" style={[{height: height * 0.3}]} resizeMode="contain" />
      <Text>Welcome back {props.user.username}</Text>
      <CustomButton text='TRACK EVENTS' onPress={onForgotPasswordPressed} type="PRIMARY" />
      <CustomButton text='REPORT INCIDENTS' onPress={onForgotPasswordPressed} type="PRIMARY" />
      <CustomButton text='SUBMIT RESULT' onPress={onForgotPasswordPressed} type="PRIMARY" />
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
