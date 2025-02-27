"use client"

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"  

import Navbar from "./Navbar";

export default function ProductsPage() {
    const [date, setDate] = useState(new Date());

    return (
        <>
            <Navbar />
            <Table>
                <TableCaption>A list of our books.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ISBN</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">ISBN#1</TableCell>
                        <TableCell>BOOK NAME</TableCell>
                        <TableCell>SOLD</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">ISBN#2</TableCell>
                        <TableCell>BOOK NAME</TableCell>
                        <TableCell>SOLD</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">ISBN#3</TableCell>
                        <TableCell>BOOK NAME</TableCell>
                        <TableCell>SOLD</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div className="flex flex-col justify-between min-h-screen">
            <Pagination className="mt-auto">
                <PaginationContent className="flex justify-center space-x-2">
                <PaginationItem>
                    <PaginationPrevious href="#" className="px-4 py-2 bg-gray-200 border rounded">Previous</PaginationPrevious>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" className="px-4 py-2 bg-gray-200 border rounded">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis className="px-4 py-2 bg-gray-200 border rounded" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" className="px-4 py-2 bg-gray-200 border rounded">Next</PaginationNext>
                </PaginationItem>
                </PaginationContent>
            </Pagination>
            </div>


        </>

    );
}