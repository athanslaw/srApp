import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';

import configureStore from './src/store/configureStore';

const store = configureStore();

const RNRedux = () => (
  <StoreProvider store = { store }>
    <App />
  </StoreProvider>
)

AppRegistry.registerComponent(appName, () => RNRedux);