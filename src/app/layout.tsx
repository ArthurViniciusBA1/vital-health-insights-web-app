import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";


const monstserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Vital Healths Insights",
  description: "Vital Healths Insights | Una Itabira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${monstserrat.variable} antialiased flex h-screen flex-col items-center justify-between px-6 pt-12`}
      >
        <div className="flex-grow flex flex-col items-center justify-center w-[90%] max-w-[800px]">
          <Toaster richColors position="top-right" duration={5000} />
          {children}
        </div>
      </body>
    </html>
  );
}