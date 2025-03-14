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

const Hero = () => {
  const [windowHeight, setWindowHeight] = useState(0);

  // Mengambil tinggi jendela untuk responsivitas (jika diperlukan di pengembangan selanjutnya)
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // code;

    // Set nilai awal
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full min-h-screen flex overflow-hidden relative">
      {/* Wrapper untuk background */}
      <div className="relative w-full h-auto">
        {/* Header dengan teks "SPECIAL GUEST STAR"  */}
        <div className="absolute top-1/4 left-0 right-0 z-20 flex justify-center">
          <Image
            src="/motion/logo-petfest.gif"
            alt="Special Guest Star"
            width={400}
            height={100}
            priority
            className="object-contain"
          />
        </div>
        {/* Pohon kiri */}
        <div className="absolute md:-top-10 left-0 z-10 flex items-end h-full">
          <Image
            src="/images/hero-tree-left.svg"
            alt="Pohon kiri"
            width={450}
            height={400}
            priority
            className="object-contain"
          />
        </div>

        {/* Pohon kanan */}
        <div className="absolute md:-top-15 right-0 z-10 flex items-end h-full">
          <Image
            src="/images/hero-tree-right.svg"
            alt="Pohon kanan"
            width={450}
            height={400}
            priority
            className="object-contain"
          />
        </div>

        {/* Background image */}
        <div className="w-full relative">
          <Image
            src="/images/bg-hero.jpg"
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
    </section>
  );
};

export default Hero;
