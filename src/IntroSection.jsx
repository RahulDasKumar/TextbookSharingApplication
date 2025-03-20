import React from "react";
import image from '/images/Book Cover.png';

export default function IntroSection() {
    return (
        <>
            <section className="relative w-screen h-[80vh] border border-black overflow-hidden flex items-center justify-center">
                <img
                    src={image}
                    alt="Book Cover"
                    className="w-full h-full object-contain scale-90"
                />

                <a
                    href="/products"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <button className="px-6 py-3 border-2 border-white text-white bg-transparent rounded hover:bg-white hover:text-black transition duration-200">
                        View Products
                    </button>
                </a>
            </section>

            <section className="w-screen border border-black bg-white text-black px-10 py-12">
                <div className="max-w-5xl mx-auto text-center space-y-6">
                    <h2 className="text-4xl font-bold tracking-tight">This is your space</h2>
                    <p className="text-lg font-medium">Mission statement</p>
                    <hr className="border-t border-black w-2/3 mx-auto" />
                    <div className="flex flex-col md:flex-row justify-center gap-12 pt-6">
                        <p className="text-sm md:text-base max-w-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                        </p>
                        <p className="text-sm md:text-base max-w-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                        </p>
                    </div>
                </div>
            </section>

        </>
    );
}
