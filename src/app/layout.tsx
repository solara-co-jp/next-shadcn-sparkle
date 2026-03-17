import type { Metadata } from "next";
import { BIZ_UDPGothic, BIZ_UDGothic } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const bizUDPGothic = BIZ_UDPGothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-biz-udpgothic",
});

const bizUDGothic = BIZ_UDGothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-biz-udgothic",
});

export const metadata: Metadata = {
  title: "Sparkle Design × shadcn/ui",
  description:
    "Next.js template with Sparkle Design system built on shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${bizUDPGothic.variable} ${bizUDGothic.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
