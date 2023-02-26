export default {
  PORT: '5000',
  DB: {
    HOST: 'localhost',
    PORT: 5432,
    USERNAME: 'postgres',
    PASSWORD: 'admin',
    NAME: 'twinkle',
  },
  TOKEN: {
    SECRET_KEY: 'SomeSecretKey321',
    EXPIRES_IN: '30d',
  },
  CLIENT_URL: 'http://localhost:3000',
};
