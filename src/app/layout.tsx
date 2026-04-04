"use client"
import type { Metadata } from "next";
import { Albert_Sans, Roboto } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { WishlistDrawer } from "@/components/ui/WishlistDrawer";
import StoreInitializer from "@/components/providers/StoreInitializer";

import { GoogleOAuthProvider } from "@react-oauth/google";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${roboto.variable} h-full antialiased font-albert-sans text-[#121212]`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          <StoreInitializer />
          {!isAdminPath && <Header />}
          <main className="flex-grow">{children}</main>
          {!isAdminPath && (
            <>
              <Footer />
              <CartDrawer />
              <WishlistDrawer />
            </>
          )}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
