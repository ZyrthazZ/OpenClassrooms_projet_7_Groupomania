//Import of axios
import axios from '../../src/config_axios';
const API_URL = 'http://localhost:8080/api/users/';

//Create the UserService class which will be called through the vue components
class UserService {
    getUserProfile() {
        const user = JSON.parse(localStorage.getItem('user'));

        return axios.get(API_URL + user.userId)
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    }

    updateUserProfile(updatedContent) {
        const user = JSON.parse(localStorage.getItem('user'));

        console.log(updatedContent)
        return axios.put(API_URL + user.userId + "/updateProfile", {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                username: updatedContent.username,
                bio: updatedContent.bio,
                profilePic: updatedContent.image
            })
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    }

    updateUserPassword() {

    }

    deleteUserProfile() {

    }
}

//Exports the class
export default new UserService();