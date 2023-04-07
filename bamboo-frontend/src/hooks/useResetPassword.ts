import { useMutation } from "react-query"
import { resetPassword } from "../api/services"
import useStore from "../store/AppStore";
import { useToasts } from "../components/Toast/ToastContext";

type ResetPasswordInput = {
    password: string;
}

type Input = {
    body: ResetPasswordInput,
    token: string
}

export const useResetPassword = () => {
    const appState = useStore();
    const {pushToast} = useToasts();
    return useMutation({
        mutationFn: (model: Input) => resetPassword(model.body, model.token),
        onMutate: () => {
            appState.setRequestLoading(true);
        },
        onSuccess: () => {
            appState.setRequestLoading(false);
            pushToast({content: 'Password successfully reset', title: 'Success', type: 'success'})
        },
        onError: (error: any) => {
            appState.setRequestLoading(false);
            pushToast({content: error.message, title: 'Error', type: 'error'})
        }
    })
}