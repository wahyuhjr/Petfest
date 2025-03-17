"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const headerStyle = {
  backgroundColor: "#DBCE02",
  borderRadius: "9999px",
  padding: "0rem 2rem",
  borderTop: "2px solid #3D2000",
  borderLeft: "4px solid #3D2000",
  borderRight: "4px solid #3D2000",
  borderBottom: "8px solid #3D2000",
};

const Brand = ({ brands }) => {
  // Use provided brands or empty array if not provided
  const brandData = brands || [];
  
  // State for current page of brands
  const [currentPage, setCurrentPage] = useState(0);
  // State for animation
  const [isAnimating, setIsAnimating] = useState(false);
  // State for animation direction
  const [direction, setDirection] = useState("next");
  
  // Cards per page
  const cardsPerPage = 6;
  // Calculate total number of pages
  const totalPages = Math.ceil(brandData.length / cardsPerPage);
  
  // Get current brands to display
  const currentBrands = brandData.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  // Function to go to next page
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection("next");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Function to go to previous page
  const prevPage = () => {
    if (currentPage > 0) {
      setDirection("prev");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Calculate placeholder count
  const placeholderCount = cardsPerPage - currentBrands.length;

  return (
    <section className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Blue background */}
      <div className="absolute inset-0 bg-[#2AA6DE] z-0" />

      {/* Decorative tree elements - top left - EVEN LARGER */}
      <div className="absolute top-0 left-0 w-[40%] max-w-[350px] z-10">
        <Image
          src="/images/b-tree-left.svg"
          width={350}
          height={350}
          alt="Decorative element"
          className="w-full h-auto"
        />
      </div>

      {/* Decorative tree elements - top right - EVEN LARGER */}
      <div className="absolute top-0 right-0 w-[40%] max-w-[350px] z-10">
        <Image
          src="/images/b-tree-right.svg"
          width={600}
          height={600}
          alt="Decorative element"
          className="w-full h-auto"
        />
      </div>

      {/* Decorative elements - bottom left - EVEN LARGER */}
      <div className="absolute bottom-0 left-0 w-[40%] max-w-[320px] z-10">
        <Image
          src="/images/b-grass-left.svg"
          width={320}
          height={320}
          alt="Decorative element"
          className="w-full h-auto"
        />
      </div>

      {/* Decorative elements - bottom right - EVEN LARGER */}
      <div className="absolute bottom-0 right-0 w-[40%] max-w-[320px] z-10">
        <Image
          src="/images/b-grass-right.svg"
          width={320}
          height={320}
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

        {/* Brand logo carousel container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Brand logo grid - showing 6 cards with larger layout */}
          <div 
            className={`grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 transition-all duration-300 ${
              isAnimating 
                ? direction === "next" 
                  ? "translate-x-[-10%] opacity-0" 
                  : "translate-x-[10%] opacity-0" 
                : "translate-x-0 opacity-100"
            }`}
          >
            {/* Display actual brands */}
            {currentBrands.map((brand) => (
              <div key={brand.id} className="flex justify-center">
                <Link 
                  href={brand.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full cursor-pointer"
                >
                  <div className="w-full aspect-square relative bg-white rounded-full p-2 border-2 border-gray-200 shadow-md hover:shadow-lg transition-all hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 p-6 sm:p-8 md:p-9 flex items-center justify-center">
                        <div className="relative w-full h-full overflow-hidden rounded-full">
                          <Image
                            src={brand.logoUrl}
                            alt={brand.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 250px"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

            {/* Add placeholder white cards if needed */}
            {Array.from({ length: placeholderCount }).map((_, index) => (
              <div key={`placeholder-${index}`} className="flex justify-center">
                <div className="w-full aspect-square relative bg-white rounded-full p-2 border-2 border-gray-200 shadow-md overflow-hidden opacity-50">
                  {/* Empty placeholder */}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows - only show if there are more than 6 brands */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-8">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 0}
                className={`bg-white rounded-full p-2 shadow-md ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <div 
                    key={index}
                    className={`h-3 w-3 rounded-full ${currentPage === index ? 'bg-white' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages - 1}
                className={`bg-white rounded-full p-2 shadow-md ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
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