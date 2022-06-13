//Import of axios
import axiosService from '../../src/config_axios';

const API_URL = 'http://localhost:8080/api/posts/';

//Create the PostService class which will be called through the vue components
class PostService {
    //getAllPosts, this function will search the posts in the API and return them
    getAllPosts() {

        return axiosService.get(API_URL + 'listAllPosts')
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    }
}

//Exports the class
export default new PostService();