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
    
];

export function CartPage() {
    
    // Calculate the total price
    const totalPrice = Books.reduce((sum, book) => {
        const price = parseFloat(book.price.replace('$', ''));
        return sum + price;
    }, 0);

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
                    <TableCell colSpan="3" className="text-right font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">${totalPrice.toFixed(2)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
