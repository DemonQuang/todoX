import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-[#f0f7ff] overflow-hidden relative">

            {/* Background */}
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 50% 30%, #dae9ff 0%, transparent 70%), radial-gradient(circle at 80% 80%, #f4eaff 0%, transparent 60%)",
                }}
            />

            {/* Header */}
            <header className="fixed top-0 w-full px-8 py-6 flex justify-between items-center z-10">
                <span className="text-2xl font-bold text-blue-600">todoX</span>
            </header>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8">

                {/* Text */}
                <div className="space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[12rem] font-black leading-none tracking-tighter text-[#1A4B9F]"
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-semibold italic"
                    >
                        Lost in the Sanctuary?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl max-w-md mx-auto text-[#1A4B9F]/80"
                    >
                        Oops! The page you're looking for doesn't exist.
                    </motion.p>
                </div>

                {/* Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative w-full max-w-lg aspect-square flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-linear-to-tr from-purple-400/20 to-blue-400/20 blur-3xl rounded-full" />

                    <img
                        src="https://picsum.photos/seed/sanctuary/600/600"
                        alt="404"
                        className="relative z-10 w-full rounded-2xl shadow-2xl opacity-90"
                    />

                    <div className="absolute top-1/4 right-1/4 z-20 w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg rotate-12">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </motion.div>

                {/* Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => navigate("/")}
                    className="px-10 py-4 bg-blue-500 text-white font-bold rounded-xl shadow-xl hover:scale-105 active:scale-95 transition"
                >
                    BACK TO MY TASKS
                </motion.button>
            </main>

            {/* Footer */}
            <footer className="py-10 text-center text-blue-400">
                © 2026 todoX
            </footer>
        </div>
    );
}