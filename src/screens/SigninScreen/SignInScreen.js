import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { connect } from 'react-redux';
import { saveUser } from '../../actions/user';
import Logo from '../../assets/images/vote.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomText from '../../components/CustomText/CustomText';
import { apiRequest } from '../../lib/api';
import { getAgentByPhone, login } from '../../lib/url';

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
                  phone:res1.partyAgentDto.phone,
                  role:res1.partyAgentDto.role
                });
                navigation.replace('Home');
              });
              setIsLoading(false);
            })
            .catch((err) => {
              setError("Failed: "+ err.statusMessage);
                setIsLoading(false);
            });

    }

  return (
    <ScrollView>
      <View style={[styles.root, {marginTop: height * 0.2}]}>
        <Image source={Logo} style={[styles.logo]} resizeMode="contain" />
        <CustomText value="PARTY AGENT LOGIN" size="20" color="#aaaaff" bold />
        <CustomText value={error} color="red" bold />
        <CustomInput placeholder='Username' value={username} setValue={setUsername} />
        <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry />
        <CustomButton isLoading={isLoading} text='LOGIN' onPress={onSignInPressed} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        marginHorizontal:2
    },
    logo: {
        height: 120,
        maxHeight: 600,
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
