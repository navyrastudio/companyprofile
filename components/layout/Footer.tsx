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
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <LogoMark className="w-6 h-6 text-blue-500" />
              <div className="flex flex-col leading-none">
                <span className="text-blue-400 font-bold text-base tracking-tight">
                  navyra
                </span>
                <span className="text-slate-600 text-[9px] font-medium tracking-[0.2em] uppercase -mt-0.5">
                  studio
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 mb-6 max-w-60">
              {companyData.description}
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {[
                { href: companyData.socials.instagram, label: "Instagram", Icon: InstagramIcon },
                { href: companyData.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
                { href: companyData.socials.twitter, label: "Twitter / X", Icon: TwitterIcon },
                { href: companyData.socials.behance, label: "Behance", Icon: BehanceIcon },
              ].map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/5 border border-white/8 flex items-center justify-center hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Navigasi</h4>
            <ul className="flex flex-col gap-3">
              {navData.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Layanan</h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Kontak</h4>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href={`mailto:${companyData.email}`}
                  className="flex items-start gap-3 text-sm text-slate-500 hover:text-blue-400 transition-colors duration-200 group"
                >
                  <span className="w-6 h-6 bg-white/5 border border-white/8 flex items-center justify-center mt-0.5 shrink-0 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all">
                    <EmailIcon className="w-3 h-3" />
                  </span>
                  {companyData.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyData.phone}`}
                  className="flex items-center gap-3 text-sm text-slate-500 hover:text-blue-400 transition-colors duration-200 group"
                >
                  <span className="w-6 h-6 bg-white/5 border border-white/8 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all">
                    <PhoneIcon className="w-3 h-3" />
                  </span>
                  {companyData.phone}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-slate-500">
                  <span className="w-6 h-6 bg-white/5 border border-white/8 flex items-center justify-center mt-0.5 shrink-0">
                    <MapPinIcon className="w-3 h-3" />
                  </span>
                  {companyData.address}
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="#kontak"
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest"
              >
                Mulai Proyek Bersama
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {year} Navyra Studio. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Crafted with passion in Surakarta, Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
