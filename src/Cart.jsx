"use client"

import React, { useState } from "react";
import Navbar from "./Navbar";
import { PaginationComponent } from "./PaginationComponent";
import { CartPage } from "./CartPage";

export default function Cart() {
    return (
        <>
            <Navbar />
            <CartPage/>
            <PaginationComponent/>
        </>
        );
}