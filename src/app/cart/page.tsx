"use client";

import toast from "react-hot-toast";
import { useCart, ICartItem } from "../context/CartContext";
import { useState, useMemo } from "react";
import { authClient } from "@/auth-client";
import { Trash2, MapPin, CreditCard, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [isOrdering, setIsOrdering] = useState(false);

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
        console.log("Confirm order clicked");
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
            // Highlight the input visually if possible by focusing it
            document.getElementById("delivery-address-input")?.focus();
            return;
        }

        try {
            setIsOrdering(true);
            const orderPayload = {
                items: userCartItems.map((item) => ({
                    mealId: item.id,
                    quantity: item.quantity,
                })),
                delivery_address: deliveryAddress,
            };

            console.log("Sending payload:", orderPayload);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(orderPayload),
                }
            );

            console.log("Response status:", res.status);
            const data = await res.json();
            console.log("Response data:", data);

            if (data.success) {
                toast.success("🎉 Order confirmed!");
                clearCart(); // ✅ clear only UI
                setDeliveryAddress("");
            } else {
                toast.error(data.message || "Order failed");
            }
        } catch (err) {
            console.error("Order error:", err);
            toast.error("Something went wrong");
        } finally {
            setIsOrdering(false);
        }
    };

    if (isPending) return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <ShoppingCart className="w-12 h-12 text-orange-500 opacity-50" />
                <p className="font-bold text-gray-500 dark:text-gray-400">Loading your cart...</p>
            </div>
        </div>
    );

    if (!session) return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-xl dark:shadow-none border border-transparent dark:border-white/5 max-w-md w-full text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-10 h-10 text-red-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Access Denied</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Please login to view and manage your cart.</p>
                </div>
                <Link href="/login" className="block w-full bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                    Login Now
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 transition-colors duration-300 relative overflow-hidden">
            {/* Premium Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10 space-y-8 lg:space-y-12">
                <header className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 mx-auto">
                        <ShoppingCart className="w-5 h-5 text-orange-500" />
                        <span className="text-sm font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Your Order</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
                        Review Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Cart</span>
                    </h1>
                </header>

                {userCartItems.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] shadow-xl dark:shadow-none border border-transparent dark:border-white/5 text-center space-y-6 max-w-2xl mx-auto">
                        <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto">
                            <ShoppingCart className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Your cart is empty</h2>
                            <p className="text-gray-500 dark:text-gray-400 font-medium">Looks like you haven't added any delicious meals yet.</p>
                        </div>
                        <Link href="/meals" className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                            Explore Menu <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        
                        {/* Cart Items List */}
                        <div className="lg:col-span-7 space-y-4">
                            {userCartItems.map((item: ICartItem) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-[2rem] shadow-lg dark:shadow-none border border-transparent dark:border-white/5 group hover:border-orange-500/30 transition-all duration-300"
                                >
                                    <div className="w-full sm:w-24 h-40 sm:h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                        <img src={item.image_url || "https://placehold.co/150x150?text=Meal"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 text-center sm:text-left w-full">
                                        <h2 className="font-black text-lg text-gray-900 dark:text-white line-clamp-1">{item.name}</h2>
                                        <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                                            <span className="text-orange-500 font-black text-lg">৳{item.price}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-zinc-700" />
                                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="w-full sm:w-auto mt-2 sm:mt-0 px-4 py-3 sm:p-3 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        <span className="sm:hidden font-bold">Remove</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Checkout Panel */}
                        <div className="lg:col-span-5 relative">
                            <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-[2.5rem] shadow-xl dark:shadow-none border border-transparent dark:border-white/5 sticky top-28 space-y-8">
                                
                                {/* Delivery Address */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
                                        <MapPin className="w-4 h-4 text-orange-500" />
                                        Delivery Address
                                    </label>
                                    <input
                                        id="delivery-address-input"
                                        type="text"
                                        placeholder="Enter your exact location..."
                                        value={deliveryAddress}
                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                        className="w-full h-14 px-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-orange-500/50 outline-none transition-all font-semibold text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />
                                </div>

                                {/* Order Summary */}
                                <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                                    <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4">Order Summary</h3>
                                    <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 font-medium">
                                        <span>Subtotal ({userCartItems.length} items)</span>
                                        <span>৳ {totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 font-medium">
                                        <span>Delivery Fee</span>
                                        <span className="text-green-500 font-bold">Free</span>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-2xl">
                                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-widest">Payment Method</p>
                                        <p className="font-bold text-green-700 dark:text-green-300">Cash on Delivery</p>
                                    </div>
                                </div>

                                {/* Total & Action */}
                                <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                                    <div className="flex justify-between items-end mb-6">
                                        <span className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total</span>
                                        <span className="text-3xl font-black text-gray-900 dark:text-white">
                                            <span className="text-orange-500 text-2xl mr-1">৳</span>{totalPrice.toFixed(2)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleConfirmOrder}
                                        disabled={isOrdering}
                                        className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2 ${isOrdering ? "opacity-70 cursor-not-allowed" : ""}`}
                                    >
                                        {isOrdering ? (
                                            <>
                                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Confirm Order 🚀"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}