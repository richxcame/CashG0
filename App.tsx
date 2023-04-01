import React from 'react';
import {Router} from './src/routes';
import {AuthProvider} from './src/contexts/Auth';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </NativeBaseProvider>
  );
};

export default App;
