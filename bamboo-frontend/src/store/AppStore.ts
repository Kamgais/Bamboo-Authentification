import { create } from "zustand"
import { UserDto } from "../api/interfaces"

type State = {
    requestLoading: boolean,
    
}


type Action = {
    setRequestLoading: (isLoading: boolean) => void
}

const useStore = create<State & Action>((set) => ({
    requestLoading: false,
    setRequestLoading: (isLoading: boolean) => set(() => ({requestLoading: isLoading}))
}))

export default useStore;