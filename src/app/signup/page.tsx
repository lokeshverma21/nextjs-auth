"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React , { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from "@/app/components/ui/input";
import { Label } from '../components/ui/label';
import { cn } from "@/lib/utils";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";

function SignupPage() {

    const router = useRouter()

    const [user, setUser] = useState({
        email:"",
        password:"",
        username:"",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true)

            const response = await axios.post("/api/users/signup", user)

            console.log("Signup success",response.data)
            toast.success("A verification link has been sent to your email.")

            router.push("/login")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log("SignUp failed",error)
                toast.error(error.message)
            }else{
                toast.error("Unknown error occured")
            }
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

  return (
    <BackgroundBeamsWithCollision className="flex items-center justify-center">
                <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        Welcome😊
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Signup here
                    </p>
    
                    <form className="my-8" onSubmit={onSignup}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={user.username}
                                placeholder="username"
                                type="text"
                                onChange={(e) =>
                                    setUser({ ...user, username: e.target.value })
                                }
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                value={user.email}
                                placeholder="example@gmail.com"
                                type="email"
                                onChange={(e) =>
                                    setUser({ ...user, email: e.target.value })
                                }
                            />
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                value={user.password}
                                placeholder="••••••••"
                                type="password"
                                onChange={(e) =>
                                    setUser({ ...user, password: e.target.value })
                                }
                            />
                        </LabelInputContainer>
    
                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                            disabled={buttonDisabled || loading}
                        >
                            {loading ? "Signing up..." : "Signup"} &rarr;
                            <BottomGradient />
                        </button>
    
                    </form>
    
                        <p className="text-white text-sm mt-6">
                            Already have an account
                            <Link href={'/login'} className="text-blue-400 text-sm ml-2"> Login</Link>
                        </p>
                </div>
            </BackgroundBeamsWithCollision>
  )
}



const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default SignupPage










// <div className='flex flex-col justify-center items-center min-h-screen py-2'>
    //     <h1>{loading ? "Processing..." : "Signup"}</h1>

    //     <hr />

    //     <div className='flex flex-col justify-start pb-6'>
    //         <label htmlFor="username" className='pl-2'>username</label>
    //         <input
    //             id='username'
    //             type="text" 
    //             value={user.username}
    //             onChange={(e) => setUser({...user, username: e.target.value})}
    //             placeholder='username'
    //             className='border-2 p-4 rounded-2xl'
    //         />
    //     </div>

    //     <div className='flex flex-col justify-start pb-6'>
    //         <label htmlFor="email" className='pl-2'>email</label>
    //         <input
    //             id='email'
    //             type="email" 
    //             value={user.email}
    //             onChange={(e) => setUser({...user, email: e.target.value})}
    //             placeholder='email'
    //             className='border-2 p-4 rounded-2xl'
    //         />
    //     </div>

    //     <div className='flex flex-col justify-start'>
    //         <label htmlFor="password" className='pl-2'>password</label>
    //         <input
    //             id='password'
    //             type="password" 
    //             value={user.password}
    //             onChange={(e) => setUser({...user, password: e.target.value})}
    //             placeholder='password'
    //             className='border-2 p-4 rounded-2xl'
    //         />
    //     </div>

    //     <button 
    //         onClick={onSignup}
    //         className='p-2 bg-gray-500 my-10 rounded-xl w-[100px] hover:bg-gray-600'>
    //         {buttonDisabled ? "No Signup" : "Signup"}
    //     </button>

    //     <Link href={'/login'}>Visit Login</Link>
    // </div>