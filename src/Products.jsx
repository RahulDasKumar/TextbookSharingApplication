"use client"

import React, { useState } from "react";

import Navbar from "./Navbar";
import { Pagination } from "./components/ui/pagination";
import { PaginationComponent } from "./PaginationComponent";
import { ProductsTable } from "./ProductsTable";

export default function ProductsPage() {

    return (
        <>
            <Navbar />
            <ProductsTable></ProductsTable>
            <PaginationComponent/>
        </>

    );
}