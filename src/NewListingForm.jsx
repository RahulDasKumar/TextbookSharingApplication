import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewListingForm() {
    const [form, setForm] = useState({
        Name: "",
        Price: "",
        City: "",
        Category: "",
        Image: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://four155-project-pyflask.onrender.com/api/listings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    Price: parseFloat(form.Price), // Convert price to number
                })
            });

            if (!res.ok) throw new Error("Failed to create listing");

            navigate("/listings"); // Redirect after success
        } catch (error) {
            console.error("Error creating listing:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto py-12 px-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Create a New Listing</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="Name"
                    placeholder="Book Title"
                    value={form.Name}
                    onChange={handleChange}
                    required
                    className="w-full border border-black rounded px-4 py-2"
                />
                <input
                    type="number"
                    name="Price"
                    placeholder="Price"
                    value={form.Price}
                    onChange={handleChange}
                    required
                    className="w-full border border-black rounded px-4 py-2"
                />
                <input
                    type="text"
                    name="City"
                    placeholder="City"
                    value={form.City}
                    onChange={handleChange}
                    required
                    className="w-full border border-black rounded px-4 py-2"
                />
                <input
                    type="text"
                    name="Category"
                    placeholder="Category (e.g., fiction, science)"
                    value={form.Category}
                    onChange={handleChange}
                    required
                    className="w-full border border-black rounded px-4 py-2"
                />
                <input
                    type="text"
                    name="Image"
                    placeholder="Image URL (optional)"
                    value={form.Image}
                    onChange={handleChange}
                    className="w-full border border-black rounded px-4 py-2"
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                >
                    Submit Listing
                </button>
            </form>
        </div>
    );
}
