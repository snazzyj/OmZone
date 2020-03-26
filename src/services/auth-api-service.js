import config from '../config';
import TokenService from './token-service';

const AuthApiService = {
  postLogin({ email, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
    .then((data) => {
      const {authToken} = data;
      TokenService.saveAuthToken(authToken);
      return data;
    })
    },
    postUser(user) {
      return fetch(`${config.API_ENDPOINT}/auth/register`, {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => {
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      });
      
    }
  }
  
export default AuthApiService
