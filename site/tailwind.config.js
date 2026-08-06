/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          50:  "#EEF2FA",
          100: "#D9E2F4",
          200: "#B3C5E8",
          300: "#7E9BD0",
          400: "#4A72B0",
          500: "#2D4A7A",
          600: "#1E3558",
          700: "#152843",
          800: "#0F1C30",
          900: "#0A1220",
          950: "#060B14",
        },
        amber: {
          50:  "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        stone: {
          50:  "#F8F9FC",
          100: "#EEF1F7",
          200: "#DDE3EE",
          300: "#C5CDDC",
          400: "#9AA5BA",
          500: "#6E7A92",
          600: "#525C72",
          700: "#3A4356",
          800: "#252C3A",
          900: "#141820",
          950: "#0B0E14",
        },
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-libre-baskerville)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0px",
        sm: "0px",
        md: "2px",
        lg: "4px",
        xl: "6px",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(21,40,67,0.12), 0 8px 24px rgba(10,18,32,0.08)",
        lift: "0 0 0 2px rgba(245,158,11,0.35), 0 12px 32px rgba(10,18,32,0.14)",
        inset: "inset 0 2px 0 rgba(255,255,255,0.06)",
        nav: "0 1px 0 rgba(245,158,11,0.45)",
      },
      keyframes: {
        "pulse-ring": {
          "0%":   { boxShadow: "0 0 0 0 rgba(245,158,11,0.5)" },
          "70%":  { boxShadow: "0 0 0 10px rgba(245,158,11,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(245,158,11,0)" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "marquee":     "marquee 40s linear infinite",
        "shimmer":     "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
