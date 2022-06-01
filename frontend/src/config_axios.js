// Config Axios
import axios from "axios";

// Config Url
const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

// Config Token in Anthorization-Header
instance.interceptors.request.use(
    function (config) {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        if (user && user.token) {
            config.headers["Authorization"] = "Bearer " + user.token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;