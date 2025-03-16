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

const About = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#098A6C] overflow-hidden -top-2">
      <div className="container-fluid w-full pt-8 md:pt-12">
        {/* Header */}
        <div className="flex justify-center md:justify-start mb-10 md:mb-16 mx-6 md:px-8 lg:px-12">
          <div style={headerStyle}>
            <h2 className="text-[#3F1508] font-Crunch-Chips text-xl md:text-2xl lg:text-3xl">
              ABOUT US
            </h2>
          </div>
        </div>

        {/* Content with position relative to allow absolute positioning */}
        <div className="relative mx-6 md:px-8 lg:px-12">
          {/* Text content - limited width to make space for image */}
          <div className="w-full md:w-3/5 lg:w-2/3 text-white">
            <p className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-medium mb-8 font-miso leading-tight">
              PETFEST INDONESIA is an exciting event designed to bring together
              cat & dog lovers, owners, and business in the pet industry.
            </p>
            <p className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-medium font-miso leading-tight">
              We aim to provide a dynamic platform for exhibitors to showcase
              their products and services, while also offering a fun-filled
              experience for attendees.
            </p>
          </div>

          {/* Dog image positioned absolutely at right edge on desktop */}
          <div className="hidden md:block absolute top-0 right-0">
            <Image
              src="/motion/dalmantion.gif"
              width={350}
              height={350}
              alt="Dalmatian dog"
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Mobile dog image - positioned at bottom */}
      <div className="flex justify-end bottom-0 right-0 md:hidden">
        <Image
          src="/motion/dalmantion.gif"
          width={200}
          height={200}
          alt="Dalmatian dog"
          priority
          className="object-contain pb-10"
        />
      </div>

      {/* Decorative elements */}
      <div className="md:flex justify-center items-center py-20 w-full h-1/2 hidden">
        <Image
          src="/images/batu.svg"
          width={200}
          height={200}
          alt="Decorative plants"
          className="w-3/4 object-cover h-1/2"
        />
      </div>
    </section>
  );
};

export default About;
