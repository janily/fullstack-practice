import * as LoginServices from '../services/login';

export default {
  namespace: 'login',
  state: {
    info: {},
  },
  effects: {
    *login({ payload }, { call }) {
      return yield call(LoginServices.login, payload);
    },
  },
};
