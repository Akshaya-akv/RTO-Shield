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
        className="bg-background text-foreground antialiased min-h-screen selection:bg-zinc-800 selection:text-zinc-100"
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#EDEDEC",
            },
          }}
        />
      </body>
    </html>
  );
}
