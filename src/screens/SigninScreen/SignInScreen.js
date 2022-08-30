import React, {useState} from 'react';
import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../assets/images/election.jpg';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';
import { saveUser } from '../../actions/user';

const SignInScreen = (props) => {
  console.log("Accounnt",props.user);
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const onSignInPressed = () => {
      props.saveUser({username:"07068551023", token:"123fffj333", state:1, lga:1, ward:1, pu:1});
      navigation.navigate('Home');
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('Result')
    }

  return (
    <View style={[styles.root, {marginTop: height * 0.2}]}>
      <Image source={Logo} style={[styles.logo]} resizeMode="contain" />
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
        width: '40%',
        maxWidth:500,
        height: 100,
        maxHeight: 300,
        marginBottom:20
    }
})

const mapStateToProps = ( state ) => {
  return { user : state.user }
}

const mapDispatchToProps = ( dispatch ) => {
  return { saveUser : (user) => dispatch(saveUser(user)) }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
