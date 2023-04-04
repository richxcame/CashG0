import api from '../plugins/axios';

export type AuthData = {
  username: string;
  isLoggedIn: boolean;
  access_token: string;
  refresh_token: string;
};

const login = async (username: string, password: string): Promise<AuthData> => {
  try {
    const {data} = await api.post('/login', {
      username,
      password,
    });
    return {
      username: 'admin',
      isLoggedIn: true,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  } catch (err) {
    return {
      username: '',
      isLoggedIn: false,
      access_token: '',
      refresh_token: '',
    };
  }
};

export const authService = {
  login,
};
