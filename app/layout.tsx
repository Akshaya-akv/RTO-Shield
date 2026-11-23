import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "rto-shield™ | autonomous return-to-origin prevention",
  description: "editorial techwear grade rto prevention for indian d2c brands. high-precision risk engine, instant address verification, and dynamic cod policy.",
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
        className="bg-canvas text-foreground font-sans antialiased min-h-screen selection:bg-wine selection:text-bone"
        suppressHydrationWarning
      >
        {children}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#240B11",
              border: "1px solid rgba(245, 242, 230, 0.15)",
              color: "#F5F2E6",
            },
          }}
        />
      </body>
    </html>
  );
}
