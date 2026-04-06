"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const serviceLinks = [
  { href: "/services/mold-remediation", label: "Mold Remediation" },
  {
    href: "/services/water-damage-restoration",
    label: "Water Damage Restoration",
  },
  {
    href: "/services/fire-and-smoke-restoration",
    label: "Fire & Smoke Restoration",
  },
  {
    href: "/services/cleaning-and-sanitization",
    label: "Cleaning & Sanitization",
  },
  { href: "/services/emergency-services", label: "Emergency Services" },
];

const serviceAreaLinks = [
  { href: "/service-areas/jacksonville", label: "Jacksonville" },
  { href: "/service-areas/orange-park", label: "Orange Park" },
  { href: "/service-areas/fleming-island", label: "Fleming Island" },
  { href: "/service-areas/jacksonville-beach", label: "Jacksonville Beach" },
  { href: "/service-areas/ponte-vedra", label: "Ponte Vedra" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > 120 && currentScrollY > lastScrollY && !isOpen) {
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
      }

      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-transform duration-300 ${
        hideOnScroll ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled || isOpen
          ? "bg-black/90 shadow-md backdrop-blur-md"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
      aria-label="Main Navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[78px] items-center justify-between lg:h-[84px]">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="Bold City IAQ Home"
            onClick={closeMenu}
          >
            <Image
              src="/images/logo.webp"
              alt="Bold City IAQ logo"
              width={160}
              height={48}
              priority
              className="h-auto w-[138px] sm:w-[150px] lg:w-[160px]"
            />
          </Link>

          <div className="hidden items-center gap-6 font-heading text-[13px] uppercase tracking-[0.08em] text-white lg:flex">
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 text-white/95 transition hover:text-aqua"
              >
                Services <IoChevronDown size={14} />
              </button>

              <div className="pointer-events-none absolute left-0 top-full mt-3 w-72 translate-y-2 rounded-xl border border-slate-200 bg-white p-2 text-navy opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-4 py-3 text-[13px] font-medium normal-case tracking-normal transition hover:bg-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 text-white/95 transition hover:text-aqua"
              >
                Service Areas <IoChevronDown size={14} />
              </button>

              <div className="pointer-events-none absolute left-0 top-full mt-3 w-64 translate-y-2 rounded-xl border border-slate-200 bg-white p-2 text-navy opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                {serviceAreaLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-4 py-3 text-[13px] font-medium normal-case tracking-normal transition hover:bg-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className="text-white/95 transition hover:text-aqua"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-white/95 transition hover:text-aqua"
            >
              Contact
            </Link>

            <a
              href="tel:+19044346318"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-white hover:text-navy"
            >
              Call Now
            </a>
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-white text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 px-4 pb-6 pt-4 text-white lg:hidden">
          <div className="space-y-2 font-heading text-sm uppercase tracking-[0.08em]">
            <details className="group rounded-lg border border-white/10 bg-white/5">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
                Services
                <IoChevronDown className="transition group-open:rotate-180" />
              </summary>
              <div className="space-y-1 px-4 pb-4 text-xs normal-case tracking-normal text-white/80">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>

            <details className="group rounded-lg border border-white/10 bg-white/5">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
                Service Areas
                <IoChevronDown className="transition group-open:rotate-180" />
              </summary>
              <div className="space-y-1 px-4 pb-4 text-xs normal-case tracking-normal text-white/80">
                {serviceAreaLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>

            <Link
              href="/about"
              className="block rounded-lg px-4 py-3"
              onClick={closeMenu}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="block rounded-lg px-4 py-3"
              onClick={closeMenu}
            >
              Contact
            </Link>

            <a
              href="tel:+19044346318"
              className="mt-3 block rounded-full bg-aqua px-4 py-3 text-center font-semibold text-navy"
              onClick={closeMenu}
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
