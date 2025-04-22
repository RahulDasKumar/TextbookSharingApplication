import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Fetch cart from backend on load
    useEffect(() => {
        fetch("https://four155-project-pyflask.onrender.com/get_cart", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.cart) {
                    setCartItems(data.cart);
                }
            })
            .catch((err) => console.error("Error loading cart:", err));
    }, []);

    const addToCart = async (listingId, quantity = 1) => {
        try {
            const res = await fetch("https://four155-project-pyflask.onrender.com/add_to_cart", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ listing_id: listingId, quantity }),
            });
            const result = await res.json();
            console.log(result.message);
            // Optional: re-fetch cart
            fetch("https://four155-project-pyflask.onrender.com/get_cart", {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setCartItems(data.cart || []));
            setIsCartOpen(true);
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };

    const removeFromCart = async (listingId) => {
        try {
            const res = await fetch("https://four155-project-pyflask.onrender.com/remove_from_cart", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ listing_id: listingId }),
            });
            const result = await res.json();
            console.log(result.message);
            // Refresh cart
            fetch("https://four155-project-pyflask.onrender.com/get_cart", {
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setCartItems(data.cart || []));
        } catch (err) {
            console.error("Error removing from cart:", err);
        }
    };

    const toggleCart = () => setIsCartOpen((prev) => !prev);

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
