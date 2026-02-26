import MealCard from "../MealCard";

type Meal = {
    id: string;
    name: string;
    status: string;
    price: string;
    image_url: string;
    description: string; // 👈 optional করো
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
    if (loading) return <p>Loading meals...</p>;
    if (meals.length === 0) return <p>No meals found 😢</p>;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
            ))}
        </div>
    );
};

export default MealsGrid;