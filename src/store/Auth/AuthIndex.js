import AuthGetters from './AuthGetters';
import AuthMutations from './AuthMutations';
import AuthActions from './AuthActions';

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  getters: AuthGetters,
  mutations: AuthMutations,
  actions: AuthActions,
};
