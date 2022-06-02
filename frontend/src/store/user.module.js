import UserService from "../services/user.service";

export const user = {
    namespaced: true,
    /* state: {
        userData: ''
    }, */

    actions: {
        getUserProfile() {
            return UserService.getUserProfile()
                .then(
                    response => {
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
    }

}