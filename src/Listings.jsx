"use client"

import React, { useState } from "react"
import Navbar from "./Navbar"
import SearchBar from "./SearchBar"
import { ListingsPage } from "./ListingsPage"

export default function Listings() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <>
            <Navbar />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <ListingsPage searchQuery={searchQuery} />
        </>
    )
}
