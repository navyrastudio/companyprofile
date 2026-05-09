import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";
import {
  EmailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRight,
} from "@/components/ui/Icons";
import companyData from "@/data/company.json";
import navData from "@/data/navigation.json";

const serviceLinks = [
  { label: "Web Development", href: "#layanan" },
  { label: "Company Profile", href: "#layanan" },
  { label: "UI/UX Design", href: "#layanan" },
  { label: "Mobile App Design", href: "#layanan" },
  { label: "Branding", href: "#layanan" },
  { label: "Logo Design", href: "#layanan" },
];

const socials = [
  { href: companyData.socials.instagram, label: "Instagram",   icon: faInstagram  },
  { href: companyData.socials.linkedin,  label: "LinkedIn",    icon: faLinkedinIn },
  { href: companyData.socials.twitter,   label: "Twitter / X", icon: faXTwitter   },
  { href: companyData.socials.behance,   label: "Behance",     icon: faBehance    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200">

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="w-fit">
              <Image
                src="/navyra-logo.png"
                alt="Navyra Studio"
                width={160}
                height={56}
                className="h-9 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              {companyData.description}
            </p>

            <div className="flex items-center gap-3">
              {socials.map(({ href, label, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-slate-300 flex items-center justify-center text-slate-500 hover:border-brand hover:text-brand hover:bg-brand-50 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Navigasi */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-5">
              Navigasi
            </p>
            <ul className="flex flex-col gap-3">
              {navData.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-brand transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-5">
              Layanan
            </p>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-brand transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-5">
              Hubungi Kami
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${companyData.email}`}
                  className="flex items-start gap-3 group"
                >
                  <span className="w-8 h-8 bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-brand group-hover:bg-brand-50 transition-all duration-200">
                    <EmailIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand transition-colors" />
                  </span>
                  <span className="text-sm text-slate-500 group-hover:text-brand transition-colors duration-200 pt-1.5">
                    {companyData.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyData.phone}`}
                  className="flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-brand group-hover:bg-brand-50 transition-all duration-200">
                    <PhoneIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand transition-colors" />
                  </span>
                  <span className="text-sm text-slate-500 group-hover:text-brand transition-colors duration-200">
                    {companyData.phone}
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPinIcon className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                  <span className="text-sm text-slate-500 leading-relaxed">
                    {companyData.address}
                  </span>
                </div>
              </li>
            </ul>

            <Link
              href="#kontak"
              className="inline-flex items-center gap-2 mt-6 text-xs font-semibold text-brand hover:text-brand-700 uppercase tracking-widest transition-colors group"
            >
              Mulai Proyek
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            &copy; {year} Navyra Studio. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Crafted with passion in Surakarta, Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
