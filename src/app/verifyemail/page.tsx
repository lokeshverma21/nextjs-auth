'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BackgroundLines } from "@/app/components/ui/background-lines";
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import { motion } from "framer-motion";

function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get token from URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");
        setToken(urlToken || "");
    }, []);

    // Verify user email when token is available
    useEffect(() => {
        if (token.length === 0) return;

        const verifyUserEmail = async () => {
            try {
                await axios.post("/api/users/verifyemail", { token });
                setVerified(true);
            } catch (err: unknown) {
                setError(
                    axios.isAxiosError(err)
                        ? err.response?.data?.message || "Verification failed."
                        : "Verification failed."
                );
            }
        };

        verifyUserEmail();
    }, [token]);

    return (
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 gap-6">
            <h1 className='text-2xl text-white'>Verify Email</h1>

            {verified && (
                <div className='flex items-center justify-center w-full flex-col'>
                    <h2 className='text-white'>Your Email has been Verified</h2>
                    <motion.a 
                        href={`/login`}
                        initial={{ opacity: 0.5, y: 200 }}
                        whileInView={{ opacity: 1, y: 100 }}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-sm font-base tracking-tight text-transparent md:text-xl bg"
                    >
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                        >
                            <span>Please Login</span>
                        </HoverBorderGradient>
                    </motion.a>
                </div>
            )}

            {error && (
                <div>
                    <h2 className='text-red-500'>{error}</h2>
                </div>
            )}
        </BackgroundLines>
    );
}

export default VerifyEmailPage;
