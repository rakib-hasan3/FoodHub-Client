import { Users, Store, ShieldCheck, UtensilsCrossed, Target, Heart } from "lucide-react";

export default function AboutPage() {
    const stats = [
        { label: "Active Users", value: "10K+", icon: Users, color: "text-blue-600" },
        { label: "Total Meals", value: "500+", icon: UtensilsCrossed, color: "text-orange-600" },
        { label: "Restaurants", value: "50+", icon: Store, color: "text-green-600" },
    ];

    const roles = [
        {
            title: "Customer",
            description: "Browse various menus, place orders, and track your delicious meal in real-time.",
            icon: Heart,
            color: "bg-pink-50 text-pink-600",
            features: ["Place Orders", "Track Delivery", "Leave Reviews"]
        },
        {
            title: "Provider",
            description: "Showcase your culinary skills. Manage your menu, track orders, and grow your business.",
            icon: Store,
            color: "bg-orange-50 text-orange-600",
            features: ["Manage Menu", "Fulfill Orders", "View Stats"]
        },
        {
            title: "Admin",
            description: "Complete control over the platform. Manage users, categories, and ensure smooth operations.",
            icon: ShieldCheck,
            color: "bg-purple-50 text-purple-600",
            features: ["User Moderation", "Order Overview", "Manage Content"]
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-gray-900 mb-4">
                        About <span className="text-orange-500">FoodHub</span> 🍱
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
                        Discover & Order Delicious Meals - connecting food lovers with the best local providers.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
                            <div className={`p-4 rounded-2xl bg-gray-50 ${stat.color}`}>
                                <stat.icon size={32} />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                                <p className="text-gray-500 font-medium">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Role Specific Section */}
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
                    <p className="text-gray-500 mt-2">Tailored experiences for everyone on the platform</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roles.map((role, index) => (
                        <div key={index} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className={`w-16 h-16 rounded-2xl ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <role.icon size={30} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{role.title}</h3>
                            <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                                {role.description}
                            </p>
                            <ul className="space-y-3 border-t pt-6 border-gray-50">
                                {role.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Tech Stack Banner */}
                <div className="mt-20 p-10 bg-gray-900 rounded-[3rem] text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <Target className="text-orange-500 mx-auto mb-4" size={40} />
                        <h2 className="text-white text-3xl font-black mb-4 font-mono uppercase tracking-tighter italic">Our Tech Stack</h2>
                        <p className="text-gray-400 max-w-xl mx-auto text-sm">
                            Built with modern technologies including Next.js, TypeScript, Tailwind CSS, and a robust Backend API.
                        </p>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>
                </div>
            </div>
        </main>
    );
}