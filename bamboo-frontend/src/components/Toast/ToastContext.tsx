import { PropsWithChildren, createContext, useState, useContext } from "react"
import Toast from "./Toast";
import { AnimatePresence, motion } from "framer-motion";


const defaultValue = {
    toasts: [],
    setToasts: () => {}
}


const ToastContext = createContext<any>(defaultValue);

type ToastType = {
    title?: string,
    content:string,
    type?: "success" | "info" | "error" | "default"
}

export function ToastContextProvider({children}: PropsWithChildren) {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    return (
        <ToastContext.Provider value={{toasts,setToasts}}>
            <Toasts/>
            {children}
        </ToastContext.Provider>
    )

}


export function useToasts() {
    const {setToasts, toasts} = useContext(ToastContext);

    return {
        pushToast: (toast: ToastType) => {
            setToasts((v: any) => [...v, toast])
        },
        removeToast: (content: string) => {
            const newToasts = toasts.filter((t: any) => t.content !== content)
            setToasts(newToasts);
        }
    }
}

function Toasts() {
    const {toasts} = useContext(ToastContext);

    return (
       
            <div className="toast-container">
            <AnimatePresence>
             {toasts.map((toast: any,k:any) => (
                <motion.div
                key={k}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1 , x: 0}}
                exit={{ opacity: 0 , x: 30}}
                >
                <Toast  {...toast} />
                </motion.div>
             ))}
             </AnimatePresence>
        </div>
        
        
    )
    


}