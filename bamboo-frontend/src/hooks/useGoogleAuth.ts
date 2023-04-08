import { useQuery } from "react-query"
import { loginWithGoogle } from "../api/services"
import { useLocalStorage } from "./useLocalStorage"
import { useToasts } from "../components/Toast/ToastContext";

export const useGoogleAuth = (enabled: boolean) => {
    const {setItem} = useLocalStorage();
    const {pushToast} = useToasts();
    return useQuery({
        queryFn: () => loginWithGoogle(),
        queryKey: 'google-login',
        onSuccess: (data) => {
            setItem('auth-user', data);
            console.log(data);
            pushToast({content: 'You are in the app', title: 'Success', type: 'success'})
            },
        onError: (error: any) => {
            pushToast({content: error.message, title: 'Error', type: 'error'})
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        enabled
    })
}