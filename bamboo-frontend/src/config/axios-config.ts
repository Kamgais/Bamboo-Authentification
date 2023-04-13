import axios from "axios";


axios.defaults.withCredentials = true;

const instance  = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    timeout:5000,
    timeoutErrorMessage: 'Client can\'t connect with Bamboo Server',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance;