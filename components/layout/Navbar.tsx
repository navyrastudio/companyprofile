"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MenuIcon, CloseIcon, LogoMark } from "@/components/ui/Icons";
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
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" aria-label="Navyra Studio - Beranda">
              <Image
                src="/navyra-logo.png"
                alt="Navyra Studio"
                width={140}
                height={48}
                className="h-7 sm:h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navData.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href={navData.cta.href}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold font-heading hover:bg-blue-500 transition-all duration-200 border border-blue-500/40"
              >
                {navData.cta.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-60 w-9 h-9 flex items-center justify-center transition-colors"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            >
              {isOpen ? (
                <CloseIcon className="w-5 h-5 text-slate-700" />
              ) : (
                <MenuIcon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-55 md:hidden transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-white" />

        {/* Decorative blue orb top-right */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-200/40 blur-[80px] pointer-events-none" />
        {/* Decorative orb bottom-left */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100/60 blur-[60px] pointer-events-none" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col px-6 pt-20 pb-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center shrink-0">
              <LogoMark className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-slate-900 font-bold text-base tracking-tight">navyra</span>
              <span className="font-heading text-slate-400 text-[8px] font-semibold tracking-[0.25em] uppercase">studio</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 flex-1">
            {navData.links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between py-4 border-b border-slate-200 transition-all duration-200 ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}
              >
                <span className="text-xl font-bold font-heading text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                  {link.label}
                </span>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-300 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isOpen ? `${navData.links.length * 60 + 60}ms` : "0ms" }}
          >
            <Link
              href={navData.cta.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 text-base font-semibold font-heading hover:bg-blue-500 transition-colors"
            >
              {navData.cta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-xs text-slate-400">
              hello@navyrastudio.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
