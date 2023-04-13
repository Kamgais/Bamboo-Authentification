import { useQuery } from "react-query"
import { getUserById } from "../api/services"


export const useSingleUser = (enabled: boolean, id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
        onSuccess: () => {
            console.log('loaded user')
        },
        onError: () => {

        },
        enabled: enabled

    })
}