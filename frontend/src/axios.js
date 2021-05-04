import axios from "axios";

const instance = axios.create({
    baseURL: "https://create-your-ad.herokuapp.com/:5000"
});

export default instance;