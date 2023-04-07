
export const useLocalStorage = () => {
   
    const setItem = (key: string ,item: string | Object) => {
        typeof item === 'string' && localStorage.setItem(key, item);
        typeof item === 'object' && localStorage.setItem(key, JSON.stringify(item))
    }

    const getItem = (key: string, type: string = 'string') => {
       switch(type) {
        case 'string' : return localStorage.getItem(key);
        case 'object' : return JSON.parse(localStorage.getItem(key)!);
        default : return localStorage.getItem(key);
       }
    }

    const removeItem = (key:string) => {
        localStorage.removeItem(key);
        return {message : `removed item with key ${key} from Localstorage`}
    }


    return {setItem, removeItem, getItem}
}