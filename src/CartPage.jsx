import React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/ui/table"

const Books = [
    {
        name: "The Great Gatsby",
        paymentStatus: "Available",
        genre: "Classic Fiction",
        price: "$5.99",
    },
    {
        name: "To Kill a Mockingbird",
        paymentStatus: "Available",
        genre: "Historical Fiction",
        price: "$13.99",
    },
    {
        name: "1984",
        paymentStatus: "Available",
        genre: "Dystopian",
        price: "$17.99",
    },
]

export function CartPage() {
    const totalPrice = Books.reduce((sum, book) => {
        const price = parseFloat(book.price.replace('$', ''))
        return sum + price
    }, 0)

    return (
        <section className="min-h-screen bg-white px-4 py-12 text-black">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

                <Table className="border border-black rounded-lg shadow-md">
                    <TableCaption className="text-sm text-gray-500 mb-2">A summary of books in your cart.</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="w-1/3">Book Name</TableHead>
                            <TableHead className="w-1/4">Status</TableHead>
                            <TableHead className="w-1/4">Genre</TableHead>
                            <TableHead className="w-1/5 text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {Books.map((book) => (
                            <TableRow key={book.name}>
                                <TableCell className="font-medium">{book.name}</TableCell>
                                <TableCell>{book.paymentStatus}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell className="text-right">{book.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3} className="text-right font-semibold text-lg">
                                Total
                            </TableCell>
                            <TableCell className="text-right font-semibold text-lg">
                                ${totalPrice.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </section>
    )
}
