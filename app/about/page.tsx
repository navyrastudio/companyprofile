import { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionLabel from "@/components/ui/SectionLabel";
import companyData from "@/data/company.json";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = companyData.siteUrl || "https://navyra.id";
  const title = "Tentang Kami - Navyra Studio";
  const description = companyData.about?.description || companyData.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/about`,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutSection />

      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          <AnimateIn className="space-y-6">
            <SectionLabel>Visi &amp; Misi</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Visi</h3>
                <p className="text-slate-600 mt-3">
                  Menjadi studio digital yang menggabungkan desain, strategi, dan teknologi untuk
                  membantu bisnis tumbuh secara berkelanjutan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Misi</h3>
                <ul className="mt-3 space-y-2 text-slate-600 list-inside">
                  <li>Memberikan solusi desain dan teknis yang terukur dan berfokus pada hasil.</li>
                  <li>Menciptakan pengalaman digital yang bermakna bagi pengguna.</li>
                  <li>Bekerja kolaboratif dengan klien untuk membangun produk yang scalable.</li>
                </ul>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={50} className="space-y-6">
            <SectionLabel>Nilai Kami</SectionLabel>
            <div className="flex flex-wrap gap-3">
              {(companyData.highlights || []).map((h) => (
                <div key={h} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                  {h}
                </div>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn delay={100} className="space-y-6">
            <SectionLabel>Cara Kami Bekerja</SectionLabel>
            <p className="text-slate-600">
              Proses kami mencakup riset, ideasi, desain, implementasi, dan iterasi berdasarkan data.
              Kami mengutamakan kolaborasi yang transparan dan roadmap yang terukur untuk setiap proyek.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <h4 className="font-semibold">Riset</h4>
                <p className="text-sm text-slate-600 mt-2">Memahami kebutuhan bisnis dan pengguna.</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <h4 className="font-semibold">Desain</h4>
                <p className="text-sm text-slate-600 mt-2">Solusi yang intuitif, estetis, dan dapat diimplementasikan.</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <h4 className="font-semibold">Implementasi</h4>
                <p className="text-sm text-slate-600 mt-2">Build dengan praktik terbaik dan fokus pada kualitas.</p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={150} className="space-y-6">
            <SectionLabel>Kontak</SectionLabel>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-slate-600">Untuk pertanyaan, kolaborasi, atau studi kasus, hubungi kami:</p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <a href={`mailto:${companyData.email}`} className="px-4 py-2 rounded-lg bg-brand text-white font-semibold">Email: {companyData.email}</a>
                  <a href={`tel:${companyData.phone.replace(/\s+/g, "")}`} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700">Telepon: {companyData.phone}</a>
                </div>
              </div>

              <div className="text-sm text-slate-500">
                <div>{companyData.address}</div>
                <div className="mt-3">Ikuti kami:{' '}
                  {(companyData.socials && Object.entries(companyData.socials))?.map(([k, v]) => (
                    <a key={k} href={v} className="ml-3 text-brand underline" target="_blank" rel="noreferrer">{k}</a>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  );
}
