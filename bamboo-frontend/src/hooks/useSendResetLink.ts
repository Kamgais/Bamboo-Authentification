import { useMutation } from "react-query"
import { sendResetPasswordLink } from "../api/services";
import useStore from "../store/AppStore";
import { useToasts } from "../components/Toast/ToastContext";

type ForgotPasswordInput = {
    email: string;
}
export const useSendResetLink = () => {
    const appState = useStore();
    const {pushToast} = useToasts();
    return useMutation({
        mutationFn: (model: ForgotPasswordInput) => sendResetPasswordLink(model),
        onMutate: () => {
            appState.setRequestLoading(true);
        },
        onSuccess: (data:any) => {
            appState.setRequestLoading(false);
            pushToast({content: data.message, title: 'Success', type: 'success'})
        },
        onError: (error: any) => {
            appState.setRequestLoading(false);
            pushToast({content: error.message, title: 'Error', type: 'error'})
        }
    })
}