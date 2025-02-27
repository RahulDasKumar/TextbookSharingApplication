import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Books = [
    {
        name: "The Great Gatsby",
        paymentStatus: "Available",
        genre: "Classic Fiction",
        price: "$5.99",
    },
    {
        name: "To Kill a Mockingbird",
        paymentStatus: "Out of Stock",
        genre: "Historical Fiction",
        price: "$13.99",
    },
    {
        name: "1984",
        paymentStatus: "Available",
        genre: "Dystopian",
        price: "$17.99",
    },
    {
        name: "Moby Dick",
        paymentStatus: "Available",
        genre: "Adventure",
        price: "$9.99",
    },
    {
        name: "Pride and Prejudice",
        paymentStatus: "Available",
        genre: "Romance",
        price: "$19.99",
    },
    {
        name: "The Catcher in the Rye",
        paymentStatus: "Out of Stock",
        genre: "Coming-of-Age",
        price: "$29.99",
    },
    {
        name: "Brave New World",
        paymentStatus: "Available",
        genre: "Science Fiction",
        price: "$30",
    },
];



export function ProductsTable() {
    return (
        <Table>
            <TableCaption>A list of your recent Books.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Book Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Books.map((name) => (
                    <TableRow key={name.name}>
                        <TableCell className="font-medium">{name.name}</TableCell>
                        <TableCell>{name.paymentStatus}</TableCell>
                        <TableCell>{name.genre}</TableCell>
                        <TableCell className="text-right">{name.price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>
    )
}
