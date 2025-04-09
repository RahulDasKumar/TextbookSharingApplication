"use client"

import React, { useState } from "react";
import Navbar from "./Navbar";
import { CartPage } from "./CartPage";

export default function Cart() {
    return (
        <>
            <Navbar />
            <CartPage/>
        </>
        );
}