"use client";

import Image from "next/image";

const headerStyle = {
  backgroundColor: "#DBCE02", // Yellow
  borderRadius: "9999px",
  padding: "0rem 2rem",
  borderTop: "2px solid #3D2000",
  borderLeft: "4px solid #3D2000",
  borderRight: "4px solid #3D2000",
  borderBottom: "8px solid #3D2000", // Thicker bottom border
};

const Footer = () => {
  return (
    <footer className="bg-white min-h-screen w-full relative flex flex-col">
      {/* Content container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10 xl:pt-12 flex-grow flex flex-col items-center">
        {/* SPONSORED */}
        <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6" style={headerStyle}>
            <h2 className="text-[#3F1508] font-crunch-chips text-2xl md:text-4xl lg:text-4xl text-center">
              SPONSORED
            </h2>
        </div>

        {/* OFFICIAL BANK PARTNER */}
        <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6" style={headerStyle}>
            <h2 className="text-[#3F1508] font-crunch-chips text-2xl md:text-4xl lg:text-4xl text-center">
              OFFICIAL BANK PARTNER
            </h2>
        </div>

        {/* BCA Logo - Responsive sizes for all devices */}
        <div className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[320px] lg:max-w-[400px] xl:max-w-[480px] 2xl:max-w-[550px] mb-8 sm:mb-10 md:mb-14">
          <div className="relative w-full aspect-[2/1]">
            <Image
              src="/images/logo-bca.jpg"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 320px, (max-width: 1280px) 400px, (max-width: 1536px) 480px, 550px"
              alt="BCA"
              priority
            />
          </div>
        </div>

        {/* SUPPORTED BY */}
        <div className="mb-3 sm:mb-4 md:mb-16 lg:mb-16" style={headerStyle}>
            <h2 className="text-[#3F1508] font-crunch-chips text-2xl md:text-4xl lg:text-4xl text-center">
              SUPPORT BY
            </h2>
        </div>

        {/* Support logos - Responsive for all screen sizes */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 2xl:gap-32 w-full max-w-7xl mb-8 sm:mb-10 md:mb-14 lg:mb-20 xl:mb-24">
          {/* Bluebird Logo */}
          <div className="relative w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] xl:w-[250px] 2xl:w-[280px] aspect-[3/2]">
            <Image
              src="/images/sponsor/logo-bluebird.jpg"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 180px, (max-width: 1280px) 220px, (max-width: 1536px) 250px, 280px"
              alt="Bluebird Group"
            />
          </div>

          {/* Hotel Tentrem Logo */}
          <div className="relative w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] xl:w-[250px] 2xl:w-[280px] aspect-[3/2]">
            <Image
              src="/images/sponsor/logo-htj.jpg"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 180px, (max-width: 1280px) 220px, (max-width: 1536px) 250px, 280px"
              alt="Hotel Tentrem Jakarta"
            />
          </div>

          {/* Aqua Logo */}
          <div className="relative w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] xl:w-[250px] 2xl:w-[280px] aspect-[3/2]">
            <Image
              src="/images/sponsor/logo-aqua.jpg"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 180px, (max-width: 1280px) 220px, (max-width: 1536px) 250px, 280px"
              alt="Aqua"
            />
          </div>
        </div>
      </div>

      {/* Footer image optimized for MacBooks to prevent cropping */}
      <div className="w-full left-0 right-0 bottom-0 mt-auto overflow-hidden">
        {/* Desktop/MacBook specific version with controlled aspect ratio */}
        <div className="hidden lg:block relative w-full">
          <div className="relative w-full" style={{ paddingBottom: "28%" }}>
            <Image
              src="/images/bg-footer3.jpg"
              fill
              style={{
                objectFit: "contain", // Changed to contain to prevent cropping
                objectPosition: "center bottom", // Align to bottom to show the ground
              }}
              sizes="100vw"
              alt="Footer decoration"
              priority
            />
          </div>
        </div>
        {/* Mobile and tablet version (unchanged) */}
        <div className="lg:hidden relative w-full h-[150px] sm:h-[200px] md:h-[280px]">
          <Image
            src="/images/bg-footer3.jpg"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center top",
            }}
            sizes="100vw"
            alt="Footer decoration"
            priority
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
