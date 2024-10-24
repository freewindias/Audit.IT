import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Nav";


export const metadata: Metadata = {
  title: "Audit.IT",
  description: "Making Audit Easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <div className="container">
          <Navbar />
            {children}
        </div>
      </body>
    </html>
  );
}
