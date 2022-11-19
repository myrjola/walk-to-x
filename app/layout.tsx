import { ReactNode } from "react";
import "./globals.css";
import NavBar from "./NavBar";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-stone-100">
        {/* @ts-expect-error Server Component */}
        <NavBar />
        {children}
      </body>
    </html>
  );
}
