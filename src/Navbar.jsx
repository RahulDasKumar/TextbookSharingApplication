import React, { useState } from "react";
import { Button } from "./components/ui/button"


export default function Navbar(){
    return  (
        <nav className="w-screen h-[20vh] border border-black flex flex-row justify-between">
            <section className="w-2/4 h-4/5 m-4 border border-black content-center">
                <a href="#" className=" ml-8">Store</a>
            </section>
            <section className="w-2/4 h-4/5 m-4 border border-black flex flex-row justify-evenly items-center">
                <Button>Products</Button>
                <Button>About us</Button>
                <Button>Sign in</Button>
                <Button>Cart</Button>
            </section>
            </nav>
    );

}