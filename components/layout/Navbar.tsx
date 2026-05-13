"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, MenuIcon, CloseIcon } from "@/components/ui/Icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: t("projects"), href: `/${locale}/#proyek` },
    { label: t("services"), href: `/${locale}/#layanan` },
    { label: t("about"), href: `/${locale}/#tentang` },
    { label: t("contact"), href: `/${locale}/#kontak` },
  ];

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

  const switchLocale = () => {
    const newLocale = locale === "id" ? "en" : "id";
    // Replace the locale prefix in the current pathname
    const pathWithoutLocale = pathname.replace(/^\/(id|en)/, "");
    router.push(`/${newLocale}${pathWithoutLocale || "/"}`);
  };

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
            <Link href={`/${locale}`} aria-label={`Navyra Studio - ${t("home")}`} className="shrink-0">
              <Image
                src="/navyra-logo.png"
                alt={t("logoHome")}
                width={140}
                height={48}
                className="h-8 sm:h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10 flex-1 justify-center">
              <nav aria-label={t("mainNav")} className="flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-brand group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Language Switcher + Mobile menu */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Language Toggle */}
              <button
                onClick={switchLocale}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-slate-200 hover:border-brand hover:bg-brand-50 transition-all duration-200 text-xs font-semibold"
                aria-label={tLang("switchLang")}
              >
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className={locale === "id" ? "text-brand" : "text-slate-400"}>ID</span>
                <span className="text-slate-300">/</span>
                <span className={locale === "en" ? "text-brand" : "text-slate-400"}>EN</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden shrink-0 w-10 h-10 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
                aria-label={isOpen ? t("closeMenu") : t("openMenu")}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <CloseIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
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
          <nav className="flex flex-col space-y-0" aria-label={t("mainNavMobile")}>
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between py-5 px-2 text-lg font-semibold text-slate-900 hover:text-brand transition-colors duration-200 border-b border-slate-100 ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
                style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            ))}
          </nav>

          {/* Mobile language switcher */}
          <div className="mt-8">
            <button
              onClick={() => { switchLocale(); setIsOpen(false); }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 hover:border-brand transition-all duration-200 text-sm font-semibold w-full justify-center"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              {locale === "id" ? tLang("switchFrom") : tLang("switchTo")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
