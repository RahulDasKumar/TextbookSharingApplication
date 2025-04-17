import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from "./components/ToastContext"
import { CartProvider } from "./context/CartContext"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ToastProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </ToastProvider>
    </StrictMode>
)
