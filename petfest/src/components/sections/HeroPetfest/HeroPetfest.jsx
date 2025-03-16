"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import usePetModal from "../../hooks/UsePetModal";

const HeroPetfest = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { PetModalComponent, autoShowModalAfter } = usePetModal();

  // Auto-show modal setelah 2 detik, hanya jika belum pernah ditutup sebelumnya
  autoShowModalAfter(2000);

  // Mengambil lebar jendela untuk responsivitas
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768); // Set mobile view if width is less than 768px
    };

    // Set nilai awal
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Header dengan USS logo */}
        <div className={styles.ussLogo}>
          <div className={styles.ussLogoContainer}>
            <Image
              src="/images/logo-uss.svg"
              alt="USS Logo"
              width={isMobile ? 120 : 160}
              height={isMobile ? 40 : 50}
              className={styles.ussLogoImage}
              priority
            />
          </div>
        </div>

        {/* Monkey swing */}
        <div className={styles.monkeySwing}>
          <Image
            src="/motion/monkey-desktop.gif"
            alt="Decorative vine"
            width={500}
            height={500}
            className={styles.monkeySwingImage}
          />
        </div>

        {/* Logo PETFEST */}
        <div className={styles.petfestLogo}>
          <Image
            src="/motion/logo-petfest.gif"
            alt="PetFest Logo"
            width={isMobile ? 250 : 350}
            height={isMobile ? 75 : 100}
            priority
            className={styles.petfestLogoImage}
          />

          {/* Tagline - Responsif text untuk mobile */}
          <h2 className={`${styles.tagline} font-crunch-chips`}>
            REDEFINING PET EXPO EXPERIECE
            <br />
            IN INDONESIA
          </h2>

          {/* Event date and location */}
          <h3 className={`${styles.eventDate} font-crunch-chips`}>
            2ND–4TH MAY
            <br />
            ICE BSD, HALL 6–8
          </h3>
        </div>

        {/* Ticket boxes */}
        <div className={`${styles.ticketSection} font-crunch-chips`}>
          {/* BCA Rp1 button */}
          <div className={styles.bcaButton}>
            <span className={styles.bcaButtonText}>BCA Rp 1</span>
            <div className={styles.bcaButtonContainer}>
              <button className={`${styles.clickHereButton} font-crunch-chips`}>
                CLICK HERE
              </button>
            </div>
          </div>

          {/* Ticket options */}
          <div className={styles.ticketOptionsContainer}>
            {/* General admission */}
            <div className={styles.ticketBox}>
              <span className={styles.ticketBoxText}>GENERAL ADMISSION</span>
              <div className={styles.ticketBoxButtonContainer}>
                <button className={`${styles.clickHereButton} font-crunch-chips`}>
                  CLICK HERE
                </button>
              </div>
            </div>

            {/* Private session */}
            <div className={styles.ticketBox}>
              <span className={styles.ticketBoxText}>
                PRIVATE SESSION WITH
                {isMobile ? " " : <br />}
                JACKSON GALAXY
              </span>
              <div className={styles.ticketBoxButtonContainer}>
                <button className={`${styles.clickHereButton} font-crunch-chips`}>
                  CLICK HERE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Kucing - di bagian bawah kanan */}
        <div className={styles.cat}>
          <Image
            src="/motion/kucing-abu.gif"
            alt="Cat"
            fill
            sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 350px"
            className={styles.catImage}
            priority
          />
        </div>

        {/* Iguana - di bagian bawah kiri */}
        <div className={styles.iguana}>
          <Image
            src="/motion/iguana.gif"
            alt="Iguana"
            fill
            sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 250px"
            className={styles.iguanaImage}
            priority
          />
        </div>

        {/* Background image */}
        <div className={styles.backgroundImage}>
          <Image
            src="/images/bg-hero-2.jpg"
            alt="Jungle background with brick wall"
            width={1000}
            height={1000}
            sizes="100vw"
            className={styles.backgroundImageImage}
            priority
          />
        </div>
      </div>

      {/* Show Modal */}
      <PetModalComponent />
    </section>
  );
};

export default HeroPetfest;
