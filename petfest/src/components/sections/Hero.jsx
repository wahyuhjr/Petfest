"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import usePetModal from "../hooks/UsePetModal";
import { Button } from "../ui/button";

const Hero = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { PetModalComponent, autoShowModalAfter } = usePetModal();

  // Auto-show modal setelah 2 detik, hanya jika belum pernah ditutup sebelumnya
  autoShowModalAfter(2000);

  // Mengambil lebar jendela untuk responsivitas
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768); // Set mobile view if width is less than 768px
    };

    // Set nilai awal
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="w-full min-h-screen flex overflow-hidden relative">
      <div className="relative w-full h-auto">
        {/* Header dengan ICE logo */}
        <div className="absolute top-[3%] sm:top-[5%] md:top-[8%] left-0 right-0 z-20 flex justify-center px-4 sm:px-0">
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

        {/* Monkey swing */}
        <div className="absolute top-8 z-10 flex justify-center w-full">
          <Image
            src="/motion/Monkey-desktop.gif"
            alt="Monkey swinging hero"
            width={500}
            height={500}
            className="mx-auto w-[350px] h-[300px] md:w-[1000px] md:h-[1000px]"
          />
        </div>
        {/* Monkey swing */}

        {/* Logo PETFEST */}
        <div className="absolute top-[7%] sm:top-[18%] md:top-[20%] left-0 right-0 z-20 flex flex-col items-center px-4 sm:px-8">
          <Image
            src="/motion/logo-petfest.gif"
            alt="PetFest Logo"
            width={isMobile ? 250 : 350}
            height={isMobile ? 75 : 100}
            priority
            className="object-contain w-[80%] sm:w-[70%] md:w-[60%] max-w-[700px] h-auto"
          />

          {/* Tagline - Responsif text untuk mobile */}
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

          {/* Event date and location - Ukuran font ditingkatkan pada mobile */}
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

        {/* Ticket boxes - Pink boxes di bawah text ICE BSD */}
        <div className="absolute bottom-[14%] lg:bottom-[25%] left-0 right-0 z-20 flex flex-col items-center space-y-3 sm:space-y-4 font-crunch-chips px-4 sm:px-6">
          {/* BCA Rp1 button */}
          <div
            className="bg-[#EC497F] rounded-3xl px-4 py-2 sm:px-5 sm:py-2 md:px-8 shadow-md max-w-[60%] sm:max-w-[250px] border-2 border-black"
            style={{
              boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
            }}
          >
            <span
              className="text-lg sm:text-xl md:text-3xl font-bold text-white block text-center"
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
                CLICK HERE
              </Button>
            </div>
          </div>

          {/* Ticket options in a row */}
          <div className="flex flex-col sm:flex-row md:gap-6 justify-center space-y-3 sm:space-y-0 sm:space-x-3 w-full max-w-[90%] sm:max-w-[85%] md:max-w-[65%]">
            {/* General admission */}
            <div
              className="bg-[#EC497F] rounded-3xl max-w-3/4 mx-auto lg:px-4 py-2 sm:px-5 sm:py-2 shadow-md w-full sm:w-1/2 border-2 border-black"
              style={{
                boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
              }}
            >
              <span
                className="text-lg sm:text-xl md:text-3xl font-bold text-white block text-center items-center md:mt-5"
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
                  CLICK HERE
                </Button>
              </div>
            </div>

            {/* Private session */}
            <div
              className="bg-[#EC497F] rounded-3xl max-w-3/4 mx-auto px-2 lg:px-4 py-2 sm:px-5 sm:py-2 md:px-8 shadow-md w-full sm:w-1/2 border-2 border-black"
              style={{
                boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
              }}
            >
              <span
                className="text-lg sm:text-xl md:text-3xl font-bold text-white block text-center"
                style={{
                  textShadow: "2px 2px 0 #3F1508",
                }}
              >
                PRIVATE SESSION WITH
                <br className={isMobile ? "hidden" : "block"} />
                {isMobile ? " " : ""} JACKSON GALAXY
              </span>
              <div className="mt-1 text-center px-1">
                <Button
                  className="text-xs sm:text-sm font-bold bg-yellow-400 hover:bg-yellow-500 rounded-md px-2 py-1 font-crunch-chips border border-black"
                  style={{
                    textShadow: "1px 1px 0 #3F1508",
                    boxShadow: "1px 1px 0 #000",
                  }}
                >
                  CLICK HERE
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hewan-hewan di halaman hero */}
        {/* Kucing - di bagian bawah kanan */}
        <div className="absolute lg:bottom-[13%] bottom-[30%] right-0 md:-right-7 z-10 w-24 h-24 sm:w-36 sm:h-36 md:w-[350px] md:h-[300px]">
          <Image
            src="/motion/kucing-abu.gif"
            alt="Cat"
            fill
            sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 250px"
            className="object-contain"
            priority
          />
        </div>

        {/* Iguana - di bagian bawah kiri */}
        <div className="absolute bottom-[28%] md:bottom-[20%] left-4 md:left-20 z-10 w-24 h-24 sm:w-36 sm:h-36 md:w-[250px] md:h-[200px]">
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
            src="/images/bg-hero-2.jpg"
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
