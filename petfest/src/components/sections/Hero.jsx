"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import usePetModal from "../hooks/UsePetModal";
import { Button } from "../ui/button";
import TicketBoxes from "../atoms/Hero/TicketBoxes";

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
        {/* <div className="absolute top-[8%] left-0 right-0 z-20 flex justify-center">
          <div className="bg-white px-4 py-1 rounded-full flex items-center">
            <span className="text-sm font-bold">
              <span className="text-red-600">1</span>
              <span className="bg-red-600 text-white px-1">C</span>
              <span className="text-black">E</span>
            </span>
            <span className="text-[8px] sm:text-xs mx-1 font-medium text-gray-700">
              International
              <br />
              Creative Events
            </span>
            <span className="mx-1 px-1 font-bold">USS •</span>
          </div>
        </div> */}

        {/* Monkey swing */}
        <div className="absolute top-8 z-10 flex justify-center w-full">
          <Image
            src="/motion/monkey-desktop.gif"
            alt="Decorative vine"
            width={500}
            height={500}
            className="mx-auto w-[500px] h-[500px] md:w-[1000px] md:h-[1000px]"
          />
        </div>
        {/* Monkey swing */}

        <div className="absolute top-[5%] sm:top-[8%] md:top-[10%] left-0 right-0 z-20 flex flex-col items-center px-4 sm:px-8">
          {/* Logo PETFEST */}
          <div className="z-20 flex flex-col items-center px-4 sm:px-8">
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
              className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-crunch-chips font-bold mt-4 sm:mt-6 text-yellow-300 text-center px-2 sm:px-4"
              style={{
                WebkitTextStroke: isMobile ? "0.5px #3F1508" : "1px #3F1508",
                textShadow: isMobile
                  ? "1px 1px 0 #3F1508"
                  : "2px 2px 0 #3F1508",
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
              className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-crunch-chips font-bold mt-3 sm:mt-4 text-white text-center"
              style={{
                WebkitTextStroke: isMobile ? "0.5px #3F1508" : "1px #3F1508",
                textShadow: isMobile
                  ? "1px 1px 0 #3F1508"
                  : "2px 2px 0 #3F1508",
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
          <TicketBoxes isMobile={isMobile} view={"mobile"} />
        </div>

        <TicketBoxes isMobile={isMobile} />

        {/* Hewan-hewan di halaman hero */}
        {/* Kucing - di bagian bawah kanan */}
        <div className="absolute lg:bottom-[13%] bottom-[0%] right-0 md:-right-7 z-10 w-24 h-24 sm:w-36 sm:h-36 md:w-[350px] md:h-[300px]">
          <Image
            src="/motion/kucing-abu.gif"
            alt="Cat"
            fill
            sizes="(max-width: 640px) 120px, (max-width: 768px) 144px, 250px"
            className="object-contain"
            priority
          />
        </div>

        {/* Iguana - di bagian bawah kiri */}
        <div className="absolute bottom-[0%] md:bottom-[20%] left-10 sm:left-4 md:left-20 z-10 w-24 h-24 sm:w-36 sm:h-36 md:w-[250px] md:h-[200px]">
          <Image
            src="/motion/iguana.gif"
            alt="Iguana"
            fill
            sizes="(max-width: 640px) 120px, (max-width: 768px) 144px, 250px"
            className="object-contain"
            priority
          />
        </div>

        {/* Background image */}
        <div className="w-full relative">
          <Image
            src={
              isMobile
                ? "/images/bg-hero-mobile-resize.jpg"
                : "/images/bg-hero-2.jpg"
            }
            alt="Jungle background with brick wall mobile"
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
