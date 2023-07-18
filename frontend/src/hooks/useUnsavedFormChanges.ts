import { useEffect } from "react"




export default function useUnsavedFormChanges(condition: boolean) {

    useEffect(() => {
        const beforeUnload = (e: BeforeUnloadEvent) => {
            if (false) {
                e.preventDefault()
                e.returnValue = true
            }
        }
        window.addEventListener('beforeunload', beforeUnload)

        return () => {

            window.removeEventListener('beforeunload', beforeUnload)

        }
        
    }, [condition])

}