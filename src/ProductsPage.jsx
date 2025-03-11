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

// The component for displaying products
export function ProductsPage() {
    // State to store the fetched products and loading state
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProducts(data);  // Set the fetched data
                setLoading(false);   // Set loading to false
            })
            .catch(err => {
                setError('Error fetching posts');
                setLoading(false);   // Set loading to false in case of error
            });
    }, []);

// Show loading message
if (loading) {
    return <div>Loading products...</div>;
}

// Show error message
if (error) {
    return <div>{error}</div>;
}

    return (
        <Table>
            <TableCaption>A list of your recent Books.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Book Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>  {/* Use 'id' as the key */}
                        <TableCell className="font-medium">{product.title}</TableCell> {/* Use 'title' */}
                        <TableCell>{product.body ? "Available" : "Out of Stock"}</TableCell> {/* Dummy check for availability */}
                        <TableCell>${(Math.random() * 100).toFixed(2)}</TableCell> {/* Assigning a random price */}
                        <TableCell className="text-right">{Math.floor(Math.random() * 100)}</TableCell> {/* Assigning random stock */}
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                
            </TableFooter>
        </Table>
    );
}
