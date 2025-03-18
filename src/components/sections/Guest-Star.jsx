"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const headerStyle = {
  backgroundColor: "#DBCE02",
  borderRadius: "9999px",
  padding: "0rem 2rem",
  borderTop: "2px solid #3D2000",
  borderLeft: "4px solid #3D2000",
  borderRight: "4px solid #3D2000",
  borderBottom: "8px solid #3D2000",
};

const GuestStar = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Track window height and width for better responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full min-h-screen flex overflow-hidden relative -mt-5">
      {/* Wrapper for background image */}
      <div className="relative w-full h-auto">
        <div className="absolute  top-[10%] md:top-34 left-0 right-0 z-20 flex justify-center">
          <div className="px-6 py-2" style={headerStyle}>
            <h2 className="text-[#3F1508] font-crunch-chips text-2xl md:text-4xl lg:text-4xl text-center">
              SPECIAL GUEST STARS
            </h2>
          </div>
        </div>

        <div className="w-full relative">
          <Image
            src="/images/bg-guest-star-3.jpg"
            alt="Jungle background with brick wall"
            width={0}
            height={0}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 100vw"
            className="w-full h-auto object-cover scale-x-[1.01] min-h-screen sm:min-h-0"
            priority
            style={{
              display: "block",
              objectPosition: "center",
            }}
          />
        </div>
      </div>

      {/* Brick fence/wall added at the bottom of the screen */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Image
          src="/images/pager.svg"
          alt="Brick fence"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-cover"
          style={{
            maxHeight: "1000px",
          }}
        />
      </div>

      <div className="absolute lg:bottom-[13%] bottom-[5%] -right-[30%] md:-right-[7%] z-10 w-[250px] h-[250px] sm:w-36 sm:h-36 md:w-[650px] md:h-[600px]">
        <Image
          src="/motion/cat-orange.gif"
          alt="Cat"
          fill
          sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 250px"
          className="object-contain"
          priority
        />
      </div>

      <div className="absolute lg:bottom-[10%] bottom-[0%] -left-[20%] md:-left-[13%] z-10 w-[250px] h-[250px] sm:w-36 sm:h-36 md:w-[650px] md:h-[600px]">
        <Image
          src="/images/dog-pink.svg"
          alt="Dog"
          fill
          sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 250px"
          className="object-contain"
          priority
        />
      </div>

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

      {/* Content container with side-by-side guest stars */}
      <div className="absolute md:-inset-80 z-10 container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col items-center justify-center">
        {/* Guest stars now use flex layout for side-by-side on larger screens */}
        <div className="flex flex-col md:flex-row md:gap-8 lg:gap-16 md:mt-36">
          {/* First Guest Star - Jackson Galaxy */}
          <div className="relative mb-6 md:mb-0 flex flex-col items-center">
            {/* Ukuran pada mobile dikurangi, responsive sizing yang lebih tepat */}
            <div className="rounded-full overflow-hidden border-4 md:border-6 border-[#3F1508] w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 relative z-20">
              <Image
                src="/images/jackson-galaxy.jpg"
                alt="Jackson Galaxy photo"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name tag below photo - ukuran lebih kecil pada mobile */}
            <div
              className="mt-2 md:mt-4 py-1 md:py-2 px-3 md:px-4"
              style={headerStyle}
            >
              <h2 className="text-[#3F1508] font-crunch-chips text-lg md:text-2xl lg:text-3xl text-center">
                JACKSON GALAXY
              </h2>
            </div>
            <div className="text-center">
              <p className="text-[#3F1508] text-xl md:text-3xl font-bold font-miso pt-1 md:pt-2">
                (CAT BEHAVIORIST)
              </p>
            </div>
          </div>

          {/* Second Guest Star - Gabriel Feitosa */}
          <div className="relative flex flex-col items-center">
            {/* Ukuran pada mobile dikurangi, sama dengan guest star pertama */}
            <div className="rounded-full overflow-hidden border-4 md:border-6 border-[#3F1508] w-32 h-32 md:w-64 md:h-64 lg:w-80 lg:h-80 relative z-20">
              <Image
                src="/images/gabriel-feitosa.jpg"
                alt="Gabriel Feitosa photo"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name tag below photo - ukuran lebih kecil pada mobile */}
            <div
              className="mt-2 md:mt-4 py-1 md:py-2 px-3 md:px-4"
              style={headerStyle}
            >
              <h2 className="text-[#3F1508] font-crunch-chips text-lg md:text-2xl lg:text-3xl text-center">
                GABRIEL FEITOSA
              </h2>
            </div>
            <div className="text-center">
              <p className="text-[#3F1508] text-xl md:text-3xl font-bold font-miso pt-1 md:pt-2">
                (BRAZILIAN DOG GROOMING ARTIST)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestStar;
