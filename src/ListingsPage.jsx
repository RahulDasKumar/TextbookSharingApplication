import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./components/ui/card";
import placeholderImage from "/images/Book Cover.png";

export function ListingsPage({ searchQuery = "" }) {
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState("");
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    useEffect(() => {
        fetch("https://four155-project-pyflask.onrender.com/api/listings")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching listings:", err));
    }, []);

    const handlePriceFilter = (price) => {
        setPriceFilter(price);
    };

    const filteredProducts = products.filter((product) => {
        const search = searchQuery.toLowerCase();
        const matchesSearch =
            product.Name.toLowerCase().startsWith(search) ||
            product.City.toLowerCase().startsWith(search) ||
            product.Category.toLowerCase().startsWith(search);

        const matchesPrice =
            !priceFilter || parseFloat(product.Price) <= parseFloat(priceFilter);

        return matchesSearch && matchesPrice;
    });

    return (
        <section className="bg-white pt-4 pb-12 px-4">
            {/* Price Filter */}
            <div className="max-w-7xl mx-auto mb-6 px-2">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Dropdown Filter */}
                    <select
                        onChange={(e) => handlePriceFilter(e.target.value)}
                        className="border border-black rounded px-4 py-2 w-full md:w-auto"
                    >
                        <option value="">All Prices</option>
                        <option value="10">Under $10</option>
                        <option value="25">Under $25</option>
                        <option value="50">Under $50</option>
                        <option value="100">Under $100</option>
                    </select>

                    {/* Button - Only show if logged in */}
                    {isLoggedIn && (
                        <button
                            onClick={() => navigate("/listings/new")}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition w-full md:w-auto"
                        >
                            + Create Listing
                        </button>
                    )}
                </div>
            </div>


            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {filteredProducts.map((product) => (
                    <Card
                        key={product._id}
                        className="border border-black rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-200"
                        onClick={() => navigate(`/product/${product._id}`)}
                    >
                        <CardContent className="p-4 flex flex-col h-full text-black">
                            <img
                                src={
                                    product.Image &&
                                    !product.Image.includes("/path_to")
                                        ? product.Image
                                        : placeholderImage
                                }
                                alt={product.Name}
                                className="w-full h-50 object-cover rounded-md border mb-4"
                            />
                            <div className="text-center mb-2">
                                <h2 className="text-lg font-bold">{product.Name}</h2>
                                <p className="text-md font-semibold">${Number(product.Price).toFixed(2)}</p>
                            </div>
                            <div className="text-sm text-center text-gray-600">
                                <p>{product.City}</p>
                                <p className="italic">{product.Category}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
