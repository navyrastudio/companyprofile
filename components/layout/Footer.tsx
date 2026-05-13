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
import { useTranslations } from "next-intl";

const socials = [
  { href: companyData.socials.instagram, label: "Instagram",   icon: faInstagram  },
  { href: companyData.socials.linkedin,  label: "LinkedIn",    icon: faLinkedinIn },
  { href: companyData.socials.twitter,   label: "Twitter / X", icon: faXTwitter   },
  { href: companyData.socials.behance,   label: "Behance",     icon: faBehance    },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations("footer");
  
  const footerLinks = [
    {
      title: t("services"),
      items: [
        { label: t("serviceItems.0"), href: "/layanan/webdevelopment" },
        { label: t("serviceItems.1"), href: "/layanan/uiux"    },
        { label: t("serviceItems.2"), href: "/layanan/branding"       },
      ],
    },
    {
      title: t("company"),
      items: [
        { label: t("companyItems.0"), href: "/about"     },
        { label: t("companyItems.1"), href: "/project" },
        { label: t("companyItems.2"), href: "/#kontak"   },
      ],
    },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12">

          {/* Brand col */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label={t("homeLink")}>
              <Image
                src="/navyra-logo.png"
                alt={t("logoAlt")}
                width={120}
                height={40}
                className="h-7 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-[240px]">
              {t("tagline")}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-700 text-slate-500 hover:text-white hover:border-slate-500 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {footerLinks.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {col.title}
              </p>
              <nav className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate-600">
            {t("copyright", { year })}
          </p>
          <p className="text-[11px] text-slate-600">
            {t("location")}
          </p>
        </div>
      </div>

    </footer>
  );
}
