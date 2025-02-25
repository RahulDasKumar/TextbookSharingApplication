"use client"

import React, { useState } from "react";

import Navbar from "./Navbar";

export default function ProductsPage() {
    const [date, setDate] = useState(new Date());

    return (
        <>
            <Navbar />
        </>

    );
}