import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IronPulse Gym | Train Hard. Live Strong.",
  description:
    "Premium gym platform with world-class trainers, cutting-edge classes and a community that pushes you past your limits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Toaster
            theme="dark"
            position="top-right"
            richColors
            toastOptions={{
              style: {
                background: "#18181b",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
