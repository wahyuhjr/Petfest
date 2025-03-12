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
    <section className="bg-[#4F98CF] relative w-full h-screen flex flex-col justify-center items-center overflow-hidden p-4">
      {/* Top Logos */}
      <div className="absolute top-8 w-full max-w-4xl mx-auto flex justify-center z-20">
        <div className="bg-white rounded-full px-8 py-3 flex items-center gap-4">
          <Image
            src="/images/LOGO PETFEST.png"
            width={100}
            height={40}
            alt="ICE Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center mt-24">
        {/* PETFEST Title */}
        <div className="flex justify-center space-x-2 mb-8">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              animate={{ rotate: [0, -3, 3, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 0.3,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
            >
              <Image
                src={`/images/${letter}`}
                width={80}
                height={80}
                alt={`Letter ${index + 1}`}
                className="w-16 md:w-20 lg:w-24 h-auto"
              />
            </motion.div>
          ))}
        </div>

        {/* Subtitle */}
        <h2 className="text-yellow-300 text-2xl md:text-4xl font-bold mb-6 text-center" style={{ textShadow: '2px 2px 0 #000' }}>
          REDEFINING PET EXPO EXPERIENCE<br />
          IN INDONESIA
        </h2>

        {/* Event Details */}
        <div className="text-white text-xl md:text-3xl font-bold mb-12" style={{ textShadow: '2px 2px 0 #000' }}>
          2ND-4TH MAY<br />
          ICE BSD, HALL 6-8
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="bg-[#FF69B4] hover:bg-[#FF1493] text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-transform duration-200 shadow-lg">
            BCA RP 1
          </button>
          <button className="bg-[#FF69B4] hover:bg-[#FF1493] text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-transform duration-200 shadow-lg">
            GENERAL ADMISSION
          </button>
          <button className="bg-[#FF69B4] hover:bg-[#FF1493] text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-transform duration-200 shadow-lg">
            PRIVATE SESSION WITH JACKSON GALAXY
          </button>
        </div>
      </div>

      {/* Background Trees and Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Tree */}
        <div className="absolute left-0 bottom-0 w-1/4">
          <Image
            src="/images/pohon-header-1.png"
            width={300}
            height={500}
            alt="Left Tree"
            className="w-full h-auto"
          />
        </div>

        {/* Right Tree */}
        <div className="absolute right-0 bottom-0 w-1/4">
          <Image
            src="/images/pohon-header-2.png"
            width={300}
            height={500}
            alt="Right Tree"
            className="w-full h-auto"
          />
        </div>

        {/* Add decorative elements */}
        <div className="absolute left-4 top-4">
          <Image
            src="/images/ASSET PENDUKUNG-03.png"
            width={100}
            height={100}
            alt="Decoration"
            className="w-20 h-20"
          />
        </div>
        <div className="absolute right-4 top-4">
          <Image
            src="/images/ASSET PENDUKUNG-04.png"
            width={100}
            height={100}
            alt="Decoration"
            className="w-20 h-20"
          />
        </div>
      </div>

      {/* Animals */}
      <div className="absolute bottom-20 left-1/4 z-10">
        <Image
          src="/images/ASSET PENDUKUNG-05.png"
          width={100}
          height={100}
          alt="Iguana"
          className="w-24 h-24"
        />
      </div>
      <div className="absolute bottom-20 right-1/4 z-10">
        <Image
          src="/images/ASSET PENDUKUNG-06.png"
          width={100}
          height={100}
          alt="Cat"
          className="w-24 h-24"
        />
      </div>
    </section>
  );
};

export default Hero;