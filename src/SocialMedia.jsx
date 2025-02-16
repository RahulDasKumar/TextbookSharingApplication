import * as React from "react"
import AutoScroll from "embla-carousel-auto-scroll"

import { Card, CardContent } from "./components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./components/ui/carousel"

export default function SocialMedia() {
    return (
        <>
        <section className="w-[100vw] h-[40vh]"></section>
        <section className="flex flex-row justify-center">
        <Carousel className="w-full max-w-sm"
                    plugins={[
                        AutoScroll({
                        }),
                    ]}
                    opts={{
                        loop: true
                    }}
        
        >
            <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-2xl font-semibold">Social Media</span>
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
