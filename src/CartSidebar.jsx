import { useCart } from "@/context/CartContext";

export function CartSidebar() {
    const { cartItems, removeFromCart, isCartOpen, setIsCartOpen } = useCart();

    const total = cartItems.reduce((sum, item) => sum + Number(item.Price), 0);

    return (
        <div className={`fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-300 shadow-lg transform transition-transform duration-300 z-50 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-red-500">Close</button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto h-[80vh]">
                {cartItems.length === 0 && <p className="text-gray-500">No items in cart.</p>}
                {cartItems.map((item, i) => (
                    <div key={i} className="border p-3 rounded">
                        <p className="font-semibold">{item.Name}</p>
                        <p className="text-sm">{item.Category}</p>
                        <div className="flex justify-between mt-2">
                            <span>${Number(item.Price).toFixed(2)}</span>
                            <button onClick={() => removeFromCart(i)} className="text-sm text-red-600">Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            {cartItems.length > 0 && (
                <div className="p-4 border-t font-semibold">
                    Total: ${total.toFixed(2)}
                </div>
            )}
        </div>
    );
}
