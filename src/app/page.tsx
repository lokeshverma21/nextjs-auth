"use client"
import { BackgroundBeams } from "./components/ui/background-beams";
import Navbar from "./components/Navbar";
import { BackgroundLines } from "./components/ui/background-lines";
import { Cover } from "./components/ui/cover";

export default function Home() {
  return (
    <div className="pt-20 bg-black">
      <h1>
          <Navbar/>
      </h1>
    <div className="h-[80vh] md:h-[79vh] w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <div className="max-w-2xl mx-auto p-4">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-6xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Next.js<Cover>Authentication</Cover>Hub
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            Secure, seamless, and scalable authentication for modern web applications.
          </p>
        </div>
      {/* <Social/> */}
      </BackgroundLines>
      <BackgroundBeams />
    </div>
    </div>
  );
}
