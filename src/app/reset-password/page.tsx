"use client";
import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function ResetPasswordComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(searchParams.get("email") || "");
  }, [searchParams]);

  const onSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email) {
      setError("Invalid or missing email. Please try again.");
      setLoading(false);
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      setError("Both password fields are required.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/users/resetpassword", {
        email,
        newPassword,
      });

      setSuccess(response.data.message);
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-950">
      <div className="max-w-md w-full mx-auto p-6 md:p-8 bg-white dark:bg-black rounded-lg shadow-lg">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Reset Password
        </h2>
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          Enter your new password below
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

        <form className="my-6" onSubmit={onSubmitNewPassword}>
          <LabelInputContainer>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              value={newPassword}
              placeholder="Ab$123@"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mt-4">
            <Label htmlFor="confirmNewPassword">Confirm Password</Label>
            <Input
              id="confirmNewPassword"
              value={confirmNewPassword}
              placeholder="Ab$123@"
              type="password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              disabled={loading}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br mt-4 cursor-pointer relative group/btn from-black to-neutral-600 dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow"
            type="submit"
            disabled={loading}
          >
            {loading ? "Setting New Password..." : "Set New Password"}
          </button>
        </form>

        <p className="text-white text-sm mt-4">
          Go to
          <Link href="/" className="text-blue-400 ml-2">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
