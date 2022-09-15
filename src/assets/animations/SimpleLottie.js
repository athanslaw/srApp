import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function SimpleLottie() {
  return (
    <View>
      <LottieView
            autoPlay={true}
            loop={false}
            ref={animation => {
                this.animation = animation;
            }}
        source={require("./21421-waiting.json")}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
  },
});