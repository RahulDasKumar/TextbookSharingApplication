"use client"

import React, { useState } from "react";
import Navbar from "./Navbar";
import { ProductsPage } from "./ProductsPage";


export default function Products() {
    return (
        <>
            <Navbar />
            <ProductsPage/>
        </>
        );
}