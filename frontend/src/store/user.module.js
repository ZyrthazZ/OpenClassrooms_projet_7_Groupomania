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
        deleteUserProfile({}, password) {
            return UserService.deleteUserProfile(password)
                .then(response => {
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error)
                    })
        }, //End of deleteUserProfile

        /* ADMIN FUNCTIONS */

        //Function calling the updateUserProfileAdmin from UserService
        updateUserProfileAdmin({
            dispatch
        }, updatedContent) {
            return UserService.updateUserProfileAdmin(updatedContent)
                .then(() => {
                    dispatch('getUserProfile')
                })
        }, //End of updateUserProfileAdmin

        //Function calling the deleteUserProfileAdmin from UserService
        deleteUserProfileAdmin({}, userId) {
            return UserService.deleteUserProfileAdmin(userId)
                .then(response => {
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error)
                    })
        }, //End of deleteUserProfile
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