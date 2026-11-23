import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // User requested palette
        powder: {
          DEFAULT: "#8DB9F0", // Powder Blue
          light: "#A8CCF5",
          dark: "#6F9ED9",
          subtle: "rgba(141, 185, 240, 0.15)",
        },
        lavender: {
          DEFAULT: "#E9E8F8", // Soft Lavender White
          pure: "#FFFFFF",
          card: "rgba(233, 232, 248, 0.92)",
          border: "rgba(255, 255, 255, 0.85)",
          muted: "#626687",
          dark: "#191A36",
        },
        peach: {
          DEFAULT: "#F5B69E", // Warm Sunset Peach
          light: "#F9CBB9",
          dark: "#E89B7F",
          subtle: "rgba(245, 182, 158, 0.20)",
        },
        // Twilight dusk atmospheric surfaces
        twilight: {
          DEFAULT: "#11142B",
          canvas: "#11142B",
          card: "#191D3C",
          surface: "#1E2348",
          border: "rgba(141, 185, 240, 0.15)",
          text: "#F3F4FD",
          muted: "#8C92B5",
          btn: "#26244C",
          "btn-hover": "#1D1B3C",
        },
        status: {
          low: "#10B981",    // Low Risk Emerald
          medium: "#F5B69E", // Medium Risk Sunset Peach
          high: "#F43F5E",   // High Risk Rose
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        md: "14px",
        lg: "18px",
        xl: "22px",
        "2xl": "26px",
        "3xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        glass: "0 20px 50px rgba(17, 20, 43, 0.25)",
        "glass-lg": "0 25px 60px rgba(17, 20, 43, 0.35)",
        "peach-sm": "0 8px 24px rgba(245, 182, 158, 0.30)",
        "powder-sm": "0 8px 24px rgba(141, 185, 240, 0.30)",
      },
      transitionTimingFunction: {
        snappy: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "180ms",
      },
    },
  },
  plugins: [],
};

export default config;
