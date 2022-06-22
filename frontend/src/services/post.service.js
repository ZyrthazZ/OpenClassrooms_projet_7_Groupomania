//Import of axios
import axios from 'axios';
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
    } //End of getAllPosts

    //createPost, this function will create a post and the API will register it in the DBB
    createPost(post) {
        console.log(post)

        return axiosService.post(API_URL + 'new', post, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of createPost

    //updatePost, this function will update a post and register the modification in the DBB
    updatePost(postUpdate) {
        console.log(postUpdate)

        return axiosService.put(API_URL + postUpdate.postId + "/updatePost", postUpdate, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            .then(response => {
                console.log(response);
                return response
            })
            .catch()
    } //End of updatePost

    //deletePost, this function will delete a post and erase it from the DBB
    deletePost(postId) {
        return axiosService.delete(API_URL + postId + "/deletePost")
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of deletePost

    likePost(postId) {

        return axiosService.post(API_URL + postId + "/like")
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of likePost

    commentPost(comment) {
        console.log(comment)

        return axiosService.post(API_URL + "comments/" + comment.postId + "/new", comment, {
                content: comment.content
            })
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of commentPost
}

//Exports the class
export default new PostService();