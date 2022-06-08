import UserService from "../services/user.service";

export const user = {
    namespaced: true,
    //Here is the state, which contains an empty object userData, which will be filled with the data we get from the API
    state: {
        userData: ''
    },

    actions: {
        //Function calling the getUserProfile from UserService
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
                        return Promise.reject(error);
                    })
        }, //End of getUserProfile

        //Function calling the updateUserProfile from UserService
        updateUserProfile({
            dispatch
        }, updatedContent) {
            return UserService.updateUserProfile(updatedContent)
                .then(() => {
                    dispatch('getUserProfile')
                })
        }, //End of updateUserProfile

        //Function calling the updateUserPassword from UserService
        updateUserPassword({}, updatedPassword) {
            return UserService.updateUserPassword(updatedPassword)
                .then(response => {
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error)
                    })
        }, //End of updateUserPassword

        //Function calling the deleteUserProfile from UserService
        deleteUserProfile({}, ) {

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