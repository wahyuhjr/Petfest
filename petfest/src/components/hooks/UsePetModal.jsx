// hooks/usePetModal.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const usePetModal = () => {
  const [showPetModal, setShowPetModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const pets = [
    { name: 'CAT', image: '/images/cat.png' },
    { name: 'DOG', image: '/images/dog.png' },
    { name: 'AVIARY', image: '/images/Aviary.png' },
    { name: 'FISH', image: '/images/fish.png' },
    { name: 'SMALL ANIMAL', image: '/images/small-animal.png' },
    { name: 'REPTILE', image: '/images/reptile.png' },
  ];

  // Cek apakah pengguna pernah berinteraksi sebelumnya
  useEffect(() => {
    // Periksa localStorage untuk melihat apakah modal sudah pernah ditutup
    const hasUserInteracted = localStorage.getItem('petModalInteracted');
    if (hasUserInteracted) {
      setHasInteracted(true);
    }
  }, []);

  // Deteksi ukuran layar untuk responsivitas
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Set mobile view if width is less than 768px
    };

    // Set nilai awal
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fungsi untuk menampilkan modal
  const openPetModal = () => {
    if (!hasInteracted) {
      setShowPetModal(true);
    }
  };

  // Fungsi untuk menutup modal dan menandai bahwa pengguna telah berinteraksi
  const closePetModal = () => {
    setShowPetModal(false);
    setHasInteracted(true);
    
    // Simpan ke localStorage bahwa pengguna sudah berinteraksi
    localStorage.setItem('petModalInteracted', 'true');
  };

  // Auto-show modal setelah jangka waktu tertentu (hanya jika belum pernah berinteraksi)
  const autoShowModalAfter = (delayMs = 2000) => {
    useEffect(() => {
      // Hanya tampilkan modal jika pengguna belum pernah berinteraksi
      if (!hasInteracted) {
        const timer = setTimeout(() => {
          openPetModal();
        }, delayMs);
        
        return () => clearTimeout(timer); // Clean up timer
      }
    }, [hasInteracted]); // eslint-disable-line react-hooks/exhaustive-deps
  };

  // Komponen modal untuk digunakan
  const PetModalComponent = () => {
    if (!showPetModal) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="bg-black bg-opacity-60 absolute inset-0"
          onClick={closePetModal}
        ></div>

        <div
          className="relative w-11/12 max-w-md sm:max-w-lg md:max-w-2xl p-4 sm:p-5 md:p-6 rounded-lg shadow-lg animate-fadeIn"
          style={{
            background:
              "repeating-linear-gradient(#4ca9e9, #4ca9e9 10px, #3c99d9 10px, #3c99d9 20px)",
          }}
        >
          {/* Modal close button */}
          <button
            className="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white rounded-full p-1 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center shadow-md z-10"
            onClick={closePetModal}
          >
            <span className="text-base sm:text-lg md:text-xl font-bold">
              &times;
            </span>
          </button>

          {/* Header with logo and user status */}
          <div className="flex justify-between items-center mb-3 sm:mb-4 text-xs sm:text-sm">
            <div className="flex items-center bg-white px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1 rounded-full">
              <span className="font-bold text-[10px] sm:text-xs md:text-sm">
                Universitas
              </span>
              <span className="mx-0.5 sm:mx-1 px-0.5 sm:px-1 bg-red-600 text-white rounded text-[10px] sm:text-xs md:text-sm font-bold">
                1C
              </span>
              <span className="font-bold text-[10px] sm:text-xs md:text-sm">
                Sistem Ujian
              </span>
            </div>
            <div className="bg-white px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1 rounded-full">
              <span className="font-bold text-[10px] sm:text-xs md:text-sm">
                USS •
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-xl sm:text-2xl md:text-4xl text-center font-bold mb-3 sm:mb-5 md:mb-8 text-yellow-300"
            style={{
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              WebkitTextStroke: isMobile ? "1px black" : "2px black",
              textShadow: isMobile ? "2px 2px 0 #000" : "3px 3px 0 #000",
            }}
          >
            WHICH PETS
            <br />
            ARE YOUR FAVES?
          </h1>

          {/* Pet Grid - 2 columns on mobile, 3 on larger screens */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {pets.map((pet, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center overflow-hidden">
                  {/* Menggunakan gambar dari array pets daripada emoji */}
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-48 md:h-48">
                    <Image
                      src={pet.image}
                      alt={pet.name}
                      fill
                      sizes="(max-width: 768px) 40px, (max-width: 1024px) 156px, 80px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <p
                  className="text-white font-bold text-xs sm:text-sm md:text-xl my-1 sm:my-2"
                  style={{
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  }}
                >
                  {pet.name}
                </p>
                <button
                  className="bg-yellow-300 rounded-xl px-2 sm:px-3 md:px-4 py-0.5 md:py-1 text-[10px] sm:text-xs md:text-base font-bold hover:translate-y-0.5 transition-all"
                  style={{
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
                  }}
                  onClick={closePetModal}
                >
                  CLICK HERE
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Fungsi untuk reset status interaksi (berguna untuk testing)
  const resetInteractionStatus = () => {
    localStorage.removeItem('petModalInteracted');
    setHasInteracted(false);
  };

  return {
    showPetModal,
    isMobile,
    pets,
    hasInteracted,
    openPetModal,
    closePetModal,
    autoShowModalAfter,
    resetInteractionStatus,
    PetModalComponent
  };
};

export default usePetModal;
