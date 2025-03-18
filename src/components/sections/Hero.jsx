"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import usePetModal from "../hooks/UsePetModal";
import { Button } from "../ui/button";
import Link from "next/link"; 

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { PetModalComponent, autoShowModalAfter, selectedPet } = usePetModal();

  // Auto-show modal after 2 seconds, only if never closed before
  autoShowModalAfter(2000);

  // Get window width for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect to handle selected pet preference
  useEffect(() => {
    if (selectedPet) {
      console.log(`User selected ${selectedPet} as their favorite pet type`);
    }
  }, [selectedPet]);

  // Determine if we should show pet-specific content
  const getPetSpecificContent = () => {
    if (!selectedPet) return null;

    switch (selectedPet) {
      case "CAT":
        return (
          <div className="absolute top-1 right-1 bg-yellow-100 p-2 rounded-lg border-2 border-yellow-300 z-30">
            <p className="text-xs md:text-sm font-bold">Cat lover! 🐱</p>
          </div>
        );
      case "DOG":
        return (
          <div className="absolute top-1 right-1 bg-yellow-100 p-2 rounded-lg border-2 border-yellow-300 z-30">
            <p className="text-xs md:text-sm font-bold">Dog lover! 🐶</p>
          </div>
        );
      // Add cases for other pet types
      default:
        return null;
    }
  };

  return (
    <section className="w-full min-h-screen flex overflow-hidden relative">
      {getPetSpecificContent()}

      <div className="relative w-full h-auto">
        {/* Header with ICE logo */}
        <div className="absolute top-[3%] sm:top-[5%] md:top-[4%] left-0 right-0 z-20 flex justify-center px-4 sm:px-0">
          <div className="rounded-full flex items-center justify-center">
            <Image
              src="/images/logo-uss.svg"
              alt="USS Logo"
              width={isMobile ? 120 : 160}
              height={isMobile ? 40 : 50}
              className="w-[160px] sm:w-[180px] md:w-[500px] h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Monkey animation */}
        <div className="absolute top-0 left-0 right-0 z-30 w-full overflow-hidden">
          <div className="relative w-full flex justify-center">
            <Image
              src="/motion/Monkey-desktop.gif"
              alt="Monkey swinging hero"
              width={2000}
              height={1000}
              priority
              className="w-[150%] max-w-none h-auto"
              style={{
                marginTop: "-2%",
                objectFit: "contain",
                objectPosition: "top center",
              }}
            />
          </div>
        </div>

        {/* Logo PETFEST - posisi mobile lebih rendah */}
        <div className="absolute top-[10%] sm:top-[15%] md:top-[10%] left-0 right-0 z-20 flex flex-col items-center px-4 sm:px-8">
          <Image
            src="/motion/logo-petfest.gif"
            alt="PetFest Logo"
            width={isMobile ? 250 : 350}
            height={isMobile ? 75 : 100}
            priority
            className="object-contain w-[80%] sm:w-[70%] md:w-[60%] max-w-[700px] h-auto"
          />

          {/* Tagline - Responsive text for mobile */}
          <h2
            className="text-2xl sm:text-xl md:text-3xl lg:text-5xl font-crunch-chips font-bold mt-4 sm:mt-6 text-yellow-300 text-center px-2 sm:px-4"
            style={{
              WebkitTextStroke: isMobile ? "0.5px #3F1508" : "1px #3F1508",
              textShadow: isMobile ? "1px 1px 0 #3F1508" : "2px 2px 0 #3F1508",
              letterSpacing: "0.5px",
              lineHeight: "1.2",
            }}
          >
            REDEFINING PET EXPO EXPERIECE
            <br />
            IN INDONESIA
          </h2>

          {/* Event date and location - Font size increased on mobile */}
          <h3
            className="text-2xl sm:text-xl md:text-3xl lg:text-5xl font-crunch-chips font-bold mt-3 sm:mt-4 text-white text-center"
            style={{
              WebkitTextStroke: isMobile ? "0.5px #3F1508" : "1px #3F1508",
              textShadow: isMobile ? "1px 1px 0 #3F1508" : "2px 2px 0 #3F1508",
              letterSpacing: "0.5px",
              lineHeight: "1.3",
            }}
          >
            2ND–4TH MAY
            <br />
            ICE BSD, HALL 6–8
          </h3>
        </div>

        {/* Ticket boxes - 4 items grid pada layar > sm, dan 1 column grid pada layar mobile */}
        <div className="absolute bottom-[10%] lg:bottom-[30%] left-0 right-0 z-20 flex flex-col items-center space-y-3 sm:space-y-4 font-crunch-chips px-4 sm:px-6">
          {/* Grid untuk 4 box pink */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[90%] sm:max-w-[85%] md:max-w-[80%]">
            {/* Box 1: BCA Rp1 */}
            <div
              className="bg-[#EC497F] rounded-3xl px-4 py-2 shadow-md border-2 border-black"
              style={{
                boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
              }}
            >
              <span
                href="https://www.addtix.id/event/petfest-2025-promo-bca"
                className="text-md sm:text-xl md:text-2xl font-bold text-white block text-center"
                style={{
                  textShadow: "2px 2px 0 #3F1508",
                }}
              >
                BCA Rp 1
              </span>
              <div className="mt-1 text-center px-1">
                <Button
                  className="text-xs sm:text-sm font-bold bg-yellow-400 hover:bg-yellow-500 rounded-md px-2 py-1 font-crunch-chips border border-black"
                  style={{
                    textShadow: "1px 1px 0 #3F1508",
                    boxShadow: "1px 1px 0 #000",
                  }}
                >
                  <Link href="https://www.addtix.id/event/petfest-2025-promo-bca">
                    CLICK HERE
                  </Link>
                </Button>
              </div>
            </div>

            {/* Box 2: General Admission */}
            <div
              className="bg-[#EC497F] rounded-3xl px-4 py-2 shadow-md border-2 border-black"
              style={{
                boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
              }}
            >
              <span
                className="text-md sm:text-xl md:text-2xl font-bold text-white block text-center"
                style={{
                  textShadow: "2px 2px 0 #3F1508",
                }}
              >
                GENERAL ADMISSION
              </span>
              <div className="mt-1 text-center px-1">
                <Button
                  className="text-xs sm:text-sm font-bold bg-yellow-400 hover:bg-yellow-500 rounded-md px-2 py-1 font-crunch-chips border border-black"
                  style={{
                    textShadow: "1px 1px 0 #3F1508",
                    boxShadow: "1px 1px 0 #000",
                  }}
                >
                  <Link href="https://www.addtix.id/event/petfest-2025">
                    CLICK HERE
                  </Link>
                </Button>
              </div>
            </div>

            {/* Box 3: Private Session */}
            <div
              className="bg-[#EC497F] rounded-3xl px-4 py-2 shadow-md border-2 border-black"
              style={{
                boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
              }}
            >
              <span
                className="text-md sm:text-xl md:text-2xl font-bold text-white block text-center"
                style={{
                  textShadow: "2px 2px 0 #3F1508",
                }}
              >
                PRIVATE SESSION
                <br />
                WITH JACKSON GALAXY
              </span>
              <div className="mt-1 text-center px-1">
                <Button
                  className="text-xs sm:text-sm font-bold bg-yellow-400 hover:bg-yellow-500 rounded-md px-2 py-1 font-crunch-chips border border-black"
                  style={{
                    textShadow: "1px 1px 0 #3F1508",
                    boxShadow: "1px 1px 0 #000",
                  }}
                >
                  <Link href="https://www.addtix.id/event/private-session">
                    CLICK HERE
                  </Link>
                </Button>
              </div>
            </div>

            {/* Box 4: New Pink Box - Contoh dengan nama "VIP PACKAGE" */}
            <div
              className="bg-[#EC497F] rounded-3xl px-4 py-2 shadow-md border-2 border-black"
              style={{
                boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
              }}
            >
              <span
                className="text-md sm:text-xl md:text-2xl font-bold text-white block text-center"
                style={{
                  textShadow: "2px 2px 0 #3F1508",
                }}
              >
                PRIVATE SESSION
                <br />
                WITH Gabriel Feitosa
              </span>
              <div className="mt-1 text-center px-1">
                <Button
                  className="text-xs sm:text-sm font-bold bg-yellow-400 hover:bg-yellow-500 rounded-md px-2 py-1 font-crunch-chips border border-black"
                  style={{
                    textShadow: "1px 1px 0 #3F1508",
                    boxShadow: "1px 1px 0 #000",
                  }}
                >
                  <Link href="https://www.addtix.id/event/private-session-gabriel-feitosa">
                    CLICK HERE
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Animals on hero page */}
        {/* Cat - bottom right */}
        <div className="absolute lg:bottom-[30%] bottom-[40%] right-0 md:-right-7 z-10 w-24 h-24 sm:w-36 sm:h-36 md:w-[350px] md:h-[300px]">
          <Image
            src="/motion/kucing-abu.gif"
            alt="Cat"
            fill
            sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 250px"
            className="object-contain"
            priority
          />
        </div>

        {/* Iguana - bottom left */}
        <div className="absolute bottom-[40%] md:bottom-[35%] left-4 md:left-20 z-10 w-24 h-24 sm:w-36 sm:h-36 md:w-[250px] md:h-[200px]">
          <Image
            src="/motion/iguana.gif"
            alt="Iguana"
            fill
            sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 250px"
            className="object-contain"
            priority
          />
        </div>

        {/* Background image */}
        <div className="w-full relative">
          <Image
            src="/images/bg-hero-new.jpg"
            alt="Jungle background with brick wall"
            width={1000}
            height={1000}
            sizes="100vw"
            className="w-full h-auto object-cover scale-x-[1.01] min-h-screen"
            priority
            style={{
              objectPosition: isMobile ? "center center" : "center center",
            }}
          />
        </div>
      </div>

      {/* Show Modal */}
      <PetModalComponent />
    </section>
  );
};

export default Hero;
