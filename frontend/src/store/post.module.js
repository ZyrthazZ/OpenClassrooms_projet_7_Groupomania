import PostService from "../services/post.service";

export const post = {
    namespaced: true,
    //Here is the state, which contains an empty object postsData, which will be filled with the data we get from the API
    state: {
        postData: ['']
    },

    actions: {
        //Function calling the getAllPosts from PostService
        getAllPosts({
            commit
        }) {
            return PostService.getAllPosts()
                .then(
                    response => {
                        commit('stockPostData', response);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    })
        }, //End of getAllPosts

        createPost({}, post) {
            return PostService.createPost(post)
                .then(post => {
                        return Promise.resolve(post);
                    },
                    error => {
                        return Promise.reject(error);
                    })
        }, //End of createPost

        updatePost({}, updatePost) {
            return PostService.updatePost(updatePost)
                .then(post => {
                        return Promise.resolve(post);
                    },
                    error => {
                        return Promise.reject(error);
                    })
        }, //End of updatePost

        deletePost({}, postId) {
            return PostService.deletePost(postId)
                .then(
                    response => {
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    })
        }, //End of deletePost

        likePost({}, postId) {
            return PostService.likePost(postId)
                .then(
                    response => {
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    })
        }, //End of likePost

        commentPost({}, comment) {
            return PostService.commentPost(comment)
                .then(
                    comment => {
                        return Promise.resolve(comment);
                    },
                    error => {
                        return Promise.reject(error);
                    })
        }, //End of commentPost

        deleteComment({}, commentId) {
            return PostService.deleteComment(commentId)
                .then(
                    response => {
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    })
        }, //End of deleteComment

        updateComment({}, updatedComment) {
            return PostService.updateComment(updatedComment)
                .then(
                    response => {
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    })
        } //End of updateComment
    },




    mutations: {
        stockPostData(state, response) {
            state.postData = response.data
        },
        erasePostData(state) {
            state.postData = null;
        }
    }

}