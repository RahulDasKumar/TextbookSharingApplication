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
        paymentStatus: "Success",
        paymentType: "Credit",
        price: "$5.99",
    },
    {
        name: "To Kill a Mockingbird",
        paymentStatus: "Success",
        paymentType: "Credit",
        price: "$13.99",
    },
    {
        name: "1984",
        paymentStatus: "Processing",
        paymentType: "Credit",
        price: "$17.99",
    },
    {
        name: "Moby Dick",
        paymentStatus: "Processing",
        paymentType: "Credit",
        price: "$9.99",
    },
    {
        name: "Pride and Prejudice",
        paymentStatus: "Processing",
        paymentType: "Credit",
        price: "$19.99",
    },
    {
        name: "The Catcher in the Rye",
        paymentStatus: "Failed",
        paymentType: "Credit",
        price: "$29.99",
    },
    {
        name: "Brave New World",
        paymentStatus: "Processing",
        paymentType: "Credit",
        price: "$30",
    },
];



export function CartPage() {
    return (
        <Table>
            <TableCaption>A list of your recent Books.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Book Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Type</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Books.map((name) => (
                    <TableRow key={name.name}>
                        <TableCell className="font-medium">{name.name}</TableCell>
                        <TableCell>{name.paymentStatus}</TableCell>
                        <TableCell>{name.paymentType}</TableCell>
                        <TableCell className="text-right">{name.price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>
    )
}
