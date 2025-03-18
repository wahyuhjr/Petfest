// hooks/usePetModal.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const usePetModal = () => {
  const [showPetModal, setShowPetModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch animals data from API
  useEffect(() => {
    async function fetchAnimals() {
      try {
        const res = await fetch('/api/data/all');
        const data = await res.json();
        
        if (data.success && data.data.animals) {
          setAnimals(data.data.animals);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching animals:', error);
        setLoading(false);
      }
    }
    fetchAnimals();
  }, []);

  // Check if user has interacted previously
  useEffect(() => {
    const hasUserInteracted = localStorage.getItem("petModalInteracted");
    const savedPetPreference = localStorage.getItem("userPetPreference");
    
    if (hasUserInteracted) {
      setHasInteracted(true);
    }
    
    if (savedPetPreference) {
      try {
        setSelectedPet(JSON.parse(savedPetPreference));
      } catch (e) {
        localStorage.removeItem("userPetPreference");
      }
    }
  }, []);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to open modal
  const openPetModal = () => {
    if (!hasInteracted) {
      setShowPetModal(true);
    }
  };

  // Handle pet selection and update click count via API
  const handlePetSelection = async (animal) => {
    setSelectedPet(animal);
    localStorage.setItem("userPetPreference", JSON.stringify(animal));
    
    try {
      const res = await fetch(`/api/animals/click/${animal.id}`, {
        method: 'POST',
      });
      const data = await res.json();
      
      if (data.success) {
        // Update the click count in our local state
        setAnimals(prevAnimals =>
          prevAnimals.map(a =>
            a.id === animal.id ? data.data : a
          )
        );
      }
    } catch (error) {
      console.error('Error updating click count:', error);
    }
    
    closePetModal();
  };

  // Function to close modal and mark that user has interacted
  const closePetModal = () => {
    setShowPetModal(false);
    setHasInteracted(true);
    localStorage.setItem("petModalInteracted", "true");
  };

  // Auto-show modal after a certain time (only if never interacted)
  const autoShowModalAfter = (delayMs = 2000) => {
    useEffect(() => {
      if (!hasInteracted) {
        const timer = setTimeout(() => {
          openPetModal();
        }, delayMs);
        return () => clearTimeout(timer);
      }
    }, [hasInteracted]); // eslint-disable-line react-hooks/exhaustive-deps
  };

  // Modal component
  const PetModalComponent = () => {
    if (!showPetModal) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Changed to blurred background instead of black opacity */}
        <div
          className="backdrop-blur-md absolute inset-0"
          onClick={closePetModal}
        ></div>

        <div
          className="relative w-11/12 max-w-md sm:max-w-lg md:max-w-2xl p-4 sm:p-5 md:p-6 rounded-lg shadow-lg animate-fadeIn"
          style={{
            background:
              "repeating-linear-gradient(#4ca9e9, #4ca9e9 10px, #3c99d9 10px, #3c99d9 20px)",
          }}
        >
          {/* Improved black close button with hover effect */}
          <button
            className="absolute right-3 top-3 z-10 transition-transform hover:scale-110 active:scale-95"
            onClick={closePetModal}
            aria-label="Close"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black flex items-center justify-center shadow-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
          </button>

          {/* Title */}
          <div className="flex justify-center">
            <Image
              src="/images/logo-uss.svg"
              alt="USS Logo"
              width={isMobile ? 120 : 160}
              height={isMobile ? 40 : 50}
              className="w-[160px] sm:w-[180px] md:w-[450px] h-auto object-contain"
              priority
            />
          </div>

          <div className="flex justify-center pt-3">
            <Image
              src="/images/SURVEI-07.svg"
              alt="USS Logo"
              width={isMobile ? 120 : 160}
              height={isMobile ? 40 : 50}
              className="w-[160px] sm:w-[180px] md:w-[450px] h-auto object-contain"
              priority
            />
          </div>

          {/* Pet Grid */}
          {loading ? (
            <div className="text-center py-8 text-white font-bold">Loading animals...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 pt-8 pb-4">
              {animals.map((animal, index) => (
                <div key={animal.id || index} className="flex flex-col items-center pb-4">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center mb-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={animal.imageUrl || '/images/pet-placeholder.svg'}
                        alt={animal.name}
                        fill
                        sizes="(max-width: 768px) 64px, (max-width: 1024px) 96px, 128px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {/* Fix for font not loading - adding inline font style as backup */}
                  <p
                    className="text-white font-bold text-xs sm:text-sm md:text-xl my-2"
                    style={{
                      fontFamily: "'Crunch Chips', Arial, sans-serif", // Add fallback fonts
                      textShadow: "1px 1px 0 #3F1508",
                    }}
                  >
                    {animal.name.toUpperCase()}
                  </p>
                  <button
                    className="bg-yellow-300 rounded-xl px-2 sm:px-3 md:px-4 py-0.5 md:py-1 text-[10px] sm:text-xs md:text-base font-bold hover:translate-y-0.5 transition-all text-white"
                    style={{
                      fontFamily: "'Crunch Chips', Arial, sans-serif", // Add fallback fonts
                      textShadow: "1px 1px 0 #3F1508",
                      boxShadow: isMobile ? "1px 1px 0 #000" : "2px 2px 0 #000",
                    }}
                    onClick={() => handlePetSelection(animal)}
                  >
                    CLICK HERE
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Function to reset interaction status (for testing)
  const resetInteractionStatus = () => {
    localStorage.removeItem("petModalInteracted");
    localStorage.removeItem("userPetPreference");
    setHasInteracted(false);
    setSelectedPet(null);
  };

  return {
    showPetModal,
    isMobile,
    animals,
    hasInteracted,
    selectedPet,
    openPetModal,
    closePetModal,
    handlePetSelection,
    autoShowModalAfter,
    resetInteractionStatus,
    PetModalComponent,
  };
};

export default usePetModal;