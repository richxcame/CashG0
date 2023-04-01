import api from '../plugins/axios';

export type AuthData = {
  username: string;
  access_token: string;
  refresh_token: string;
};

const login = async (username: string, password: string): Promise<AuthData> => {
  try {
    console.log({username, password});

    const {data} = await api.post('/login', {
      username,
      password,
    });
    return {
      username: 'admin',
      access_token: data.access_token,
      refresh_token: data.access_token,
    };
  } catch (err) {
    console.log(err);
    return {
      username: '',
      access_token: '',
      refresh_token: '',
    };
  }
};

export const authService = {
  login,
};
