import React from "react"

export default function SearchBar({ value, onChange }) {
    return (
        <div className="max-w-7xl mx-auto px-4 mt-8 mb-8"> 
            <input
                type="text"
                placeholder="Search by name, city, or category"
                className="w-full px-4 py-3 border border-black rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}