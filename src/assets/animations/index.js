import React from 'react';

import LottieView from 'lottie-react-native';


export function waitingAnimation({style}) {
  return <LottieView
    autoPlay={true}
    loop={false}
    ref={animation => {
      this.animation = animation;
    }}
    style={{
      backgroundColor: 'transparent',
      height: 200,
      width: 200,
      ...style
    }}
    source={require('./21421-waiting.json')}
  />
}


export function successAnimation({style}) {
  return <LottieView
    autoPlay={true}
    loop={false}
    ref={animation => {
      this.animation = animation;
    }}
    style={{
      backgroundColor: 'transparent',
      height: 200,
      width: 200,
      ...style
    }}
    source={require('./checked-done-2.json')}
  />
}
