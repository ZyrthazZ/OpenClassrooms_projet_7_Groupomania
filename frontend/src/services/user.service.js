//Import of axios
import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/users/';
const user = JSON.parse(localStorage.getItem('user'));

//Create the UserService class which will be called through the vue components
class UserService {
    getUserProfile() {
        return axios.get(API_URL + user.userId, {
                headers: authHeader()
            })
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    }

    updateUserProfile() {
        return axios.put(API_URL + user.userId + "/updateProfile", {
            headers: authHeader()
        })
    }

    updateUserPassword() {

    }

    deleteUserProfile() {

    }
}

//Exports the class
export default new UserService();