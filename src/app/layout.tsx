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
  title: "WeatherVue",
  description:
    "WeatherVue🌦 is a modern, responsive weather application built with Next.js and React. It provides real-time weather information and forecasts for locations worldwide, with the added feature of automatic geolocation for a personalized experience.",
  keywords: ["geolocation", "WeatherApp", "WeatherApi"],
  authors: [{ name: "Maxwell999b" }],
  creator: "Maxwell999b",
  publisher: "WeatherVue",
  metadataBase: new URL("https://weathervue-beta.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weathervue-beta.vercel.app",
    title: "WeatherVue - Real-time Weather App",
    description:
      "WeatherVue🌦 is a modern, responsive weather application built with Next.js and React. It provides real-time weather information and forecasts for locations worldwide, with the added feature of automatic geolocation for a personalized experience.",
    siteName: "WeatherVue",
    images: [
      {
        url: "https://weathervue-beta.vercel.app/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "WeatherVue - Modern Weather Application",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeatherVue - Real-time Weather App",
    description:
      "WeatherVue🌦 is a modern, responsive weather application built with Next.js and React. It provides real-time weather information and forecasts for locations worldwide.",
    images: ["/android-chrome-512x512.png"],
    creator: "@Maxwell999b",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png" },
      { url: "/favicon-16x16.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
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
      <head>
        <meta property="og:image" content="https://weathervue-beta.vercel.app/android-chrome-512x512.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
