// hooks/usePetModal.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const usePetModal = () => {
  const [showPetModal, setShowPetModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const pets = [
    { name: "CAT", image: "/images/SURVEI-01.svg" },
    { name: "DOG", image: "/images/SURVEI-02.svg" },
    { name: "AVIARY", image: "/images/SURVEI-03.svg" },
    { name: "FISH", image: "/images/SURVEI-04.svg" },
    { name: "SMALL ANIMAL", image: "/images/SURVEI-05.svg" },
    { name: "REPTILE", image: "/images/SURVEI-06.svg" },
  ];

  // Cek apakah pengguna pernah berinteraksi sebelumnya
  useEffect(() => {
    // Periksa localStorage untuk melihat apakah modal sudah pernah ditutup
    const hasUserInteracted = localStorage.getItem("petModalInteracted");
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
    localStorage.setItem("petModalInteracted", "true");
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

          {/* Title */}
          <div className="flex justify-center">
            <Image
              src="/images/SURVEI-07.svg"
              alt="USS Logo"
              width={isMobile ? 120 : 160}
              height={isMobile ? 40 : 50}
              className="w-[160px] sm:w-[180px] md:w-[450px] h-auto object-contain"
              priority
            />
          </div>

          {/* Pet Grid - 2 columns on mobile, 3 on larger screens */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {pets.map((pet, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 flex items-center justify-center overflow-hidden">
                  {/* Menggunakan gambar dari array pets daripada emoji */}
                  <div className="relative w-20 h-20 sm:w-14 sm:h-14 md:w-48 md:h-48 font-crunch-chips">
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
                  className="text-white font-bold text-xs sm:text-sm md:text-xl my-1 sm:my-2 font-crunch-chips"
                  style={{
                    textShadow: "1px 1px 0 #3F1508",
                  }}
                >
                  {pet.name}
                </p>
                <button
                  className="bg-yellow-300 rounded-xl px-2 sm:px-3 md:px-4 py-0.5 md:py-1 text-[10px] sm:text-xs md:text-base font-bold hover:translate-y-0.5 transition-all font-crunch-chips text-white"
                  style={{
                    textShadow: "1px 1px 0 #3F1508",
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
    localStorage.removeItem("petModalInteracted");
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
    PetModalComponent,
  };
};

export default usePetModal;
