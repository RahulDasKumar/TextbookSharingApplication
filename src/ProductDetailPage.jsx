import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import placeholderImage from '/images/Book Cover.png'

export function ProductDetailPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetch("https://four155-project-pyflask.onrender.com/api/listings")
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p._id === id)
                setProduct(found)
            })
            .catch(err => console.error("Error fetching listing:", err))
    }, [id])

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
                    <p className="text-2xl font-semibold text-black mb-2">${product.Price.toFixed(2)}</p>
                    <p className="text-gray-700 mb-1">City: <span className="font-medium">{product.City}</span></p>
                    <p className="italic text-gray-600 mb-6">Category: {product.Category}</p>
                    <p className="text-sm text-gray-400">Product ID: {product._id}</p>
                </div>
            </div>
        </div>
    )
}
