"use client";
import { HoverBorderGradient } from "@/app/components/ui/hover-border-gradient";
import { ShootingStars } from "@/app/components/ui/shooting-stars";
import { StarsBackground } from "@/app/components/ui/stars-background";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React,{ useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserProfile() {
  const params = useParams();

    interface UserData {
      username: string;
      email: string;
    }

  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null)


    const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout")

      toast.success("Logout successfull!!")

      router.push("/login")
    } catch (error: any) {
      console.log(error.message)

      toast.error(error.message)
    }
  };

  const getUserDetail = async () => {
    const res = await axios.get('/api/users/me')
    // console.log(res.data)

    setData(res.data.data)
  }

  useEffect(() => {
    getUserDetail()
  },[])

  return (
    <div className="h-[41rem] bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
        <span>Welcome</span>
        {/* <span className="text-white text-lg font-thin">x</span> */}
        <span>{data?.username ?? "loading...."}</span>
      </h2>

      <p className="text-white pt-4">{data?.email ?? "your email"}</p>


      <div className="flex justify-center items-center mt-16 gap-10">
          <Link href={'/forgot-password'}>
            <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  >
                  <span>Forgot Password 🤔</span>
            </HoverBorderGradient>
          </Link>


          {/* <button onClick={onLogout}> */}
            <HoverBorderGradient
                    onClick={onLogout}
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-red-500 flex items-center space-x-2"
                    >
                    <span>Logout 🙋‍♂️</span>
            </HoverBorderGradient>
          {/* </button> */}
        </div>

      <ShootingStars />
      <StarsBackground />
    </div>


  );
}
