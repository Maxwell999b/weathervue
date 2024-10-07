import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "weatherVue",
  description:
    "WeatherVue🌦 is a modern, responsive weather application built with Next.js and React. It provides real-time weather information and forecasts for locations worldwide, with the added feature of automatic geolocation for a personalized experience.",
  keywords: ["geolocation", "WeatherApp", "WeatherApi"],
  authors: [{ name: "Maxwell999b" }],
  creator: "Maxwell999b",
  publisher: "weatherVue",
  metadataBase: new URL("https://weathervue-beta.vercel.app"),
  openGraph: {
    type: "website",
    title: "WeatherVue",
    description:
      "WeatherVue🌦 is a modern, responsive weather application built with Next.js and React. It provides real-time weather information and forecasts for locations worldwide, with the added feature of automatic geolocation for a personalized experience.",
    siteName: "WeatherVue",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WeatherVue - Modern Weather Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeatherVue",
    description:
      "WeatherVue🌦 is a modern, responsive weather application built with Next.js and React. It provides real-time weather information and forecasts for locations worldwide.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/android-chrome-192x192.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
    shortcut: ["/favicon-16x16.png"],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
