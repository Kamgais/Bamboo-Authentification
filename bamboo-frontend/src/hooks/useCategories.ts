import { useQuery } from "react-query"
import { fetchAllCategories } from "../api/services"

export const useCategories = () => {
    return useQuery({
        queryKey: 'categories',
        queryFn: () => fetchAllCategories(),
        onSuccess: (data) => {

        },
        onError: () => {
            
        }
    })
}