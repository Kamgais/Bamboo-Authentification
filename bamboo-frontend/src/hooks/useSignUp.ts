import {useMutation} from 'react-query';
import { UserDto } from '../api/interfaces';
import { postUser } from '../api/services';
import {default as useStore} from '../store/AppStore';
import { useLocalStorage } from './useLocalStorage';
import { useToasts } from '../components/Toast/ToastContext';
import { useNavigate } from 'react-router-dom';


type CreateUserInput = Omit<UserDto, "id">

export const useSignUp = () => {
    const appState = useStore();
    const {pushToast} = useToasts();
    return useMutation({
        mutationFn: (user: CreateUserInput) => postUser(user),
        onMutate: () => {
            appState.setRequestLoading(true);
        },
        onSuccess: (data) => {
           // setItem('auth-user', data);
            pushToast({content:'Account created', title: 'Success', type: 'success'})
            appState.setRequestLoading(false);
            
        },
        onError: (error: any) => {
            console.log(error.message);
            appState.setRequestLoading(false);
            pushToast({content: error.message? error.message :'errror occurs', title: 'Error', type: 'error'})
        }
    })
}