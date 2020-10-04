import axios from 'axios';

// Base URL to send the requst to get different types of Movies and shows
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;