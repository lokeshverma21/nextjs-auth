'use client'
import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { BackgroundLines } from "@/app/components/ui/background-lines";
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';
import { motion } from "framer-motion";


function VerifyEmailPage() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async() => {
        try {
            await axios.post("/api/users/verifyemail", {token})

            setVerified(true)
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Verification failed.");
            } else if (err instanceof Error) {
                setError(true);
            } else {
                setError(true);
            }
        }
    }

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail()
        }
    },[token]);


    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1]

        setToken(urlToken || "")
    },[])
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 gap-6">
        
        <h1 className='text-2xl text-white'>Verify Email</h1>
        {/* <h2 className='text-red-300'>{token ? `${token}`: "No Token"}</h2> */}


        {verified && (
            <div className='flex items-center justify-center w-full flex-col'>
                <h2 className='text-white'>Your Email has been Verified</h2>
                <motion.a href={`/login`}
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
                {/* <Link href={'/login'} className='bg-green-400'>Please Login</Link> */}
            </div>
        )}

        {error && (
            <div>
                <h2 className='text-red-500'>Error</h2>
            </div>
        )}
    </BackgroundLines>
  )
}

export default VerifyEmailPage