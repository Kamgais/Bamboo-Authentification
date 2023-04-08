import { useQuery } from "react-query"
import { successLoginHandler } from "../api/services"
import { useLocalStorage } from "./useLocalStorage"
import { useToasts } from "../components/Toast/ToastContext";
import { useNavigate } from "react-router-dom";

export const useSuccessAuth = (enabled: boolean) => {
    const {setItem} = useLocalStorage();
    const {pushToast} = useToasts();
    const navigate = useNavigate()
    return useQuery({
        queryFn: () => successLoginHandler(),
        queryKey: 'google-login',
        onSuccess: (data) => {
            setItem('auth-user', data);
            console.log(data);
            pushToast({content: 'You are in the app', title: 'Success', type: 'success'});
            navigate('/app')
            },
        onError: (error: any) => {
            pushToast({content: error.message, title: 'Error', type: 'error'})
        },
        refetchOnMount: false,
        refetchOnWindowFocus:false,
        enabled
    })
}