"use client";

import { Utensils, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { authClient } from "../../auth-client";

interface MealType {
    id: string;
    name: string;
    image_url: string;
    description: string;
    price: string | number;
    provider?: {
        restaurant_name: string;
        address: string;
    };
    category: {
        name: string;
    };
}

export default function MealCard({ meal }: { meal: MealType }) {
    const { data } = authClient.useSession(); // ✅ correct way
    const router = useRouter();
    const { addToCart } = useCart();

    const handleOrder = () => {
        const user = data?.user;

        // ❌ not logged in
        if (!user) {
            alert("Please login first to order!");
            router.push("/login");
            return;
        }

        // ✅ correct cart format
        addToCart({
            id: meal.id,
            name: meal.name,
            image_url: meal.image_url,
            price: meal.price,
            userId: user.id,
            quantity: 1,
        });
    };

    return (
        <div className="group relative w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

            {/* Image */}
            <div className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden">
                <img
                    src={meal.image_url || "https://placehold.co/600x400"}
                    alt={meal.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                />

                <div className="absolute bottom-3 right-3 bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-semibold shadow">
                    ৳{meal.price}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg sm:text-xl text-gray-800 line-clamp-1">
                    {meal.name}
                </h3>

                <div className="mt-2 space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Utensils size={14} className="text-orange-500" />
                        <span className="line-clamp-1">
                            {meal.provider?.restaurant_name || "Unknown"}
                        </span>
                    </div>

                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
                        {meal.description}
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={handleOrder}
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2.5 sm:py-3 font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}