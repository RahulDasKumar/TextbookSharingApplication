import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function ProductDetailPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetch("https://four155-project-pyflask.onrender.com/api/products")
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p._id === id)
                setProduct(found)
            })
            .catch(err => console.error("Error fetching product:", err))
    }, [id])

    if (!product) return <div className="p-10 text-center">Loading...</div>

    return (
        <div className="flex justify-center py-10 bg-white">
            <div className="w-full max-w-md p-6 border border-black rounded-lg shadow-lg text-black bg-white">
                <h1 className="text-3xl font-bold mb-4 text-center">{product.name}</h1>
                <p className="text-xl font-semibold mb-2 text-center">${product.price.toFixed(2)}</p>
                <p className="text-center text-sm text-gray-600 mb-4">Stock: {product.stock}</p>
                <div className="text-sm text-gray-500 text-center">Product ID: {product._id}</div>
            </div>
        </div>
    )
}
