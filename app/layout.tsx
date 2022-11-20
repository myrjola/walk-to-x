import { ReactNode } from "react";
import "./globals.css";
import NavBar from "./NavBar";
import { Sora } from "@next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${sora.variable} font-sans h-full bg-gray-50`}>
      <body className="h-full">
        {/* @ts-expect-error Server Component */}
        <NavBar />
        {children}
      </body>
    </html>
  );
}
