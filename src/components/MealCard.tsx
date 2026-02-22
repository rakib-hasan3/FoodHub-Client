"use client";
import { MapPin, Utensils, ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation"; // রাউটিং এর জন্য
import { useCart } from "@/app/context/CartContext";
import { authClient } from "@/lib/auth-client";

// export default function MealCard({ meal }: { meal: any }) {
//     const { addToCart } = useCart();
//     const { isSignedIn } = useUser();

// const handleOrder = () => {
//     if (!isSignedIn) {
//         alert("Please login first to order!");
//         return;
//     }
//     addToCart(meal);
// };


interface MealType {
    id: string;
    name: string;
    image_url: string;
    description: string;
    price: string;
    provider?: {
        restaurant_name: string;
        address: string;
    };
    category: {
        name: string;
    };
}

export default function MealCard({ meal }: { meal: MealType }) {
    const session = authClient.useSession(); // এটি চেক করবে ইউজার লগইন কি না

    const router = useRouter();
    const { addToCart } = useCart();
    // const { isSignedIn } = useUser();

    const handleOrder = () => {

        if (!session?.data) {
            alert("Please login first to order!");
            router.push("/login");
            return;
        }

        addToCart(meal);
    };


    return (
        <div className="group p-4 relative w-full rounded-lg max-w-[380px] bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-[480px]">
            {/* ... ইমেজের অংশটুকু আপনার আগের মতোই থাকবে ... */}
            <div className="relative  h-52 w-full overflow-hidden">
                <img
                    src={meal.image_url || "https://placehold.co/600x400"}
                    alt={meal.name}
                    className="object-cover rounded-xl w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 mt-4 font-bold right-4 bg-orange-500 text-black px- py-1.5 rounded-2xl font-black">
                    ৳{meal.price}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="font-extrabold text-xl text-gray-800 line-clamp-1">{meal.name}</h3>

                <div className="space-y-2 mt-3 flex-1">
                    <div className="flex items-center gap-2 text-gray-600 font-bold text-sm">
                        <Utensils size={14} className="text-orange-500" />
                        {meal.provider?.restaurant_name}
                    </div>
                    <p className="text-gray-500 text-xs line-clamp-2">{meal.description}</p>
                </div>

                {/* ৪. বাটন-এ onClick ইভেন্ট যোগ করা হলো */}
                <button
                    onClick={handleOrder}
                    className="w-full mt-6 bg-gray-900 hover:bg-orange-500 text-black rounded-2xl py-4 font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}