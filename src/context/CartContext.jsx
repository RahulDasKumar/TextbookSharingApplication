import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item) => {
        setCartItems((prev) => [...prev, item]);
        setIsCartOpen(true); // Automatically open sidebar when adding item
    };

    const removeFromCart = (index) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                isCartOpen,
                setIsCartOpen,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
