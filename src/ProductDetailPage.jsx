import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "@/context/CartContext";
import placeholderImage from '/images/Book Cover.png'

export function ProductDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const { addToCart } = useCart();

    useEffect(() => {
        fetch("https://four155-project-pyflask.onrender.com/api/listings")
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p._id === id)
                if (found) {
                    console.log("Product ID:", found._id)
                    setProduct(found)
                } else {
                    console.log("Product not found with ID:", id)
                }
            })
            .catch(err => console.error("Error fetching listing:", err))
    }, [id])
    

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this listing?")
        if (!confirm) return

        try {
            const response = await fetch(`https://four155-project-pyflask.onrender.com/api/listings/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                alert("Listing deleted successfully!")
                navigate("/listings")
            } else {
                const data = await response.json()
                alert(data.message || "Failed to delete listing.")
            }
        } catch (error) {
            console.error("Delete failed:", error)
            alert("An error occurred while trying to delete the listing.")
        }
    }

    if (!product) return <div className="p-10 text-center">Loading...</div>

    return (
        <div className="flex justify-center items-center py-12 bg-white">
            <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl border border-black rounded-lg shadow-lg p-6 bg-white text-black">
                <div className="flex-shrink-0">
                    <img
                        src={product.Image && !product.Image.includes('/path_to') ? product.Image : placeholderImage}
                        alt={product.Name}
                        className="w-full md:w-[300px] h-auto object-cover rounded border"
                    />
                </div>

                <div className="flex flex-col justify-center w-full">
                    <h1 className="text-3xl font-bold mb-4">{product.Name}</h1>
                    <p className="text-2xl font-semibold text-black mb-2">${Number(product.Price).toFixed(2)}</p>
                    <p className="text-gray-700 mb-1">City: <span className="font-medium">{product.City}</span></p>
                    <p className="italic text-gray-600 mb-6">Category: {product.Category}</p>
                    <p className="text-sm text-gray-400 mb-6">Product ID: {product._id}</p>

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-fit"
                    >
                        Delete Listing
                    </button>
                    <button
                        onClick={() => addToCart(product)}
                        className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition w-fit"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
