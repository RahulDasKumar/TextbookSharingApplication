import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "./components/ui/card"
import placeholderImage from '/images/Book Cover.png'

export function ListingsPage({ searchQuery }) {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("https://four155-project-pyflask.onrender.com/api/listings")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching listings:", err))
    }, [])

    const filteredProducts = products.filter((product) => {
        const search = searchQuery.toLowerCase()
        return (
            product.Name.toLowerCase().includes(search) ||
            product.City.toLowerCase().includes(search) ||
            product.Category.toLowerCase().includes(search)
        )
    })

    return (
        <section className="bg-white py-12 px-4">
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
                                    !product.Image.includes('/path_to')
                                        ? product.Image
                                        : placeholderImage
                                }
                                alt={product.Name}
                                className="w-full h-50 object-cover rounded-md border mb-4"
                            />
                            <div className="text-center mb-2">
                                <h2 className="text-lg font-bold">{product.Name}</h2>
                                <p className="text-md font-semibold">${product.Price.toFixed(2)}</p>
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
    )
}
