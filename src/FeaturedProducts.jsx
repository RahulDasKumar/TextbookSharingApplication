import * as React from "react"


import { Card, CardContent } from "./components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./components/ui/carouseltextbook"

import { useEffect,useState } from "react"
export function FeaturedProducts() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch('https://four155-project-pyflask.onrender.com/api/auth/signup')
            .then(response => {
                console.log(response)
                response.json()}
            )
            .then(data => setUserData(data));
    }, []);

    return (
        <>
        
            <section className="flex flex-row justify-center overflow-hidden">
        <Carousel
            opts={{
                align: "start",
                loop: true,
                startIndex:3,
                inViewThreshold:1
            }}
                    className="w-full max-w-prose	"
        >
            <CarouselContent>
                {Array.from({ length: 8 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-2/2 lg:basis-2/2">
                        <div className="p-1">
                            <Card className="aspect-[8/10]">
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-3xl font-semibold">{index + 1}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        </section>
        </>
    )
}
