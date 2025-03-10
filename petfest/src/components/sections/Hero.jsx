"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const letters = [
  "P.png",
  "E-1.png",
  "T-1.png",
  "F.png",
  "E-2.png",
  "S.png",
  "T-2.png",
];

const Hero = () => {
  return (
    <section className="bg-[#4F98CF] relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Tulisan PETFEST */}
      {/* <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2 z-50">
        {letters.map((letter, index) => (
          <motion.img
            key={index}
            src={`/images/${letter}`} // Ambil gambar dari folder /images/
            alt={letter}
            className="w-16 md:w-20 lg:w-24 h-auto" // Responsive ukuran huruf
            animate={{ rotate: [0, -3, 3, -2, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.3,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          />
        ))}
      </div> */}

      {/* Pohon untuk desktop (2 pohon kiri & kanan) */}
      <div className="hidden md:flex absolute inset-0 justify-between items-center h-screen z-10">
        {/* Pohon kiri */}
        <div className="w-1/3 h-full max-w-[450px] flex items-end">
          <Image
            src="/images/pohon-header-1.png"
            width={450}
            height={900}
            alt="Pohon Kiri"
            className="object-cover h-full"
          />
        </div>

        {/* Pohon kanan */}
        <div className="w-1/3 h-full max-w-[450px] flex items-end">
          <Image
            src="/images/pohon-header-2.png"
            width={450}
            height={900}
            alt="Pohon Kanan"
            className="object-cover h-full"
          />
        </div>
      </div>

      {/* Pohon untuk mobile (1 pohon tengah) */}
      <div className="md:hidden absolute inset-0 flex justify-center items-end h-screen z-10">
        <Image
          src="/images/pohon-header-1.png"
          width={600}
          height={900}
          alt="Pohon Tengah"
          className="object-cover h-full"
        />
      </div>
    </section>
  );
};

export default Hero;
