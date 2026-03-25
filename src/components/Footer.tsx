const Footer = () => {
    return (
        <footer className="bg-slate-50 border-t ">
            <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800">🍱 FoodHub</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Discover & Order Delicious Meals
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="hover:text-orange-500 cursor-pointer">Home</li>
                        <li className="hover:text-orange-500 cursor-pointer">Meals</li>
                        <li className="hover:text-orange-500 cursor-pointer">Providers</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Support</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="hover:text-orange-500 cursor-pointer">Help Center</li>
                        <li className="hover:text-orange-500 cursor-pointer">Terms & Conditions</li>
                        <li className="hover:text-orange-500 cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
                    <p className="text-sm text-gray-600">Email: support@foodhub.com</p>
                    <p className="text-sm text-gray-600">Phone: +880 1234 567890</p>
                </div>

            </div>

            <div className="border-t py-4 text-center text-sm text-gray-500">
                © 2026 FoodHub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;