import "./globals.css";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import AgendaProvider from "@/ContextosGlobales/AgendaContext";
import { Inter, Outfit, Lora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.cruzrojasanmiguel.cl");

export const metadata = {
  title: {
    default: "Podología Cruz Roja San Miguel | Atención Clínica Especializada",
    template: "%s | Cruz Roja San Miguel",
  },
  description:
    "Atención podológica clínica certificada en San Miguel. Especialistas Paula Arce y Miriam Ponce. Agenda tu hora online, tratamiento de uñas encarnadas, pie diabético y más.",
  keywords: [
    "podología San Miguel",
    "podóloga San Miguel",
    "Cruz Roja San Miguel",
    "podología clínica",
    "atención podológica",
    "uñas encarnadas",
    "pie diabético",
    "callosidades",
    "Paula Arce podóloga",
    "Miriam Ponce podóloga",
    "agenda podología",
    "salud del pie San Miguel",
  ],
  authors: [{ name: "Cruz Roja San Miguel", url: metadataBase.href }],
  publisher: "Cruz Roja San Miguel",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: metadataBase.href,
  },
  icons: {
    icon: "/logosf.png",
    shortcut: "/logosf.png",
    apple: "/logosf.png",
  },
  openGraph: {
    title: "Podología Cruz Roja San Miguel | Atención Clínica Especializada",
    description:
      "Profesionales certificadas por Superintendencia de Salud y MINSAL. Agenda tu hora con Paula Arce o Miriam Ponce en Cruz Roja San Miguel.",
    url: metadataBase.href,
    siteName: "Cruz Roja San Miguel",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/logosf1.png",
        width: 1200,
        height: 630,
        alt: "Cruz Roja San Miguel - Podología Clínica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podología Cruz Roja San Miguel",
    description: "Atención podológica clínica certificada en San Miguel. Agenda tu hora online.",
    images: ["/logosf1.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-white">
        <AnimatedLayout>
          <AgendaProvider>{children}</AgendaProvider>
        </AnimatedLayout>
      </body>
    </html>
  );
}
