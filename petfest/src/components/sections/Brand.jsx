"use client";

import { Button } from "@chakra-ui/react";
import Image from "next/image";

const headerStyle = {
  backgroundColor: "#DBCE02",
  borderRadius: "9999px",
  padding: "0rem 2rem",
  borderTop: "2px solid #3D2000",
  borderLeft: "4px solid #3D2000",
  borderRight: "4px solid #3D2000",
  borderBottom: "8px solid #3D2000",
};

const Brand = () => {
  const brands = [
    { id: 1, name: "Blackwood", src: "/images/logo-aqua.png" },
    { id: 2, name: "Dog Appétit", src: "/images/logo-bluebird.png" },
    { id: 3, name: "Boss Cat", src: "/images/logo-htj.png" },
    { id: 4, name: "Frost", src: "/images/brands/frost.svg" },
    { id: 5, name: "Gem Kitty", src: "/images/brands/gem-kitty.svg" },
    { id: 6, name: "Petto", src: "/images/brands/petto.svg" },
    { id: 7, name: "Grain Link", src: "/images/brands/grain-link.svg" },
    { id: 8, name: "Marmutops", src: "/images/brands/marmutops.svg" },
    { id: 9, name: "MS", src: "/images/brands/ms.svg" },
    { id: 10, name: "Petopia", src: "/images/brands/petopia.svg" },
    { id: 11, name: "Super Sol", src: "/images/brands/super-sol.svg" },
    { id: 12, name: "Susu Ellis", src: "/images/brands/susu-ellis.svg" },
  ];

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Blue background */}
      <div className="absolute inset-0 bg-[#2AA6DE] z-0" />

      {/* Decorative tree elements - top left */}
      <div className="absolute top-0 left-0 w-[20%] max-w-[180px] z-10">
        <Image
          src="/images/b-tree-left.svg"
          width={150}
          height={150}
          alt="Decorative element"
          className="w-full h-auto"
        />
      </div>

      {/* Decorative tree elements - top right */}
      <div className="absolute top-0 right-0 w-[20%] max-w-[180px] z-10">
        <Image
          src="/images/b-tree-right.svg"
          width={350}
          height={350}
          alt="Decorative element"
          className="w-full h-auto"
        />
      </div>

      {/* Decorative elements - bottom left */}
      <div className="absolute bottom-0 left-0 w-[20%] max-w-[150px] z-10">
        <Image
          src="/images/b-grass-left.svg"
          width={150}
          height={150}
          alt="Decorative element"
          className="w-full h-auto"
        />
      </div>

      {/* Decorative elements - bottom right */}
      <div className="absolute bottom-0 right-0 w-[20%] max-w-[150px] z-10">
        <Image
          src="/images/b-grass-right.svg"
          width={150}
          height={150}
          alt="Decorative element"
          className="w-full h-auto"
        />
      </div>

      {/* Content container */}
      <div className="container relative mx-auto px-4 z-20">
        {/* BRAND Header */}
        <div className="w-full flex justify-center mb-8 md:mb-12">
          <div className="" style={headerStyle}>
            <h2 className="text-[#3F1508] font-crunch-chips text-2xl md:text-4xl lg:text-4xl text-center">
              BRAND
            </h2>
          </div>
        </div>

        {/* Brand logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {brands.map((brand) => (
            <div key={brand.id} className="flex justify-center">
              <div className="w-full aspect-square relative bg-white rounded-full p-2 border-2 border-gray-200 shadow-md hover:shadow-lg transition-all hover:scale-105">
                <div className="absolute inset-0 p-3 sm:p-4 md:p-5 flex items-center justify-center">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AND MANY MORE Footer */}
        <div className="w-full flex justify-center mt-10 md:mt-12">
          <div className="bg-transparent rounded-full border-2 border-white px-6 py-2">
            <h2 className="text-white font-bold text-lg md:text-xl font-crunch-chips">
              AND MANY MORE
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brand;
