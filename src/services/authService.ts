export type AuthData = {
  access_token: string;
  refresh_token: string;
  username: string;
};
const login = (username: string, password: string): Promise<AuthData> => {
  console.log(username, password);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        access_token: JWTTokenMock,
        refresh_token: JWTTokenMock,
        username: 'richxcame',
      });
    }, 1000);
  });
};

export const authService = {
  login,
};

const JWTTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikx1Y2FzIEdhcmNleiIsImlhdCI6MTUxNjIzOTAyMn0.oK5FZPULfF-nfZmiumDGiufxf10Fe2KiGe9G5Njoa64';
