import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization:
            typeof localStorage !== "undefined"
                ? "Bearer " + localStorage.getItem("token")
                : null,
    },
});

export default instance;
