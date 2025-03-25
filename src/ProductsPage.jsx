import React, { useState, useEffect } from "react"
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

export function ProductsPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    useEffect(() => {
        fetch('https://four155-project-pyflask.onrender.com/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                setError('Error fetching products')
                setLoading(false)
            })
    }, [])

    const sortProducts = (key) => {
        let direction = 'asc'
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })

        const sorted = [...products].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
            return 0
        })

        setProducts(sorted)
        setCurrentPage(1) // Reset to page 1 when sorting
    }

    // Pagination logic
    const totalPages = Math.ceil(products.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem)

    // Show loading
    if (loading) return <div>Loading products...</div>
    if (error) return <div>{error}</div>

    return (
        <>
            <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/3 whitespace-nowrap cursor-pointer" onClick={() => sortProducts('name')}>
                    Book Name
                    {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                    <TableHead className="w-1/4 whitespace-nowrap cursor-pointer" onClick={() => sortProducts('stock')}>
                    Status
                    {sortConfig.key === 'stock' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                    <TableHead className="w-1/4 whitespace-nowrap cursor-pointer" onClick={() => sortProducts('price')}>
                    Price
                    {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                    <TableHead className="text-right w-1/5 whitespace-nowrap cursor-pointer" onClick={() => sortProducts('stock')}>
                    Stock
                    {sortConfig.key === 'stock' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                </TableRow>
                </TableHeader>

                <TableBody>
                {currentProducts.map((product) => (
                    <TableRow key={product._id}>
                    <TableCell className="font-medium w-1/3 truncate max-w-[200px]">{product.name}</TableCell>
                    <TableCell className="w-1/4">{product.stock > 0 ? "Available" : "Out of Stock"}</TableCell>
                    <TableCell className="w-1/4">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right w-1/5">{product.stock}</TableCell>
                    </TableRow>
                ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-4">
                            {/* Pagination controls */}
                            <div className="flex justify-center items-center space-x-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-3 py-1 border rounded ${
                                            currentPage === index + 1 ? "bg-black text-white" : ""
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}
