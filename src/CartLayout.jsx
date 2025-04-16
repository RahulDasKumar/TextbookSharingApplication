// CartLayout.jsx
import React from "react"
import Navbar from "./Navbar"
import { CartSidebar } from "./CartSidebar"

export default function CartLayout({ children }) {
    return (
        <>
            <CartSidebar />
            {children}
        </>
    )
}