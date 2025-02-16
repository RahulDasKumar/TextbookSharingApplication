import React, { useState } from "react";
import { Button } from "./components/ui/button"


export default function IntroSection(){
    return  (
        <>
            <section className="w-screen h-[80vh] border border-black justify-items-center overflow-hidden	">
                <img src="src\images\intro\Book Cover.png" alt="textbook" className="w-1/2 "/>
            </section>
            <section className="w-screen h-[30vh] border border-black ">
            </section>
        </>
    );

}