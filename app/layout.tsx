import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "RTO-Shield | Autonomous Return-to-Origin Prevention",
  description: "Autonomous RTO prevention for Indian D2C brands with Powder Blue, Soft Lavender White, and Sunset Peach aesthetics. Real-time address deliverability parsing and automated prepaid conversion.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="text-twilight-text font-sans antialiased min-h-screen selection:bg-powder/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="top-right"
          theme="light"
          toastOptions={{
            style: {
              background: "#E9E8F8",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              color: "#191A36",
              boxShadow: "0 15px 35px rgba(17, 20, 43, 0.25)",
              borderRadius: "16px",
            },
          }}
        />
      </body>
    </html>
  );
}
