"use client";
import { toast } from "react-hot-toast";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface ICartItem {
    id: string;
    name: string;
    image_url: string;
    price: string | number;
    description?: string;
    provider_id?: string;
}

interface CartContextType {
    cartItems: ICartItem[];
    addToCart: (item: ICartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    // ১. ডাটা লোড করার সময় setTimeout ব্যবহার করছি যাতে Cascading Render এরর না আসে
    useEffect(() => {
        const savedCart = localStorage.getItem("food_cart");
        if (savedCart) {
            const timer = setTimeout(() => {
                try {
                    setCartItems(JSON.parse(savedCart));
                } catch (error) {
                    console.error("Failed to parse cart:", error);
                }
            }, 0); // এটি রেন্ডার সাইকেলের বাইরে পাঠিয়ে দেয়
            return () => clearTimeout(timer);
        }
    }, []);

    // ২. ডাটা সেভ করার লজিক
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("food_cart", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = (item: ICartItem) => {
        setCartItems((prev) => [...prev, item]);
        toast.success(`${item.name} added to cart!`); // এই লাইনটি যোগ করুন
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("food_cart");
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};