import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "RTO-Shield | AI-Powered Return-to-Origin Prevention Platform",
  description: "Stop Fake Orders. Save Real Revenue. Intelligent AI risk scoring, COD restriction, and prepaid conversion platform for D2C e-commerce.",
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
        className="bg-background text-foreground antialiased min-h-screen selection:bg-primary/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#101A2D",
              border: "1px solid rgba(0, 212, 255, 0.25)",
              color: "#F8FAFC",
            },
          }}
        />
      </body>
    </html>
  );
}
