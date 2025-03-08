"use client"
import React from "react";
import { FloatingDock } from "@/app/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconHome,
  IconKey,
  IconLogin2,
  IconWorld,
} from "@tabler/icons-react";


function Navbar() {

    const links = [
        {
          title: "Home",
          icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        {
          title: "Developer Website",
          icon: (
            <IconWorld className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "https://www.lokeshverma.in/",
        },
     
        {
          title: "Developer Linkedin",
          icon: (
            <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "https://www.linkedin.com/in/lokesh-verma1/",
        },
        {
          title: "Developer GitHub",
          icon: (
            <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "https://github.com/lokeshverma21",
        },
        {
          title: "Login",
          icon: (
            <IconLogin2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/login",
        },
        {
          title: "Change Password",
          icon: (
            <IconKey className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "/forgot-password",
        },
      ];


  return (
        <div className="flex items-center justify-center w-full bg-black">
            <FloatingDock
                // mobileClassName="translate-y-20"
                items={links}
            />
        </div>
  )
}

export default Navbar