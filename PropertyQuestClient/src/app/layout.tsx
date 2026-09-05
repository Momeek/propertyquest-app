import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/mobile-nav";
import ReactQueryContextProvider from "@/context/reactQueryContextProvider";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/lib/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PropertyQuest | Find Your Dream Property",
  description:
    "Discover your perfect property with PropertyQuest - the premier real estate marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ This is necessary for proper iOS zoom behavior */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryContextProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
              <MobileNav />
            </ToastProvider>
          </AuthProvider>
        </ReactQueryContextProvider>
      </body>
    </html>
  );
}
