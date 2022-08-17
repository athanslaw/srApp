import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ResultScreen from './src/screens/Home/ResultScreen/ResultScreen.js';

import SignInScreen from './src/screens/SigninScreen/SignInScreen';


const App = () => {

  return (
    <SafeAreaView style={styles.root}>
    <ResultScreen />
    <SignInScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
