"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white py-6 sm:py-10 md:py-16 min-h-screen w-full bg-cover bg-center relative">
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="font-bold text-orange-300 text-xl sm:text-2xl md:text-3xl mb-2">
          SPONSORED
        </h1>
        <h1 className="font-bold text-orange-300 text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 md:mb-8 text-center">
          OFFICIAL BANK PARTNER
        </h1>

        {/* BCA Logo - Different sizes for different devices */}
        <div className="py-4 sm:py-6 md:py-10 w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] mx-auto">
          <div className="relative w-full h-0 pb-[50%]">
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

        <h1 className="font-bold text-orange-300 text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 md:mb-8 text-center">
          SUPPORT BY
        </h1>

        {/* Support logos - Grid layout specifically optimized for iPad */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-8 w-full max-w-4xl">
          {/* First Logo */}
          <div className="relative h-16 sm:h-24 md:h-32 mx-auto sm:mx-0 w-full max-w-[180px] sm:max-w-full">
            <Image
              src="/images/logo-bluebird.png"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 33vw, 200px"
              alt="Logo 1"
            />
          </div>

          {/* Second Logo */}
          <div className="relative h-16 sm:h-24 md:h-32 mx-auto sm:mx-0 w-full max-w-[180px] sm:max-w-full">
            <Image
              src="/images/logo-aqua.png"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 33vw, 200px"
              alt="Logo 2"
            />
          </div>

          {/* Third Logo */}
          <div className="relative h-16 sm:h-24 md:h-32 mx-auto sm:mx-0 w-full max-w-[180px] sm:max-w-full">
            <Image
              src="/images/logo-htj.png"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 33vw, 200px"
              alt="Logo 3"
            />
          </div>
        </div>
        <div className="w-full h-auto mt-auto">
        <div className="w-full h-[100px] sm:h-[150px] md:h-[200px]">
          <Image
            src="/images/bg-footer.jpg"
            fill
            style={{ objectFit: "cover", objectPosition: "center bottom" }}
            sizes="100vw"
            alt="Footer decoration"
            priority
          />
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
