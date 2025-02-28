"use client"

import React, { useState } from "react";
import Navbar from "./Navbar";
import { PaginationComponent } from "./PaginationComponent";
import { ProductsPage } from "./ProductsPage";

export default function Products() {
    return (
        <>
            <Navbar />
            <ProductsPage/>
            <PaginationComponent/>
        </>
        );
}