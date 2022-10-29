import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function GetCurrentLocation() {
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        console.log("ATHANS:", JSON.stringify(pos));
        setPosition(JSON.stringify(pos));
      },
      (error) => Alert.alert('GetCurrentPosition Error', "Kindly make sure your location is turned on."),
      { enableHighAccuracy: true }
    );
  };

  const [position, setPosition] = useState(null);
  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <View>
      {/* <Text>
        <Text style={styles.title}>Current position: </Text>
        {position}
      </Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});