import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Page Studio | Contentful Powered",
  description:
    "A premium, schema-driven page editor powered by Contentful and Redux.",
};

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} h-full font-sans antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-indigo-600 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-600">
          Skip to main content
        </a>
        <Providers>
          <div className="contents">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
