/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import codePush from "react-native-code-push";
import PortalsApp from './src/App';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';

const store = configureStore();
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const App = () => {
  return (
    <Provider store={store}>
      <PortalsApp />
    </Provider>
  );
};

export default codePush(codePushOptions)(App);
