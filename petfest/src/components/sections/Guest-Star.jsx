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

  // Track window height for better responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
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
        <div className="absolute top-34 left-0 right-0 z-20 flex justify-center">
          <div className="px-6 py-2" style={headerStyle}>
            <h2 className="text-[#3F1508] font-Crunch-Chips text-2xl md:text-4xl lg:text-4xl text-center">
              SPECIAL GUEST STAR
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

      <div className="absolute top-8 z-10">
        <Image
          src="/motion/Monkey-desktop.gif"
          alt="Monkey-swinging"
          width={500}
          height={500}
          className="mx-auto w-[500px] h-[500px] md:w-[1500px] md:h-[1500px]"
        />
      </div>

      {/* Content container with better responsive positioning */}
      <div className="absolute md:-inset-50 z-10 container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col items-center justify-center">
        <div className=" md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[1400px]">
          {/* Circular guest photo with name */}
          <div className="relative mb-8">
            <div className="mx-auto rounded-full overflow-hidden border-6 border-[#3F1508] w-48 h-48 lg:w-[500px] lg:h-[500px] relative z-20">
              <Image
                src="/images/cat-guest.png"
                alt="Guest star photo"
                width={250}
                height={250}
                className="w-full h-full object-cover mx-auto"
              />
            </div>

            {/* Name tag below photo */}
            <div className="mt-4 py-2 max-w-sm mx-auto" style={headerStyle}>
              <h2 className="text-[#3F1508] font-Crunch-Chips text-2xl md:text-4xl lg:text-4xl text-center">
                JACKSON GALAXY
              </h2>
            </div>
            <div className="text-center">
              <p className="text-[#3F1508] text-4xl font-bold font-miso pt-2">
                (CAT BEHAVIORIST)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestStar;
