"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
    const router = useRouter()
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitEmail = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/forgotpassword", { email });

      console.log(response.data);
      toast.success("OTP sent to your email!!");

      router.push(`/verifyotp?email=${encodeURIComponent(email)}`);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
          toast.error("Failed to send OTP");
        }else{
          toast.error("Something went wrong")
        }
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-950">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Forgot Password
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Enter your email to receive an OTP for password reset.
        </p>

        <form className="my-8" onSubmit={onSubmitEmail}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={email}
              placeholder="example@gmail.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}  &rarr;
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
  );
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

export default ForgotPasswordPage;
