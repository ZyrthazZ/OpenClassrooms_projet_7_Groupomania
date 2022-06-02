import UserService from "../services/user.service";

export const user = {
    namespaced: true,
    state: {
        userData: ''
    },

    actions: {
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

        getUserProfile({
            commit
        }) {
            return UserService.getUserProfile()
                .then(
                    response => {
                        commit('stockUserData', response);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.resolve(error);
                    })
        },

        updateUserProfile(updatedContent) {
            return UserService.updateUserProfile(updatedContent)
                .then()
        },
    },

    mutations: {
        stockUserData(state, response) {
            state.userData = response.data
        },
        eraseUserData(state) {
            state.userData = null;
        }
    }

}