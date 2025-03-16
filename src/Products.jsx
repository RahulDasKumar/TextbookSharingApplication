import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ProductsPage } from "./ProductsPage";
import { PaginationComponent } from "./PaginationComponent";

const Products = () => {

    return (
        <>
        <Navbar/>
        <ProductsPage/>
        <PaginationComponent/>
        </>
    );
};

export default Products;