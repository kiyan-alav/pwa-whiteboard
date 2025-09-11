import { Toaster } from "@/components/ui/sonner";
import { ZustandProvider } from "@/local-stores/ZustandProvider";
import ReactQueryProvider from "@/server-stores/ReactQueryProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CollabBoard",
  description:
    "Collaborate in real-time with your team on an infinite digital whiteboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 h-screen overflow-hidden transition-colors`}
      >
        <ReactQueryProvider>
          <ZustandProvider>
            {children}
            <Toaster />
          </ZustandProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
