import { useMutation } from "react-query"
import { logoutHandler } from "../api/services"
import useStore from "../store/AppStore"
import { useToasts } from "../components/Toast/ToastContext";
import { useLocalStorage } from "./useLocalStorage";


export const useLogout = () => {
    const appState = useStore();
    const {pushToast} = useToasts();
    const {removeItem} = useLocalStorage();
    return useMutation({
        mutationFn: () => logoutHandler(),
        onMutate: () => {
            appState.setRequestLoading(true);

        },
        onSuccess: (data) => {
            appState.setRequestLoading(false);
            removeItem('auth-user')
            pushToast({content: data.message , title: 'Success' , type: 'success' })

        },
        onError: (error: any) => {
            appState.setRequestLoading(false);
            pushToast({content: error.message, title: 'Error', type: 'error'})
        }
    })
}