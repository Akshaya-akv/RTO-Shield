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
        background: "#07070A",
        "secondary-bg": "#0E0C17",
        "card-bg": "rgba(18, 16, 28, 0.75)",
        "card-border": "rgba(168, 85, 247, 0.15)",
        "card-border-hover": "rgba(217, 70, 239, 0.4)",
        primary: {
          DEFAULT: "#00D4FF",
          glow: "rgba(0, 212, 255, 0.25)",
          dark: "#0099cc",
        },
        secondary: {
          DEFAULT: "#A855F7",
          glow: "rgba(168, 85, 247, 0.25)",
        },
        accent: {
          DEFAULT: "#D946EF",
          glow: "rgba(217, 70, 239, 0.3)",
        },
        obsidian: {
          950: "#050508",
          900: "#09080F",
          800: "#12101D",
          700: "#1A1728",
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
        "purple-glow": "0 0 25px -5px rgba(168, 85, 247, 0.35)",
        "magenta-glow": "0 0 35px -5px rgba(217, 70, 239, 0.35)",
        "danger-glow": "0 0 25px -5px rgba(239, 68, 68, 0.3)",
        "success-glow": "0 0 25px -5px rgba(34, 197, 94, 0.3)",
        "orb-glow": "0 0 50px 10px rgba(168, 85, 247, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-line": "glowLine 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "spin-slow": "spin 20s linear infinite",
        "liquid-pulse": "liquidPulse 4s ease-in-out infinite",
      },
      keyframes: {
        glowLine: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        liquidPulse: {
          "0%, 100%": { transform: "scale(1)", filter: "hue-rotate(0deg)" },
          "50%": { transform: "scale(1.04)", filter: "hue-rotate(20deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
