import MealCard from "../MealCard";

type Meal = {
    id: string;
    name: string;
    status: string;
    price: string;
    image_url: string;
    description: string;
    category: {
        id: string;
        name: string;
    };
};

const MealsGrid = ({
    meals,
    loading,
}: {
    meals: Meal[];
    loading: boolean;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
            ))}
        </div>
    );
};

export default MealsGrid;