"use client";

import toast from "react-hot-toast";
import { useCart, ICartItem } from "../context/CartContext";
import { useState, useMemo } from "react";
import { authClient } from "../../../auth-client";

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [deliveryAddress, setDeliveryAddress] = useState("");

    const { data: session, isPending } = authClient.useSession();
    const userId = session?.user?.id;

    // ✅ Only current user cart দেখাবে
    const userCartItems = useMemo(() => {
        if (!userId) return [];
        return cartItems.filter((item) => item.userId === userId);
    }, [cartItems, userId]);

    // ✅ total price with quantity
    const totalPrice = userCartItems.reduce((acc, item) => {
        const priceValue = Number(item.price) || 0;
        return acc + priceValue * item.quantity;
    }, 0);

    const handleConfirmOrder = async () => {
        if (!userId) {
            toast.error("Please login first");
            return;
        }

        if (userCartItems.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        if (!deliveryAddress.trim()) {
            toast.error("Delivery address required");
            return;
        }

        try {
            const orderPayload = {
                items: userCartItems.map((item) => ({
                    mealId: item.id,
                    quantity: item.quantity,
                })),
                delivery_address: deliveryAddress,
            };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(orderPayload),
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("🎉 Order confirmed!");

                clearCart(); // ✅ clear only UI
                setDeliveryAddress("");
            } else {
                toast.error(data.message || "Order failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    if (isPending) return <p className="p-6 text-center">Loading...</p>;

    if (!session)
        return (
            <p className="p-6 text-center text-red-500 font-semibold">
                Please login to view your cart
            </p>
        );

    return (
        <div className="max-w-5xl mx-auto mt-6 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">
                🛒 Your Cart Items
            </h1>

            {userCartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty 😢</p>
            ) : (
                <div className="space-y-4">
                    {userCartItems.map((item: ICartItem) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                        >
                            <div>
                                <h2 className="font-semibold text-lg">{item.name}</h2>
                                <p className="text-gray-600">৳ {item.price}</p>
                                <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                </p>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 font-medium"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Delivery Address */}
                    <div className="mt-6">
                        <label className="block font-semibold mb-2">
                            Delivery Address:
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your delivery address"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {/* Total */}
                    <div className="mt-6 border-t pt-4">
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
                            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-xl mt-6 font-bold hover:opacity-90"
                        >
                            Confirm Order 🚀
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}