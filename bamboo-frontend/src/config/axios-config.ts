import axios from "axios";


axios.defaults.withCredentials = true;

const instance  = axios.create({
    baseURL: 'https://bamboo-frontend.herokuapp.com/bamboo/api/v1',
    timeout:5000,
    timeoutErrorMessage: 'Client can\'t connect with Bamboo Server',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance;