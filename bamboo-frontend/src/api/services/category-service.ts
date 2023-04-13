import instance from "../../config/axios-config"

export const fetchAll = async() => {
    try {
        const responseFromApi = await instance.get('/categories');
        const {data} = responseFromApi;
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
}