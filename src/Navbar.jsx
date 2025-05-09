import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ToastContext";
import { useCart } from "@/context/CartContext"; // Update path if needed
import cartImg from "/images/cart.png";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { toggleCart } = useCart(); // Access cart toggle from context

    useEffect(() => {
        const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        showToast("Logged out successfully", "success");
        navigate("/");
    };

    return (
        <nav className="w-4/5 h-[20vh] border border-black flex flex-row justify-between m-auto border-l-0 border-r-0 border-b-8">
            <section className="w-2/4 h-4/5 m-4 content-center">
                <Link to="/"><p className="text-2xl">HOME</p></Link>
            </section>

            <section className="w-full h-4/5 m-4 flex flex-row justify-between items-center px-8">
                <Link to="/products"><p className="text-2xl">PRODUCTS</p></Link>
                <Link to="/listings"><p className="text-2xl">UNCC BOOKS</p></Link>

                {isLoggedIn ? (
                    <>
                        <Link to="/profile"><p className="text-2xl">PROFILE</p></Link>
                        <button
                            onClick={handleLogout}
                            className="text-2xl text-black hover:underline transition"
                        >
                            LOGOUT
                        </button>
                        <button
                            onClick={toggleCart} // Opens sidebar instead of routing
                            className="p-2 hover:opacity-80 transition"
                        >
                            <img src={cartImg} alt="Cart" className="w-8 h-8" />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login"><p className="text-2xl">LOGIN</p></Link>
                        <Link to="/signup"><p className="text-2xl">SIGN UP</p></Link>
                    </>
                )}
            </section>
        </nav>
    );
}
