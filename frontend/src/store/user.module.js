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
        }
    }

}