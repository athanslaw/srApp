import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../assets/images/logo-blue.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const HomeScreen = () => {
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSignInPressed = () => {
        console.warn("Sign in");
    }
    const onForgotPasswordPressed = () => {
        console.warn("Forgot password");
    }

  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode="contain" />
      <Text>Welcome Back</Text>
      <CustomInput placeholder='Username' value={username} setValue={setUsername} />
      <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry />
      <CustomButton text='Sign In' onPress={onSignInPressed} />
      <CustomButton text='Forgot password?' onPress={onForgotPasswordPressed} type="TERTIARY" />
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
export default HomeScreen;
