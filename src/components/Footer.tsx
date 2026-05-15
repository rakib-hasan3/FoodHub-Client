import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-white/5 pt-20 pb-10 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[100px] -z-10" />
            
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group w-fit">
                            <div className="w-10 h-10 bg-orange-500 rounded-[1rem] flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:rotate-[15deg] transition-all duration-500 border-2 border-white/20">
                                <span className="text-lg font-black text-white italic tracking-tighter">F</span>
                            </div>
                            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">Food<span className="text-orange-500">Hub</span></span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            Experience premium dining from the comfort of your home. Curated menus, lightning-fast delivery, and flavors that are unforgettable.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest">Explore</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Browse Meals", href: "/meals" },
                                { name: "Categories", href: "/categories" },
                                { name: "Restaurants", href: "/restaurants" },
                                { name: "Trending", href: "/trending" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest">Company</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "About Us", href: "/about" },
                                { name: "Our Story", href: "/story" },
                                { name: "Contact", href: "/contact" },
                                { name: "Help & Support", href: "/help" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest">Legal</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Terms & Conditions", href: "/terms" },
                                { name: "Privacy Policy", href: "/privacy" },
                                { name: "Refund Policy", href: "/refund" },
                                { name: "Safety Center", href: "/safety" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                                    <MapPin size={18} className="text-orange-500" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">
                                    Mouchak, <br /> Gazipur, Dhaka
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <Mail size={18} className="text-blue-500" />
                                </div>
                                <a href="mailto:rakibhasanashik861@gmail.com" className="text-gray-500 dark:text-gray-400 font-medium hover:text-blue-500 transition-colors">support@foodhub.com</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                                    <Phone size={18} className="text-emerald-500" />
                                </div>
                                <a href="tel:01742401713" className="text-gray-500 dark:text-gray-400 font-medium hover:text-emerald-500 transition-colors">01742401713</a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">
                        © 2026 FoodHub Platform. Crafted with ❤️ for Foodies.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-widest">Privacy</a>
                        <a href="#" className="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-widest">Terms</a>
                        <a href="#" className="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors uppercase tracking-widest">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;