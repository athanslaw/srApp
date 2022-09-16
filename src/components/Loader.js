import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default function Loader() {
  return (
    <View>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingVertical:50,
    justifyContent: "center",
  }
});