"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MenuIcon, CloseIcon } from "@/components/ui/Icons";
import navData from "@/data/navigation.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/50"
            : "bg-transparent border-b border-slate-200/0"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link href="/" aria-label="Navyra Studio - Beranda" className="shrink-0">
              <Image
                src="/navyra-logo.png"
                alt="Logo Navyra Studio"
                width={140}
                height={48}
                className="h-8 sm:h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10 flex-1 justify-center">
              <nav aria-label="Navigasi utama" className="flex items-center gap-10">
                {navData.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 relative group"
                    aria-current={typeof window !== 'undefined' && window.location.pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Spacer for desktop */}
            <div className="hidden md:block shrink-0 w-28" />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden shrink-0 w-10 h-10 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-white" />

        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/30 blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative h-full flex flex-col pt-24 px-6">
          {/* Nav links */}
          <nav className="flex flex-col space-y-0" aria-label="Navigasi utama mobile">
            {navData.links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between py-5 px-2 text-lg font-semibold text-slate-900 hover:text-brand transition-colors duration-200 border-b border-slate-100 ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
                aria-current={typeof window !== 'undefined' && window.location.pathname === link.href ? 'page' : undefined}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
