import axios from 'axios';
import {API_BASE_URL} from '@env';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {defaultAuth} from '../contexts/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Set access token and refresh token
let authData = defaultAuth;
(async () => {
  try {
    const _authData = await AsyncStorage.getItem('@AuthData');

    if (_authData) {
      authData = JSON.parse(_authData);
    }
  } catch (err) {
    authData = defaultAuth;
  }
})();

api.interceptors.request.use(
  async config => {
    if (!config.headers.Authorization) {
      const _authData = await AsyncStorage.getItem('@AuthData');
      if (_authData) {
        authData = JSON.parse(_authData);

        config.headers.Authorization = `Bearer ${authData.access_token}`;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const refreshAuthLogic = (failedRequest: any) =>
  api.post('/token').then(async tokenRefreshResponse => {
    const _authData = {
      username: 'admin',
      access_token: tokenRefreshResponse.data.access_token || '',
      refresh_token: tokenRefreshResponse.data.refresh_token || '',
    };
    await AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));

    failedRequest.response.config.headers.Authorization =
      'Bearer ' + _authData.access_token;
    return Promise.resolve();
  });

createAuthRefreshInterceptor(api, refreshAuthLogic, {});

export default api;
