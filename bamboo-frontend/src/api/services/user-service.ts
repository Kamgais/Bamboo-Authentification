import instance from "../../config/axios-config"


export const getUserById = async(id: number) => {
    try {
        const responseFromApi = await instance.get(`/users/${id}`);
        const {data} = responseFromApi;
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error)
    }
}