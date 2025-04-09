import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/ui/table";

export function ProductsPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'itemLabel', direction: 'asc' });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    useEffect(() => {
        fetch('https://four155-project-pyflask.onrender.com/api/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching books');
                setLoading(false);
            });
    }, []);

    const sortBooks = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sorted = [...books].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setBooks(sorted);
        setCurrentPage(1);
    };

    // Pagination logic
    const totalPages = Math.ceil(books.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) return <div>Loading books...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Table className="w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <TableHeader>
                    <TableRow className="bg-gray-100 text-black">
                    <TableHead className="w-1/3 px-4 py-3 font-semibold cursor-pointer" onClick={() => sortBooks('itemLabel')}>
                        Book Title
                        {sortConfig.key === 'itemLabel' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                    <TableHead className="w-1/3 px-4 py-3 font-semibold cursor-pointer" onClick={() => sortBooks('mainSubjectLabel')}>
                        Subject
                        {sortConfig.key === 'mainSubjectLabel' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                    <TableHead className="w-1/3 px-4 py-3 font-semibold">Link</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {currentBooks.map((book, index) => (
                    <TableRow
                        key={book._id}
                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition duration-150`}
                    >
                        <TableCell className="px-4 py-3 font-medium truncate max-w-[250px]">
                        {book.itemLabel || "No Title"}
                        </TableCell>
                        <TableCell className="px-4 py-3">{book.mainSubjectLabel || "N/A"}</TableCell>
                        <TableCell className="px-4 py-3">
                        {book.item ? (
                            <a href={book.item} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            Wikidata
                            </a>
                        ) : "—"}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>


                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-4">
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
                                        className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-black text-white" : ""}`}
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
    );
}
