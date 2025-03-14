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
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    useEffect(() => {
        fetch('https://four155-project-pyflask.onrender.com/api/products')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProducts(data);  // Set the fetched data
                setLoading(false);   // Set loading to false
            })
            .catch(err => {
                setError('Error fetching products');
                setLoading(false);   // Set loading to false in case of error
            });
    }, []);

    const sortProducts = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedProducts = [...products].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setProducts(sortedProducts);
    };

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
                    <TableHead className="w-[100px]" onClick={() => sortProducts('name')}>
                        Book Name 
                        {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                    <TableHead onClick={() => sortProducts('stock')}>
                        Status 
                        {sortConfig.key === 'stock' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                    <TableHead onClick={() => sortProducts('price')}>
                        Price 
                        {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                    <TableHead className="text-right" onClick={() => sortProducts('stock')}>
                        Stock 
                        {sortConfig.key === 'stock' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ⇵'}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow key={product._id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.stock > 0 ? "Available" : "Out of Stock"}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{product.stock}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                
            </TableFooter>
        </Table>
    );
}
