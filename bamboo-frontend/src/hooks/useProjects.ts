import { useQuery } from "react-query"
import { fetchAll } from "../api/services"


export const useProjects = () => {

    return useQuery({
        queryKey: 'projects',
        queryFn: () => fetchAll(),
        onSuccess: (data) => {

            console.log('projects loaded', data)
        },
        onError: (error) => {

        },
        cacheTime: 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })
}