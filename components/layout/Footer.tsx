import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";
import companyData from "@/data/company.json";
import navData from "@/data/navigation.json";

const socials = [
  { href: companyData.socials.instagram, label: "Instagram",   icon: faInstagram  },
  { href: companyData.socials.linkedin,  label: "LinkedIn",    icon: faLinkedinIn },
  { href: companyData.socials.twitter,   label: "Twitter / X", icon: faXTwitter   },
  { href: companyData.socials.behance,   label: "Behance",     icon: faBehance    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-100">
      {/* Top accent */}
      <div className="h-px bg-linear-to-r from-transparent via-brand to-transparent" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-14 flex flex-col items-center gap-8 text-center">

        {/* Logo */}
        <Link href="/" aria-label="Navyra Studio - Beranda">
          <Image
            src="/navyra-logo.png"
            alt="Logo Navyra Studio, kembali ke beranda"
            width={140}
            height={50}
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Tagline */}
        <p className="text-sm text-slate-700 max-w-xs leading-relaxed">
          Studio kreatif untuk brand, web, dan produk digital yang berkesan.
        </p>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {navData.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-slate-700 hover:text-brand transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center text-slate-700 hover:text-brand transition-colors duration-200"
            >
              <FontAwesomeIcon icon={icon} className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-300/60">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="text-[11px] text-slate-700">
            &copy; {year} Navyra Studio. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-700">
            Surakarta, Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
