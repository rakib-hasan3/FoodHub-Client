"use client";

import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface ICartItem {
    id: string;          // mealId হিসেবে যাবে
    name: string;
    image_url: string;
    price: string | number;
    quantity?: number;
}

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [deliveryAddress, setDeliveryAddress] = useState(""); // ✅ delivery address state

    const totalPrice = cartItems.reduce((acc: number, item: ICartItem) => {
        const priceValue = parseFloat(String(item.price)) || 0;
        return acc + priceValue;
    }, 0);

    const handleConfirmOrder = async () => {
        try {
            if (cartItems.length === 0) {
                toast.error("Cart is empty");
                return;
            }

            if (!deliveryAddress.trim()) {
                toast.error("Delivery address required");
                return;
            }

            const orderPayload = {
                items: cartItems.map((item) => ({
                    mealId: item.id,
                    quantity: 1,
                })),
                delivery_address: deliveryAddress, // ✅ address পাঠাচ্ছি
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(orderPayload),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("🎉 Order confirmed!");
                const existingOrders = JSON.parse(localStorage.getItem("myOrders") || "[]");

                const newOrder = {
                    id: data.data.id,
                    createdAt: new Date().toISOString(),
                    total: totalPrice,
                    status: "PLACED",
                };

                localStorage.setItem(
                    "myOrders",
                    JSON.stringify([newOrder, ...existingOrders])
                );

                clearCart();
                setDeliveryAddress(""); // reset input
            } else {
                toast.error(data.message || "Order failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-4 border rounded-lg p-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart Items</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="border rounded-lg p-4">
                            <h2 className="font-semibold">{item.name}</h2>
                            <p>৳ {item.price}</p>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 text-sm mt-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Delivery Address Input */}
                    <div className="mt-6">
                        <label className="block font-semibold mb-2">Delivery Address:</label>
                        <input
                            type="text"
                            placeholder="Enter your delivery address"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div className="mt-8 border-t pt-4">
                        <p className="text-xl font-bold">
                            Total: ৳ {totalPrice.toFixed(2)}
                        </p>

                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="font-bold text-green-700">
                                Payment Method: Cash on Delivery
                            </p>
                        </div>

                        <button
                            onClick={handleConfirmOrder}
                            className="w-full bg-orange-600 text-black py-3 rounded-xl mt-6 font-bold"
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}