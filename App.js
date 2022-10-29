
import React from 'react';
//import './App.css';
import { PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Navigation from './src/navigation';


const checkPermission = async () => {
  return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
}
/*
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Kindly grant access to enable this app read your location data.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");
    } else {
      console.log("Location permission denied",granted);
    }
  } catch (err) {
    console.warn(err);
  }
};
*/
const App = () => {
  
  //useEffect(()=> SplashScreen.hide(), []);
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" />
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;