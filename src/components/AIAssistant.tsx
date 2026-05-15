"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bot,
    X,
    Send,
    Sparkles,
    MapPin,
    Truck,
    User,
    Minimize2,
    Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const suggestions = [
    { label: "Today's Offers", icon: <Sparkles className="w-3 h-3" />, query: "What are today's special offers?" },
    { label: "Nearby Restaurants", icon: <MapPin className="w-3 h-3" />, query: "Find nearby restaurants for me." },
    { label: "Track my Order", icon: <Truck className="w-3 h-3" />, query: "Help me track my active order." },
];

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hello! I'm your FoodHub AI assistant. How can I help you savor something extraordinary today?"
        }
    ]);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading) return;

        // ইউজারের মেসেজ যোগ করুন
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: text,
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!res.ok) throw new Error("AI request failed");

            // স্ট্রিমিং রেসপন্স পড়ুন
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let assistantText = "";

            const assistantId = (Date.now() + 1).toString();

            // একটি খালি assistant মেসেজ যোগ করুন যা স্ট্রিম হওয়ার সাথে সাথে আপডেট হবে
            setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    // Data Stream ফরম্যাট (0:"text"\n) পার্স করুন
                    const lines = chunk.split("\n").filter(Boolean);
                    for (const line of lines) {
                        if (line.startsWith("0:")) {
                            try {
                                const text = JSON.parse(line.slice(2));
                                assistantText += text;
                            } catch {
                                // যদি JSON পার্স ব্যর্থ হয়, plain text হিসেবে নিন
                                assistantText += line.slice(2);
                            }
                        } else {
                            // plain text fallback
                            assistantText += chunk;
                            break;
                        }
                    }

                    // রিয়েল-টাইমে UI আপডেট করুন
                    setMessages((prev) =>
                        prev.map((m) =>
                            m.id === assistantId ? { ...m, content: assistantText } : m
                        )
                    );
                }
            }
        } catch (error) {
            console.error("AI Error:", error);
            toast.error("FoodHub AI is taking a short break. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, [messages, isLoading]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage(input);
        setInput("");
    };

    const handleSuggestionClick = (query: string) => {
        if (isLoading) return;
        sendMessage(query);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const toggleChat = () => setIsOpen(!isOpen);
    const toggleMinimize = () => setIsMinimized(!isMinimized);

    return (
        <div className="fixed bottom-6 right-6 z-[200]">
            {/* Floating Action Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Button
                    onClick={toggleChat}
                    className={`w-16 h-16 rounded-full shadow-2xl ${isOpen
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-black"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                        } flex items-center justify-center p-0 border-4 border-white/20 backdrop-blur-xl transition-all duration-300`}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
                </Button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence mode="wait">
                {isOpen && !isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
                        className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[600px] flex flex-col bg-white/80 dark:bg-zinc-900/90 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden"
                    >
                        {/* Premium Header */}
                        <div className="p-6 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-zinc-900 dark:text-white text-sm tracking-tight">FoodHub AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live Assistant</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleMinimize}
                                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors text-zinc-400"
                                >
                                    <Minimize2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={toggleChat}
                                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors text-zinc-400"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-transparent"
                        >
                            {messages.map((m: any) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${m.role === "user" ? "bg-zinc-100 dark:bg-white/10" : "bg-orange-500"
                                            }`}>
                                            {m.role === "user" ? <User className="w-4 h-4 text-zinc-500" /> : <Bot className="w-4 h-4 text-white" />}
                                        </div>
                                        <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${m.role === "user"
                                            ? "bg-zinc-900 dark:bg-white text-white dark:text-black rounded-tr-none shadow-xl"
                                            : "bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 text-zinc-700 dark:text-zinc-300 rounded-tl-none shadow-sm"
                                            }`}>
                                            {(m as any).content}
                                            {Array.isArray(m.parts) && m.parts.map((part: any, i: number) =>
                                                part.type === 'text' ? <span key={i}>{part.text}</span> : null
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center animate-pulse">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="space-y-2 p-4 bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-2xl rounded-tl-none shadow-sm w-full min-w-[200px]">
                                            <Skeleton className="h-3 w-[150px] bg-zinc-200 dark:bg-zinc-800" />
                                            <Skeleton className="h-3 w-[100px] bg-zinc-200 dark:bg-zinc-800" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent">
                            {/* Suggestion Chips */}
                            {!isLoading && messages.length < 3 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSuggestionClick(s.query)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 shadow-sm"
                                        >
                                            {s.icon}
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form
                                onSubmit={handleFormSubmit}
                                className="relative flex items-center"
                            >
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full h-14 pl-6 pr-16 bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl text-sm font-bold outline-none focus:border-orange-500 transition-all placeholder:text-zinc-400 dark:text-white shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-orange-500/20"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Minimized Indicator */}
            <AnimatePresence>
                {isOpen && isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        onClick={toggleMinimize}
                        className="absolute bottom-20 right-0 p-4 bg-orange-500 text-white rounded-2xl shadow-xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-all active:scale-95 border-2 border-white/20 backdrop-blur-xl"
                    >
                        <div className="relative">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">AI is thinking...</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
