"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

function VerifyOtpComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(searchParams.get("email") || "");
  }, [searchParams]);

  const onSubmitOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/users/verifyotp', { email, otp });

      toast.success("OTP Verified Successfully!");
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "OTP verification failed");
      } else {
        toast.error("OTP verification failed");
      }
    } finally {
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
          Enter OTP sent to your email
        </p>

        <form className="my-8" onSubmit={onSubmitOTP}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              value={otp}
              placeholder="123456"
              type="text"
              className="text-center"
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"} &rarr;
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
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpComponent />
    </Suspense>
  );
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
