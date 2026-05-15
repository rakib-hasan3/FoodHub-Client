import MealCard from "../MealCard";

type Meal = {
    id: string;
    name: string;
    status: string;
    price: string;
    image_url: string;
    description: string;
    featured?: boolean;
    trending?: boolean;
    preparationTime?: string;
    calories?: number | string;
    spiceLevel?: string;
    isAvailable?: boolean;
    category: {
        id: string;
        name: string;
    };
};


const MealsGrid = ({
    meals,
    loading,
    isProvider = false,
}: {
    meals: Meal[];
    loading: boolean;
    isProvider?: boolean;
}) => {
    if (loading)
        return (
            <p className="text-center py-10 text-gray-500">
                Loading meals...
            </p>
        );

    if (meals.length === 0)
        return (
            <p className="text-center py-10 text-gray-500">
                No meals found 😢
            </p>
        );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} isProvider={isProvider} />
            ))}
        </div>
    );
};


export default MealsGrid;