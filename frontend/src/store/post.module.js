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
        },
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