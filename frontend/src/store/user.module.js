import UserService from "../services/user.service";

export const user = {
    namespaced: true,
    state: {
        userData: ''
    },

    actions: {

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
        }, //End of getUserProfile

        updateUserProfile(updatedContent) {
            return UserService.updateUserProfile(updatedContent)
                .then()
        }, //End of updateUserProfile

        updateUserPassword() {

        }, //End of updateUserPassword
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