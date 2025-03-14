"use client";

import Image from "next/image";

const headerStyle = {
  backgroundColor: "#DBCE02",
  borderRadius: "9999px",
  padding: "0.5rem 1.5rem",
  borderTop: "2px solid #3D2000",
  borderLeft: "4px solid #3D2000",
  borderRight: "4px solid #3D2000",
  borderBottom: "8px solid #3D2000",
  display: "inline-block",
};

const Guest = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#098A6C] overflow-hidden md:py-8 ">
      <div className="container-fluid w-full pt-8 md:pt-12">
        {/* Header */}
        <div className="flex justify-center md:justify-center mb-10 md:mb-16 ">
          <div style={headerStyle}>
            <h2 className="text-[#3F1508] font-crunch-chips text-xl md:text-2xl lg:text-3xl">
              GUEST STAR
            </h2>
          </div>
        </div>
      </div>

      {/* Background and decorative elements */}
      <div className="w-full h-[300px] md:h-[300px] mt-auto absolute bottom-0">
        {/* Main background */}
        <Image
          src="/images/bg-guest.svg"
          fill
          alt="Background"
          className="object-cover object-bottom absolute bottom-0 z-0"
        />
        
        {/* Left parrot */}
        <div className="absolute bottom-0 -top-20 left-0 z-10 hidden md:block">
          <Image
            src="/images/parrot-left.svg"
            width={700}
            height={700}
            alt="Red parrot"
            className="w-full h-[500px] object-contain"
          />
        </div>

        
        <div className="absolute bottom-0 -top-12 left-0 z-10 hidden md:block">
          <Image
            src="/motion/tupai.gif"
            width={700}
            height={700}
            alt="Red parrot"
            className="w-full h-[500px] object-contain"
          />
        </div>

        <div className="absolute bottom-0 top-10 left-0 z-10 sm:hidden">
          <Image
            src="/motion/tupai.gif"
            width={100}
            height={100}
            alt="Tupai"
            className="w-full h-[380px] object-contain"
          />
        </div>

        <div className="absolute bottom-0 right-40 z-10 hidden md:block">
          <Image
            src="/motion/ular-1.gif"
            width={60}
            height={90}
            alt="Yellow plant"
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="absolute bottom-0 right-0 z-10 hidden md:block">
          <Image
            src="/images/b-grass-right.svg"
            width={300}
            height={300}
            alt="Large pink plant"
            className="w-full h-[300px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Guest;
