import React, {useState} from 'react';
import {View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../assets/images/login.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { connect } from 'react-redux';
import { saveUser } from '../../actions/user';
import { apiRequest } from '../../lib/api';
import { login, getAgentByPhone } from '../../lib/url';
import CustomText from '../../components/CustomText/CustomText';

const SignInScreen = (props) => {
  const navigation = useNavigation();
  if(props.user.username && props.user.username !==""){
    navigation.navigate('Home');
  }
    const {height} = useWindowDimensions();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    const onSignInPressed = () => {
      setIsLoading(true);

        apiRequest("", login, 'post', { username:username, password:password })
            .then((res) => {          
              console.log(res)
              apiRequest(res.token, getAgentByPhone+username, 'get')
              .then((res1)=>{
                props.saveUser({
                  username:res1.partyAgentDto.id,
                  token:res.token, 
                  state:res1.partyAgentDto.stateId, 
                  lga:res1.partyAgentDto.lgaId, 
                  wardId:res1.partyAgentDto.wardId, 
                  wardName:res1.partyAgentDto.wardName, 
                  pollingUnitId:res1.partyAgentDto.pollingUnitId, 
                  pollingUnit:res1.partyAgentDto.pollingUnitName, 
                  fullname:`${res.userDetails.firstname} ${res.userDetails.lastname}`, 
                });
                setIsLoading(false);
                navigation.navigate('Home');

              })
                
            })
            .catch((err) => {
              setError("Failed: "+ err.statusMessage);
                setIsLoading(false);
            });

    }

  return (
    <View style={[styles.root, {marginTop: height * 0.2}]}>
      <Image source={Logo} style={[styles.logo]} resizeMode="contain" />
      <CustomText value="AGENT LOGIN" color="#000022" bold />
      <CustomText value={error} color="red" bold />
      <CustomInput placeholder='Username' value={username} setValue={setUsername} />
      <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry />
      <CustomButton isLoading={isLoading} text='Login' onPress={onSignInPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        marginHorizontal:10
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
