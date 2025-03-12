"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  // Optional: State to track window dimensions for advanced responsive behavior
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  // Optional: Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background color - fallback if image is still loading */}
      <div className="absolute inset-0 bg-[#4F98CF] z-0" />

      {/* Cartoon Scene Background - Using fill for better responsive behavior */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/images/bg-header.svg" // Use your actual image path
          alt="Colorful pet scene with animals"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center sm:object-contain md:object-cover lg:object-contain xl:object-cover"
        />
      </div>

      {/* Option 1: If you want to add text/content on top of the background */}
      <div className="relative z-20 container mx-auto px-4 py-10 h-screen flex flex-col justify-center items-center">
        {/* Your content here */}
        {/* Example: <h1 className="text-4xl md:text-6xl font-bold text-white">PET FEST</h1> */}
      </div>
      
      {/* 
        Option 2: If using fixed position images for specific elements
        This allows more precise positioning of elements at different breakpoints
      */}
      {windowDimensions.width > 768 && (
        <>
          {/* Example: Positioned animals that only appear on larger screens */}
          <div className="hidden md:block absolute bottom-[10%] left-[15%] w-[20%] max-w-[180px] z-20">
            <Image
              src="/motion/iguana.gif" // Use your actual image path
              width={180}
              height={120}
              alt="Iguana"
              className="w-full h-auto"
            />
          </div>
          
          {/* Example: Cat positioned on right side */}
          <div className="hidden md:block absolute bottom-[12%] right-[18%] w-[20%] max-w-[200px] z-20">
            <Image
              src="/motion/kucing-abu.gif" // Use your actual image path
              width={200}
              height={150}
              alt="Cat"
              className="w-full h-auto"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
