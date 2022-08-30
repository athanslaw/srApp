/*
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ResultScreen from './src/screens/Home/ResultScreen/ResultScreen.js';

import SignInScreen from './src/screens/SigninScreen/SignInScreen';
import Navigation from './src/navigation';


const App = () => {

  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
    backgroundColor:'#000000'
  },
});

export default App;
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { changeCount } from './src/actions/counts';


class App extends Component {
  decrementCount() {
    let { count, changeCount } = this.props;
    count--;
    changeCount(count);
  }
  incrementCount() {
    console.log("HEre")
    let { count, changeCount } = this.props;
    count++;
    changeCount(count);
  }
  render() {
    const { count } = this.props;
    return (
      <View styles={styles.container}>
        <Button
          title="increment"
          onPress={() => this.incrementCount()}
        />
        <Text>{count}</Text>
        <Button
          title="decrement"
          onPress={() => this.decrementCount()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({
  count: state.user.count,
});

function mapDispatchToProps(dispatch) {
  return {
    changeCount: (user) => dispatch(changeCount(user))
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
