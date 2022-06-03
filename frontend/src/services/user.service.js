//Import of axios
import axiosService from '../../src/config_axios';
const API_URL = 'http://localhost:8080/api/users/';

//Create the UserService class which will be called through the vue components
class UserService {
    getUserProfile() {
        const user = JSON.parse(localStorage.getItem('user'));

        return axiosService.get(API_URL + user.userId)
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    }

    updateUserProfile(updatedContent) {
        const user = JSON.parse(localStorage.getItem('user'));

        console.log(updatedContent);
        let data = new FormData();
        data.append('username', updatedContent.username);
        data.append('bio', updatedContent.bio);
        data.append('image', updatedContent.image);
        console.log(...data)
        return axiosService.put(API_URL + user.userId + "/updateProfile", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then(response => {
                console.log(response);
                
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