import {
    createStore
} from "vuex";
import {
    auth
} from "./auth.module";
import {
    user
} from "./user.module";
import {
    post
} from "./post.module";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    modules: {
        auth,
        user,
        post,
    },
    plugins: [createPersistedState()]
});
export default store;