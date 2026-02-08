"use client";

import Image from "next/image";

const categoriesData = [
    { id: 1, name: "Pizza", img: "/pizza.png" },
    { id: 2, name: "Burger", img: "/burger.jpg" },
    { id: 3, name: "Sushi", img: "/sussi.jpg" },
    { id: 4, name: "Desserts", img: "/dessert.jpg" },
];

const Categories = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Explore Categories</h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {categoriesData.map((cat) => (
                        <div key={cat.id} className="bg-white rounded-lg shadow hover:shadow-lg p-4 flex flex-col items-center">
                            <Image
                                src={cat.img}
                                alt={cat.name}
                                width={120}
                                height={120}
                                className="rounded-full mb-2"
                            />
                            <span className="font-medium text-gray-800">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
