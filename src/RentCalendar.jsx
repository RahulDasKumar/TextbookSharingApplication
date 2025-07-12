import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { useCart } from "@/context/CartContext";

export function RentCalendar() {
    const { rentedBooks } = useCart();
    const [relevantBooks, setRelevantBooks] = useState([])

    return <>
        <Calendar
            mode="multiple"
            selected={rentedBooks.map((entry) => entry['Due Date'])}
            className="rounded-md border"
            onDayClick={(day,modifer)=>{
               // extract the specific day
            const pattern = /\w{3} \w{3} \d{2} \d{4}/;
            let extracted_key = `${day}`.match(pattern)?.[0]
            console.log(extracted_key)
            console.log(rentedBooks)
            let due_books = rentedBooks.filter(entry=> entry["String"] == extracted_key)
            console.log(due_books)
            setRelevantBooks(due_books.map(entry=> entry["Name"]))
            }}
        />
        <div className="p-4 space-y-4 ">
            {relevantBooks.length === 0 && <p className="text-gray-500">No books due on this day</p>}
            {relevantBooks.map((item, i) => (
                <div key={i} className="border p-3 rounded">
                    <p className="font-semibold">{item}</p>
                </div>
            ))}
        </div>
    </>
}
