import 'react-native-url-polyfill/auto';
import React from 'react';
import {Router} from './src/routes';
import {AuthProvider} from './src/contexts/Auth';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/plugins/nativeBase';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </NativeBaseProvider>
  );
};

export default App;
