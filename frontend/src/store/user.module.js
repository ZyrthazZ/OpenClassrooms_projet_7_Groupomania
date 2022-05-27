import UserService from "../services/user.service";

export const user = {
    namespaced: true,

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
                .then(
                    updatedContent => {
                        return Promise.resolve(updatedContent);
                    },
                    error => {
                        return Promise.resolve(error);
                    }
                )
        },
    }

}