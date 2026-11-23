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
        canvas: "#140609",      // Primary Canvas (Deep Obsidian Oxblood)
        background: "#140609",
        surface: {
          DEFAULT: "#240B11",   // Elevated Surface / Cards (Dark Burgundy)
          raised: "#2C0E15",
          hover: "#38111A",     // Interactive / Hover Surface (Rich Maroon)
          input: "#1C080D",     // Inputs & Forms
          border: "rgba(245, 242, 230, 0.10)",
          "border-hover": "rgba(245, 242, 230, 0.22)",
        },
        foreground: "#F5F2E6",  // Primary Text & Logo (Warm Bone / Cream)
        bone: {
          DEFAULT: "#F5F2E6",
          hover: "#E5E0D0",
        },
        greige: "#B3A99E",      // Secondary / Muted Text (Warm Stone / Greige)
        muted: "#B3A99E",
        wine: {
          DEFAULT: "#6E1F2D",   // Primary Accent (Dusty Oxblood / Wine)
          hover: "#872737",
          subtle: "rgba(110, 31, 45, 0.25)",
        },
        contrast: {
          bg: "#B3A99E",        // Light-Section Contrast Canvas
          fg: "#140609",
        },
        status: {
          low: "#10B981",    // Verified / Low Risk Emerald
          medium: "#F59E0B", // Review / Nudge Amber
          high: "#EF4444",   // Blocked / Restrict Rose
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
        full: "9999px",
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
