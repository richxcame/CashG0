import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthData, authService} from '../services/authService';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  login(): Promise<void>;
  logout(): void;
};

// Create the Auth Context with the data type specified and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const login = async () => {
    const _authData = await authService.login('richxcame', 'test123');

    setAuthData(_authData);

    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
  };

  const logout = async () => {
    setAuthData(undefined);

    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    <AuthContext.Provider value={{authData, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};