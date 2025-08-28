"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-black/90 shadow-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-30">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Bold City IAQ Home"
          >
            <Image
              src="/images/logo.webp"
              alt="Bold City IAQ logo"
              width={200}
              height={60}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 font-heading text-sm uppercase text-white relative">
            {/* Services Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center gap-1 uppercase focus:outline-none">
                Services <IoChevronDown size={14} />
              </button>
              <div
                className={`absolute top-full left-0 w-64 bg-white text-navy rounded shadow-lg z-50 overflow-hidden transition-all duration-300 ease-out opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}
              >
                <Link
                  href="/services/mold-remediation"
                  className="block px-4 py-2 hover:bg-lightGray"
                >
                  Mold Remediation
                </Link>
                <Link
                  href="/services/water-damage-restoration"
                  className="block px-4 py-2 hover:bg-lightGray"
                >
                  Water Damage
                </Link>
                <Link
                  href="/services/fire-and-smoke-restoration"
                  className="block px-4 py-2 hover:bg-lightGray"
                >
                  Fire & Smoke Restoration
                </Link>
                <Link
                  href="/services/cleaning-and-sanitization"
                  className="block px-4 py-2 hover:bg-lightGray"
                >
                  Cleaning & Sanitization
                </Link>
                <Link
                  href="/services/emergency-services"
                  className="block px-4 py-2 hover:bg-lightGray"
                >
                  Emergency Services
                </Link>
              </div>
            </div>

            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>

            <a
              href="tel:+19044346318"
              className="ml-4 border border-white rounded px-4 py-1 hover:bg-white hover:text-navy transition"
            >
              Call Us
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-white text-3xl focus:outline-none"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className={`md:hidden bg-black/0 shadow-md
           text-white font-heading text-sm uppercase px-4 pb-4 space-y-2 transition-all`}
        >
          <details className="group">
            <summary className="py-2 cursor-pointer">Services</summary>
            <div className="pl-4 text-white/90 text-sm space-y-1 pt-1">
              <Link href="/services/mold-remediation" className="block">
                Mold Remediation
              </Link>
              <Link href="/services/water-damage-restoration" className="block">
                Water Damage
              </Link>
              <Link
                href="/services/fire-and-smoke-restoration"
                className="block"
              >
                Fire & Smoke
              </Link>
              <Link
                href="/services/cleaning-and-sanitization"
                className="block"
              >
                Cleaning & Sanitization
              </Link>
              <Link href="/services/emergency-services" className="block">
                Emergency
              </Link>
            </div>
          </details>
          <Link href="/about" className="block py-2">
            About
          </Link>
          <Link href="/contact" className="block py-2">
            Contact
          </Link>
          <a
            href="tel:+19044346318"
            className="block py-2 mt-2 border border-white rounded text-center"
          >
            Call Us
          </a>
        </div>
      )}
    </nav>
  );
}
