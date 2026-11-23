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
        background: "#09090B", // 60% Canvas (Rich Off-Black)
        surface: {
          DEFAULT: "#121215", // 30% Structural Elements
          raised: "#18181B",
          hover: "#202024",
          border: "rgba(255, 255, 255, 0.08)",
          "border-hover": "rgba(255, 255, 255, 0.16)",
        },
        foreground: "#EDEDEC", // Warm Off-White Text
        muted: "#94949E",
        // Single intentional primary accent + strict semantic tokens
        accent: {
          DEFAULT: "#FAFAFA", // Off-white interactive primary
          subtle: "rgba(255, 255, 255, 0.06)",
        },
        status: {
          low: "#10B981",    // Verified / Low Risk Emerald
          medium: "#F59E0B", // Review / Nudge Amber
          high: "#EF4444",   // Blocked / Restrict Rose
        },
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
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
