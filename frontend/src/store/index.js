import {
    createStore
} from "vuex";
import {
    auth
} from "./auth.module";
import {
    user
} from "./user.module";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    modules: {
        auth,
        user,
    },
    plugins: [createPersistedState()]
});
export default store;