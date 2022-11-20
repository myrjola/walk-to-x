import { ReactNode } from "react";
import "./globals.css";
import NavBar from "./NavBar";
import { Sora } from "@next/font/google";

const sora = Sora({
  variable: "--font-sora",
});

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${sora.variable} font-sans`}>
      <body className="bg-stone-100">
        {/* @ts-expect-error Server Component */}
        <NavBar />
        {children}
      </body>
    </html>
  );
}
