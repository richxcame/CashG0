import axios from 'axios';
import {API_BASE_URL} from '@env';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigateTo} from '../routes/RootNavigation';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  async config => {
    if (!config.headers.Authorization) {
      const _authData = await AsyncStorage.getItem('@AuthData');

      if (_authData) {
        const authData = JSON.parse(_authData);

        config.headers.Authorization = `Bearer ${authData.access_token}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const refreshAuthLogic = async (failedRequest: any) => {
  let authData;
  const _authData = await AsyncStorage.getItem('@AuthData');

  if (_authData) {
    authData = JSON.parse(_authData);
  }

  try {
    if (!authData) {
      throw new Error('there is not token');
    }
    const {data} = await axios.post('http://localhost:4001/token', {
      refresh_token: authData?.refresh_token || '',
      access_token: authData?.access_token || '',
    });

    const _newAuthData = {
      username: 'admin',
      access_token: data.access_token || '',
      refresh_token: data.refresh_token || '',
    };
    await AsyncStorage.setItem('@AuthData', JSON.stringify(_newAuthData));

    failedRequest.response.config.headers.Authorization =
      'Bearer ' + _newAuthData.access_token;
    return Promise.resolve();
  } catch (err) {
    await AsyncStorage.removeItem('@AuthData');
    navigateTo('Login');

    Promise.reject();
  }
};

createAuthRefreshInterceptor(api, refreshAuthLogic, {statusCodes: [401, 403]});

export default api;
