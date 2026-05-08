import Link from "next/link";
import {
  LogoMark,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  BehanceIcon,
  EmailIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRight,
} from "@/components/ui/Icons";
import companyData from "@/data/company.json";
import navData from "@/data/navigation.json";

const serviceLinks = [
  { label: "Brand Identity", href: "#layanan" },
  { label: "Web Design", href: "#layanan" },
  { label: "UI/UX Design", href: "#layanan" },
  { label: "Photography", href: "#layanan" },
  { label: "Web Development", href: "#layanan" },
  { label: "Digital Marketing", href: "#layanan" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <LogoMark className="w-7 h-7 text-blue-500" />
              <div className="flex flex-col leading-none">
                <span className="text-blue-400 font-bold text-[17px] tracking-tight">
                  navyra
                </span>
                <span className="text-gray-500 text-[9px] font-medium tracking-[0.2em] uppercase -mt-0.5">
                  studio
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 mb-6">
              {companyData.description}
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              <Link
                href={companyData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </Link>
              <Link
                href={companyData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </Link>
              <Link
                href={companyData.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </Link>
              <Link
                href={companyData.socials.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-200"
                aria-label="Behance"
              >
                <BehanceIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigasi</h4>
            <ul className="flex flex-col gap-2.5">
              {navData.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Layanan</h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Kontak</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${companyData.email}`}
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200 group"
                >
                  <span className="w-7 h-7 rounded-md bg-gray-900 flex items-center justify-center group-hover:bg-blue-900 transition-colors">
                    <EmailIcon className="w-3.5 h-3.5" />
                  </span>
                  {companyData.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyData.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200 group"
                >
                  <span className="w-7 h-7 rounded-md bg-gray-900 flex items-center justify-center group-hover:bg-blue-900 transition-colors">
                    <PhoneIcon className="w-3.5 h-3.5" />
                  </span>
                  {companyData.phone}
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="w-7 h-7 rounded-md bg-gray-900 flex items-center justify-center">
                    <MapPinIcon className="w-3.5 h-3.5" />
                  </span>
                  {companyData.address}
                </div>
              </li>
            </ul>

            {/* Newsletter mini CTA */}
            <div className="mt-6">
              <Link
                href="#kontak"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Mulai Proyek Bersama
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {year} Navyra Studio. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Crafted with passion in Jakarta, Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
