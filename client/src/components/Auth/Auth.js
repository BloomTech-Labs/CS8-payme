import auth0 from 'auth0-js';
import axios from 'axios';
import { authError } from '../../actions/auth';

export default class Auth {
  auth = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: window.location.href,
    responseType: 'token id_token',
    scope: 'openid profile email',
    // audience: 'GiveMeMyMoney',
  });

  login = () => {
    this.auth.authorize();
  };

  handleAuthentication = history => dispatch => {
    console.log('in `handleAuthentication`');
    this.auth.parseHash((err, authResults) => {
      console.log('in `parseHash`');
      if (authResults && authResults.accessToken && authResults.idToken) {
        // const expiresAt = JSON.stringify(authResults.expiresIn * 1000 + new Date().getTime());
        console.log('in `if` statement');
        localStorage.setItem('access_token', authResults.accessToken);
        localStorage.setItem('id', authResults.idToken);
        window.location.hash = '';
        // localStorage.setItem('expires_at', expiresAt);
        axios
          .get('/api/auth0', {
            headers: { Authorization: `bearer ${localStorage.getItem('id')}` },
          })
          .then(res => {
            localStorage.setItem('id', res.data.token);
            axios.defaults.headers.common.Authorization = `bearer ${res.data.token}`;
            console.log(res);
            // dispatch({ type: 'USER_INVOICES', payload: res.data.user.invoices });
            // dispatch({ type: 'USER', payload: res.data.user });
            // history.push('/invoices');
          })
          .catch(err => {
            if (err) console.log('error: ', err);
            if (err.response) {
              dispatch(authError('Username/Password invalid.'));
            }
          });
      }
      if (err) {
        console.log(err);
      }
    });
  };

  logIt = () => {
    console.log(process.env.REACT_APP_AUTH0_DOMAIN);
  };
}
