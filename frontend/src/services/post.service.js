//Import of axios
import axios from 'axios';
import axiosService from '../../src/config_axios';

const API_URL = 'http://localhost:8080/api/posts/';

//Create the PostService class which will be called through the vue components
class PostService {
    //Login function, send the email and password to the URL with post method, then sets the user item found in the localStorage
    login(user) {
        console.log(user)
        return axiosService.post(API_URL + 'login', {
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

    //getAllPosts, this function will search the posts in the API and return them
    getAllPosts() {

        return axiosService.get(API_URL)
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    }
}

//Exports the class
export default new PostService();