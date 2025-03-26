import React, { useState } from "react";
import { Button } from "./components/ui/button"
import { Route, Routes, Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="w-4/5 h-[20vh] border border-black flex flex-row justify-between m-auto	border-l-0 border-r-0 border-b-8">
            <section className="w-2/4 h-4/5 m-4 content-center">
                <Link to="/" ><p className="text-2xl">HOME</p></Link>
            </section>
            <section className="w-2/4 h-4/5 m-4  flex flex-row justify-evenly items-center">
                <Link to="/products"><p className="text-2xl">PRODUCTS</p></Link>
                <Link to="/listings"><p className="text-2xl">UNCC BOOKS</p></Link>
                <Link to="/login"><p className="text-2xl">LOGIN</p></Link>
                <Link to="/signup"><p className="text-2xl">SIGN UP</p></Link>
                <Link to="/profile"><p className="text-2xl">PROFILE</p></Link>
                {/* <Link to="/cart"><p className="text-3xl">Cart</p></Link> */}
            </section>
            </nav>
    );

}