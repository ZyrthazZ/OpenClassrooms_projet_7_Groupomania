import {
  defineStore
} from 'pinia'
import AuthService from '../services/auth.service'
const user = JSON.parse(localStorage.getItem('user'));
const initialState = /* user ? {status: {loggedIn: true}, user} : {status: {loggedIn: false}, user: null}; */ user

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    apple: initialState,
  }),


  /* Azertyui79* */
  actions: {
    login(user) {
      return AuthService.login(user).then(user => {
          console.log("apple" + user)
          this.loginSuccess(user);
          return Promise.resolve(user);
        },
        error => {
          this.loginFailure;
          return Promise.reject(error);
        }
      );
    }, //End of login

    logout() {
      AuthService.logout();
      this.logout;
    }, //End of logout

    register(user) {
      return AuthService.register(user).then(response => {
          this.registerSuccess;
          return Promise.resolve(response.data);
        },
        error => {
          this.registerFailure;
          return Promise.reject(error);
        }
      );
    }, //End of register

    loginSuccess(apple, user) {
      apple.status.loggedIn = true;
      apple.user = user;
    },

    loginFailure(apple) {
      apple.status.loggedIn = false;
      apple.user = null;
    },

    logout(apple) {
      apple.status.loggedIn = false;
      apple.user = null;
    },

    registerSuccess(apple) {
      apple.status.loggedIn = false;
    },

    registerFailure(apple) {
      apple.status.loggedIn = false;
    }
  },
  mutations: {

  },
})