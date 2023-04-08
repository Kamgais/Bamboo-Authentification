import { useLocalStorage } from "./useLocalStorage"


export const useUser = () => {
    const {getItem} = useLocalStorage();
    return getItem('auth-user' , 'object')
}