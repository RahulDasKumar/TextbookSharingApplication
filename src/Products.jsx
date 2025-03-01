"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { PaginationComponent } from "./PaginationComponent";
import { ProductsPage } from "./ProductsPage";

export default function Products() {
    const [datam, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    return (
        <>
            <Navbar />
            <ProductsPage/>
            <PaginationComponent />
        </>
    );
}
