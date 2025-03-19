import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "./components/ui/card"

export function ListingsPage() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("https://four155-project-pyflask.onrender.com/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err))
    }, [])

    return (
        <>
            {/* <section className="w-full py-12 bg-black text-white flex items-center justify-center shadow-md border-b border-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase">
                    UNCC Book Listings
                </h1>
            </section> */}

            <section className="bg-white py-12 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {products.map((product) => (
                        <Card
                            key={product._id}
                            className="border border-black rounded-lg shadow-md cursor-pointer hover:shadow-xl transition duration-200"
                            onClick={() => navigate(`/product/${product._id}`)}
                        >
                            <CardContent className="p-6 flex flex-col justify-between h-full text-black">
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-bold">{product.name}</h2>
                                    <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                                </div>
                                <div className="text-center mt-auto">
                                    <span className="inline-block bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                                        In Stock: {product.stock}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    )
}
