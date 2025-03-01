import React, { useState } from "react";
import { Button } from "./components/ui/button"
import { Route,Routes,Link } from "react-router-dom";
import Login from "./Login";
import Products from "./Products";

export default function Navbar(){
    return  (
        <nav className="w-screen h-[20vh] border border-black flex flex-row justify-between">
            <section className="w-2/4 h-4/5 m-4 border border-black content-center">
                <a href="#" className=" ml-8">Store</a>
            </section>
            <section className="w-2/4 h-4/5 m-4 border border-black flex flex-row justify-evenly items-center">
                <Button><Link to="/products">Products</Link></Button>
                <Button>About us</Button>
                <Button><Link to="/login">Login</Link></Button>
                <Button><Link to="/signup">Sign Up</Link></Button>
                <Button><Link to="/cart">Cart</Link></Button>
            </section>
            </nav>
    ); 

}