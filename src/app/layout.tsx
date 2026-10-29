import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const franklin = localFont({
  src: "../fonts/FranklinGothic.ttf",
  variable: "--font-franklin",
  display: "swap",
});
const condensed = localFont({
  src: "../fonts/FranklinGothicCondensed.ttf",
  variable: "--font-condensed",
  display: "swap",
});
const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl =
  process.env.SITE_URL ||
  (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TANORA — Heritage in Motion",
  description:
    "Egyptian heritage meets the energy of live entertainment. Enter the world of TANORA: movement, music, and a culture that never stands still.",
  openGraph: {
    title: "TANORA — Heritage in Motion",
    description: "Ancient motion. New expression.",
    type: "website",
    images: [
      {
        url: "/images/heritage.webp",
        width: 716,
        height: 494,
        alt: "Expressive painting of an Egyptian Tanoura dancer",
      },
    ],
  },
  icons: { icon: "/images/emblem.webp" },
};
export const viewport: Viewport = { themeColor: "#171411" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${franklin.variable} ${condensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
