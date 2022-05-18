import AuthService from '../services/auth.service';
// Search the user object in the localStorage
const user = JSON.parse(localStorage.getItem('user'));
// Declares the initialState of the user object : add the status object to the user object, which is loggedIn true or false
const initialState = user ? {
    status: {
        loggedIn: true
    },
    user
} : {
    status: {
        loggedIn: false
    },
    user: null
};

/* Azertyui79* */

export const auth = {
    namespaced: true,

    // Here is the state object, which contains the initialState object, 
    // and which will be modified in each function, with the associated mutation
    state: initialState,
    actions: {

        // Function calling the login function from AuthService
        login({
            commit
        }, user) {
            return AuthService.login(user).then(
                // Promise which will commit the 'loginSuccess' mutation with the user object, modifyng the state object
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                // Error which will commit the 'loginFailure' mutation 
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        }, //End of login function

        // Function calling the logout function from AuthService
        logout({
            commit
        }) {
            AuthService.logout();
            // Commit the 'logout' mutation
            commit('logout');
        }, //End of logout function

        // Function calling the register function from AuthService
        register({
            commit
        }, user) {
            return AuthService.register(user).then(
                response => {
                    // Promise which will commit the 'registerSuccess' mutation 
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    // Error which will commit the 'registerFailure' mutation 
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        } //End of register function
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};