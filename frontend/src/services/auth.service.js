//Import of axios
import axios from '../../src/config_axios';

const API_URL = 'http://localhost:8080/api/users/';

//Create the AuthService class which will be called through the vue components
class AuthService {
    //Login function, send the email and password to the URL with post method, then sets the user item found in the localStorage
    login(user) {
        return axios.post(API_URL + 'login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response)
                if (response.data.token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
            })
            .catch()
    }

    //Logout function, simply removes the user object from the localStorage
    logout() {
        localStorage.removeItem('user');
    }

    //Register function, send the username, email and password to the URL with the post method
    register(user) {
        return axios.post(API_URL + 'register', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

//Exports the class
export default new AuthService();