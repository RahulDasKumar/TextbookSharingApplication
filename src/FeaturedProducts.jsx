import * as React from "react"
import EmblaCarousel from 'embla-carousel'
import AutoScroll from "embla-carousel-auto-scroll"

import { Card, CardContent } from "./components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./components/ui/carouseltextbook"

export function FeaturedProducts() {
    return (
        <>
            <section className="w-screen h-[30vh] border border-black"></section>
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
