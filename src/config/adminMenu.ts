// src/config/adminMenu.ts

import {
    LayoutDashboard,
    Users,
    Store,
    UtensilsCrossed,
    ShoppingBag,
    Star
} from "lucide-react";

export const adminMenu = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Users", icon: Users, href: "/admin/users" },
    { label: "Providers", icon: Store, href: "/admin/providers" },
    { label: "Meals", icon: UtensilsCrossed, href: "/admin/meals" },
    { label: "Orders", icon: ShoppingBag, href: "/admin/orders" },
    { label: "Reviews", icon: Star, href: "/admin/reviews" },
];
