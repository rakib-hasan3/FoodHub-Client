import OffersList from "@/components/offers/OffersList";
import { MealType } from "@/components/MealCard";

async function getOffers() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`, { next: { revalidate: 60 } });
        const data = await res.json();
        if (data.success) {
            // Filter meals that have isDiscounted: true
            return data.data.filter((m: MealType) => m.isDiscounted);
        }
        return [];
    } catch (err) {
        console.error("Failed to fetch offers", err);
        return [];
    }
}

export default async function OffersPage() {
    const offers = await getOffers();

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-black pb-24">
            <OffersList initialOffers={offers} />
        </div>
    );
}
