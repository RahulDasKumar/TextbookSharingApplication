import * as React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "./components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./components/ui/carouseltextbook"
import placeholderImage from "/images/Book Cover.png"

export function FeaturedProducts() {
    const [listings, setListings] = useState([])

    useEffect(() => {
        fetch("https://four155-project-pyflask.onrender.com/api/listings")
            .then((res) => res.json())
            .then((data) => {
                const shuffled = [...data].sort(() => 0.5 - Math.random())

                if (shuffled.length >= 8) {
                    setListings(shuffled.slice(0, 8))
                } else {
                    const repeated = []
                    while (repeated.length < 8) {
                        for (let item of shuffled) {
                            repeated.push(item)
                            if (repeated.length >= 8) break
                        }
                    }
                    setListings(repeated)
                }
            })
            .catch((err) => console.error("Error fetching featured listings:", err))
    }, [])

    return (
        <section className="flex flex-row justify-center overflow-hidden py-12 bg-white">
            <div className="w-full max-w-screen-xl px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-black">Featured Listings</h2>
                <Carousel
                    opts={{
                        align: "start", // 👈 Ensures no partial cards show
                        loop: true,
                        startIndex: 0,
                        inViewThreshold: 1,
                    }}
                >
                    <CarouselContent className="gap-4"> {/* Added gap to keep spacing clean */}
                        {listings.map((product, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/3 px-2" // 👈 3 cards per row, no extra
                            >
                                <Card className="border border-black rounded-xl shadow-lg bg-white h-full">
                                    <CardContent className="p-6 flex flex-col justify-between h-[600px] text-black">
                                        <img
                                            src={
                                                product.Image &&
                                                !product.Image.includes("/path_to")
                                                    ? product.Image
                                                    : placeholderImage
                                            }
                                            alt={product.Name}
                                            className="w-full h-78 object-cover rounded-md border mb-6"
                                        />
                                        <div className="text-center mb-4">
                                            <h2 className="text-lg font-bold">{product.Name}</h2>
                                            <p className="text-md font-semibold">${product.Price.toFixed(2)}</p>
                                        </div>
                                        <div className="text-sm text-center text-gray-600">
                                            <p>{product.City}</p>
                                            <p className="italic">{product.Category}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}
