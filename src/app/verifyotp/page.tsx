"use client";
import React, { useState } from 'react'
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSearchParams } from "next/navigation";


function VerifyOtpPage() {

    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    console.log(email)

    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false);

    const onSubmitOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            await axios.post('/api/users/verifyotp', { email, otp }); 
    
            toast.success("OTP Verified Successfully!");
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch (error:unknown) {
            if (axios.isAxiosError(error)) {
              toast.error(error.response?.data?.error || "OTP verification failed");
            }else{
              toast.error("OTP verification failed");
            }
        }finally {
          setLoading(false); 
        }
    };
    
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-950">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Verify OTP
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Enter OTP sent on your email
        </p>

        <form className="my-8" onSubmit={onSubmitOTP}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">OTP</Label>
            <Input
              id="email"
              value={otp}
              placeholder="123456"
              type="text"
              className='text-center'
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}  &rarr;
            <BottomGradient />
          </button>
        </form>

        <p className="text-white text-sm mt-6">
          Go to
          <Link href={"/"} className="text-blue-400 text-sm ml-2">
            Home
          </Link>
        </p>
      </div>
    </div>
  )
};



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
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

export default VerifyOtpPage