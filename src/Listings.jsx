"use client"

import React, { useState } from "react";
import Navbar from "./Navbar";
import { ListingsPage } from "./ListingsPage";


export default function Listings() {
    return (
        <>
            <Navbar />
            <ListingsPage/>
        </>
        );
}