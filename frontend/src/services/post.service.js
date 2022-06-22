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

    //likePost, this function will allow the user to add a like or delike to a post
    likePost(postId) {
        return axiosService.post(API_URL + postId + "/like")
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of likePost

    //commentPost, this function will create a comment related to a post
    commentPost(comment) {
        console.log(comment)
        console.log(comment.content.content)
        
        return axiosService.post(API_URL + "comments/" + comment.postId + "/new", comment.content, {
                content: comment.content.content
            })
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of commentPost

    //deleteComment, this function will delete a comment related to a post
    deleteComment(commentId) {
        console.log(commentId)

        return axiosService.delete(API_URL + "comments/" + commentId + "/deleteComment")
            .then(response => {
                console.log(response)
                return response
            })
    } //End of deleteComment

    //updateComment, this function will update a comment related to a post
    updateComment(updatedComment) {
        console.log(updatedComment)

        return axiosService.put(API_URL + "comments/" + updatedComment.commentId + "/updateComment", updatedComment, )
            .then(response => {
                console.log(response)
                return response
            })
            .catch()
    } //End of updateComment
}

//Exports the class
export default new PostService();