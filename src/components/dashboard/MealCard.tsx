type Meal = {
    id: string;
    name: string;
    status: string;
    price: string;
    image_url: string;
    category: {
        id: string;
        name: string;
    };
};

const MealCard = ({ meal }: { meal: Meal }) => {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-md transition">
            <img
                src={meal.image_url}
                alt={meal.name}
                className="w-full h-28 object-cover rounded-t-xl"
            />

            <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold truncate">{meal.name}</h3>

                <p className="text-xs text-gray-500">{meal.category.name}</p>

                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">৳ {meal.price}</p>

                    <span className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-md">
                        {meal.status}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MealCard;