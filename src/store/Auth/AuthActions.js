let timer;

export default {
  async authenticate(context, payload) {
    const singupUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9jIAUfo6SOwCIQ9yG6GDJ2ZGX0ZCOgW8';
    const loginUrl =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9jIAUfo6SOwCIQ9yG6GDJ2ZGX0ZCOgW8';
    let fetchUrl = '';

    payload.mode == 'login' ? (fetchUrl = loginUrl) : (fetchUrl = singupUrl);

    const response = await fetch(fetchUrl, {
      method: 'POST',
      Headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.error.message ||
          'Failed to ' + payload.mode + ', try again...'
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    //const expiresIn = 3 * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      userId: responseData.localId,
      token: responseData.idToken,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    } else {
      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);
    }

    if (token && userId) {
      context.commit('setUser', {
        userId: userId,
        token: token,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
