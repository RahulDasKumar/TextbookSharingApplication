import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null)

    const showToast = (message, type = "success") => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000) // auto-dismiss
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
                    <div
                        className={`px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300
                            ${toast.type === "success" ? "bg-black" : "bg-red-600"}`}
                    >
                        {toast.message}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext)
