import React, { useState } from "react";
import { Button } from "./components/ui/button"
import image from '/images/Book Cover.png'

export default function IntroSection(){
    return  (
        <>
            <section className="w-screen h-[80vh] border border-black justify-items-center overflow-hidden	">
                <img src={image} className="w-1/2 "/>
            </section>
            <section className="w-screen h-[30vh] border border-black ">
            </section>
        </>
    );

}