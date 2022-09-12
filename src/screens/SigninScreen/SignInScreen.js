import React, {useState} from 'react';
import {View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../assets/images/election.jpg';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';
import { saveUser } from '../../actions/user';
import { apiRequest } from '../../lib/api';
import { login } from '../../lib/url';
import CustomText from '../../components/CustomText/CustomText';

const SignInScreen = (props) => {
  if(props.user.username && props.user.username !==""){
    navigation.navigate('Home');
  }
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigation = useNavigation();

    const onSignInPressed = () => {
      setIsLoading(true);

        apiRequest("", login, 'post', { username:username, password:password })
            .then((res) => {              
                props.saveUser({
                  username:username,
                  token:res.token, 
                  state:res.userDetails.stateId, 
                  lga:res.userDetails.lgaId, 
                  fullname:`${res.userDetails.firstname} ${res.userDetails.lastname}`, 
                  ward:1, 
                  pu:1});
                setIsLoading(false);
                navigation.navigate('Home');
            })
            .catch((err) => {
              setError("Failed: "+ err.statusMessage);
                setIsLoading(false);
            });

    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('Result');
    }

  return (
    <View style={[styles.root, {marginTop: height * 0.2}]}>
      <Image source={Logo} style={[styles.logo]} resizeMode="contain" />
      <CustomText value={error} color="red" bold />
      <CustomInput placeholder='Username' value={username} setValue={setUsername} />
      <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry />
      <CustomButton isLoading={isLoading} text='Sign In' onPress={onSignInPressed} />
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
