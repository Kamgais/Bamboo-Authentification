import {useMutation} from 'react-query'
import { UserDto } from '../api/interfaces'
import { loginUser } from '../api/services'
import useStore from '../store/AppStore'
import { useLocalStorage } from './useLocalStorage'
import { useToasts } from '../components/Toast/ToastContext'
import { useNavigate } from 'react-router-dom'

type LoginUserInput = Omit<UserDto, "id"| "email">

export const useLogin = () => {
    const appState = useStore();
    const {setItem} = useLocalStorage();
    const {pushToast} = useToasts();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (user: LoginUserInput) => loginUser(user),
        onMutate: () => {
            appState.setRequestLoading(true);
        },
        onSuccess: (data) => {
            setItem('auth-user', data);
            appState.setRequestLoading(false);
            pushToast({content: 'you are in the app', title: 'Success', type: 'success'})
            navigate('/app')
        },
        onError: (error: any) => {
            appState.setRequestLoading(false);
            pushToast({content: error.message ? error.message : error, title: 'Error', type: 'error'});
        }
    })
}