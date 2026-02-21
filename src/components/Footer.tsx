const Footer = () => {
    return (
        <footer className="border-t bg-background mt-4">
            <div className="container mt-4 mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-xl font-bold">🍱 FoodHub</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Discover & Order Delicious Meals
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Home</li>
                        <li>Meals</li>
                        <li>Providers</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-semibold mb-3">Support</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Help Center</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <p className="text-sm text-muted-foreground">
                        Email: support@foodhub.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Phone: +880 1234 567890
                    </p>
                </div>

            </div>

            <div className="border-t py-4 text-center text-sm text-muted-foreground">
                © 2026 FoodHub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
