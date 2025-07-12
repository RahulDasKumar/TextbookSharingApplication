import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [rentDates, setRentDates] = useState([])
    const [rentedBooks,setRentedBooks] = useState([])
    const addToCart = (item) => {
        const pattern = /\w{3} \w{3} \d{2} \d{4}/;
        let today = `${new Date()}`.match(pattern)?.[0]
        item.date = today
        setCartItems((prev) => [...prev, item]);
        setIsCartOpen(true); // Automatically open sidebar when adding item
    };

    const removeFromCart = (index) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    const removeAllFromCart = ()=>{
        setCartItems([])
    }
    const rentBook = (item) =>{
        // Mon May 05 2025 15:27:49 GMT-0400 (Eastern Daylight Time)
        // const pattern = /\w{3} \w{3} \d{2} \d{4}/;
        // let today = `${new Date()}`.match(pattern)?.[0]
        // let key = today
        let todaysDate = new Date()
        // due date - date object
        let dueDate = new Date(todaysDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        // create key for matching purposes
        const pattern = /\w{3} \w{3} \d{2} \d{4}/;
        let dueDateString = `${dueDate}`.match(pattern)?.[0]
        let entry = { "Name": item.Name, "Due Date": dueDate, "String": dueDateString }
        setRentedBooks((prev)=> [...prev, entry])
        console.log(dueDate)

    }
    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                isCartOpen,
                setIsCartOpen,
                toggleCart,
                removeAllFromCart,
                rentBook,
                rentDates,
                rentedBooks, 
                setRentedBooks
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
