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
        background: "#080D1B",
        "secondary-bg": "#101A2D",
        "card-bg": "rgba(16, 26, 45, 0.75)",
        "card-border": "rgba(0, 212, 255, 0.15)",
        "card-border-hover": "rgba(0, 212, 255, 0.35)",
        primary: {
          DEFAULT: "#00D4FF",
          glow: "rgba(0, 212, 255, 0.25)",
          dark: "#0099cc",
        },
        secondary: {
          DEFAULT: "#7667FF",
          glow: "rgba(118, 103, 255, 0.25)",
        },
        success: {
          DEFAULT: "#22C55E",
          glow: "rgba(34, 197, 94, 0.25)",
        },
        warning: {
          DEFAULT: "#F59E0B",
          glow: "rgba(245, 158, 11, 0.25)",
        },
        danger: {
          DEFAULT: "#EF4444",
          glow: "rgba(239, 68, 68, 0.25)",
        },
        foreground: "#F8FAFC",
        muted: "#94A3B8",
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(0, 212, 255, 0.3)",
        "purple-glow": "0 0 25px -5px rgba(118, 103, 255, 0.3)",
        "danger-glow": "0 0 25px -5px rgba(239, 68, 68, 0.3)",
        "success-glow": "0 0 25px -5px rgba(34, 197, 94, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-line": "glowLine 3s ease-in-out infinite",
      },
      keyframes: {
        glowLine: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
