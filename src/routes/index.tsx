import React from 'react';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../contexts/Auth';
import {Loading} from '../components/Loading';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';

export const Router = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      {authData.isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
