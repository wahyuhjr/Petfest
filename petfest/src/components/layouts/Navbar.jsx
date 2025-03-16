"use client";
import { useState } from "react";
import Image from "next/image";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-[#7B2F6C] p-6">
      <div className="container mx-auto text-white">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Image
              src="/images/logo/LOGO-PETFEST.jpg" // Update this path to your actual logo file
              alt="Company Logo"
              width={120}
              height={40}
              className="h-auto"
            />
          </div>
          
          {/* Navigation links for desktop */}
          <ul className="hidden md:flex justify-end md:ml-24 flex-grow text-center space-x-12 text-sm">
            <li>
              <a href="" className="">
                HOME 
              </a>
            </li>
            <li>
              <a href="" className="">
                ABOUT US
              </a>
            </li>
            <li>
              <a href="" className="">
                SPECIAL GUEST
              </a>
            </li>
            <li>
              <a href="" className="">
                BRAND
              </a>
            </li>
            <li>
              <a href="" className="">
                RUNDOWN
              </a>
            </li>
            <li>
              <a href="" className="">
                LAYOUT
              </a>
            </li>
            <li>
              <a href="" className="">
                FAQ
              </a>
            </li>
          </ul>

          {/* Hamburger Menu Icon for Mobile (Right Side) */}
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none md:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} mt-4`}>
          <ul className="flex flex-col justify-center items-center space-y-4 text-sm">
            <li>
              <a href="" className="">
                HOME
              </a>
            </li>
            <li>
              <a href="" className="">
                ABOUT US
              </a>
            </li>
            <li>
              <a href="" className="">
                SPECIAL GUEST
              </a>
            </li>
            <li>
              <a href="" className="">
                BRAND
              </a>
            </li>
            <li>
              <a href="" className="">
                RUNDOWN
              </a>
            </li>
            <li>
              <a href="" className="">
                LAYOUT
              </a>
            </li>
            <li>
              <a href="" className="">
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
