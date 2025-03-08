"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { LampContainer } from "@/app/components/ui/lamp";
import { HoverBorderGradient } from '../components/ui/hover-border-gradient';

function ProfilePage() {

  // const router = useRouter();
  const [data, setData] = useState("nothing")

  // const onLogout = async () => {
  //   try {
  //     const response = await axios.get("/api/users/logout")

  //     toast.success("Logout successfull!!")

  //     router.push("/login")
  //   } catch (error: any) {
  //     console.log(error.message)

  //     toast.error(error.message)
  //   }
  // };


  const getUserDetail = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data)

    setData(res.data.data._id)
  }

  useEffect(() => {
    getUserDetail()
  },[])


  return (
    <div className='flex items-center justify-center h-[100vh]'>

    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 200 }}
        whileInView={{ opacity: 1, y: 100 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Welcome to Your Dashboard!
        <br />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0.5, y: 200 }}
        whileInView={{ opacity: 1, y: 100 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-sm font-base tracking-tight text-transparent md:text-xl"
        >
        Manage your account and explore your profile. Click the button below to view your details.
      </motion.p>

      <motion.a href={`/profile/${data}`}
        initial={{ opacity: 0.5, y: 200 }}
        whileInView={{ opacity: 1, y: 100 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-sm font-base tracking-tight text-transparent md:text-xl bg"
      >
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                <span>Go to your profile</span>
            </HoverBorderGradient>
      </motion.a>
    </LampContainer>
                </div>
  )
}

export default ProfilePage




    // <div className='flex items-center flex-col gap-10 justify-center min-h-screen py-2'>
    //     <h1>Profile</h1>
    //     <hr />

    //     <h1 className='text-xl text-white bg-gray-400 p-6'>{data === "nothing" 
    //         ? "No User" 
    //         : <Link href={`/profile/${data}`}
    //           >
    //             {data}
    //           </Link>
    //         }
    //     </h1>

    //     <button 
    //       onClick={onLogout}
    //       className='bg-red-400 p-4 rounded-md'>
    //         Logout
    //     </button>


    //     {/* <button 
    //       onClick={getUserDetail}
    //       className='bg-green-400 p-4 rounded-md'>
    //         Get User Detail
    //     </button> */}
    // </div>



