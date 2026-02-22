"use client";

import { string } from "zod";
import { useCart } from "../context/CartContext";

interface ICartItem {
    id: string;
    name: string;
    image_url: string;
    price: string | number;
    description?: string;

    // আপনার ডাটাতে আর যা যা আছে সেগুলো এখানে দিন
}

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const totalPrice = cartItems.reduce((acc: number, item: ICartItem) => {
        // এখানে String(item.price) ব্যবহার করলে সে নাম্বার হোক বা স্ট্রিং, 
        //parseFloat এর জন্য সে নিরাপদ স্ট্রিং হয়ে যাবে।
        const priceValue = parseFloat(String(item.price)) || 0;
        return acc + priceValue;
    }, 0);
    return (
        <div className="max-w-7xl mx-auto mt-4 border-black rounded-lg border p-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart Items</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item, index) => (
                        // এখানে key={item.id} এর বদলে নিচের লাইনটি লিখুন
                        <div key={`${item.id}-${index}`} className="your-style-here">
                            {/* আপনার বাকি কোড */}
                            <h2>{item.name}</h2>
                            <p>{item.price}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))}

                    <div className="mt-8 border-t pt-4">
                        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="font-bold text-green-700">Payment Method: Cash on Delivery</p>
                        </div>
                        <button className="w-full bg-orange-600 text-white py-3 rounded-xl mt-6 font-bold">
                            Confirm Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}