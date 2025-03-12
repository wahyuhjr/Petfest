"use client";

import Image from "next/image";

const headerStyle = {
  backgroundColor: "#DBCE02", // Yellow
  borderRadius: "9999px",
  padding: "0.5rem 2rem",
  borderTop: "4px solid #3D2000",
  borderLeft: "4px solid #3D2000",
  borderRight: "4px solid #3D2000",
  borderBottom: "8px solid #3D2000", // Thicker bottom border
};

const textStyle = {
  color: "#3F1508", // Brown text
  textAlign: "center", 
  letterSpacing: "0.05em",
  textShadow: "1px 1px 0 rgba(0, 0, 0, 0.2)",
};

const Footer = () => {
  return (
    <footer className="bg-white min-h-screen w-full relative flex flex-col">
      {/* Content container */}
      <div className="container mx-auto px-4 pt-6 flex-grow flex flex-col items-center">
        {/* SPONSORED */}
        <div className="mb-4" style={headerStyle}>
          <h1 className="font-crunch-chips text-2xl sm:text-3xl md:text-4xl"
              style={textStyle}>
            SPONSORED
          </h1>
        </div>

        {/* OFFICIAL BANK PARTNER */}
        <div className="mb-10 sm:mb-16" style={headerStyle}>
          <h1 className="font-crunch-chips text-2xl sm:text-3xl md:text-4xl"
              style={textStyle}>
            OFFICIAL BANK PARTNER
          </h1>
        </div>

        {/* BCA Logo - Larger size like in design */}
        <div className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] mb-12 sm:mb-16 md:mb-20">
          <div className="relative w-full aspect-[2/1]">
            <Image
              src="/images/logo-bca.png"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, 400px"
              alt="BCA"
              priority
            />
          </div>
        </div>

        {/* SUPPORTED BY - with same styling as headers */}
        <div className="mb-12 sm:mb-16" style={headerStyle}>
          <h1 className="font-crunch-chips text-2xl sm:text-3xl md:text-4xl"
              style={textStyle}>
            SUPPORTED BY
          </h1>
        </div>

        {/* Support logos - Horizontal layout for all screen sizes as shown in design */}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 w-full max-w-4xl mb-12 sm:mb-16">
          {/* Bluebird Logo */}
          <div className="relative w-[120px] sm:w-[150px] md:w-[180px] aspect-[3/2]">
            <Image
              src="/images/logo-bluebird.png"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, 180px"
              alt="Bluebird Group"
            />
          </div>

          {/* Hotel Tentrem Logo */}
          <div className="relative w-[120px] sm:w-[150px] md:w-[180px] aspect-[3/2]">
            <Image
              src="/images/logo-htj.png"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, 180px"
              alt="Hotel Tentrem Jakarta"
            />
          </div>

          {/* Aqua Logo */}
          <div className="relative w-[120px] sm:w-[150px] md:w-[180px] aspect-[3/2]">
            <Image
              src="/images/logo-aqua.png"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, 180px"
              alt="Aqua"
            />
          </div>
        </div>
      </div>

      {/* Footer image at bottom */}
      <div className="w-full left-0 right-0 bottom-0 mt-auto">
        <div className="relative w-full h-[180px] sm:h-[220px] md:h-[500px]">
          <Image
            src="/images/bg-footer3.jpg"
            fill
            style={{ 
              objectFit: "cover",
              objectPosition: "center top" // Show the top of the image
            }}
            alt="Footer decoration"
            priority
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
