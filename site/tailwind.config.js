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
        teal: {
          50:  "#F0FAFA",
          100: "#D4F0F0",
          200: "#A8E0E0",
          300: "#6BC4C4",
          400: "#3AA8A8",
          500: "#0D6E6E",
          600: "#0A5858",
          700: "#084444",
          800: "#063030",
          900: "#041E1E",
        },
        coral: {
          50:  "#FDF4F1",
          100: "#FAE4DC",
          200: "#F5C9B8",
          300: "#EDA088",
          400: "#E07A5F",
          500: "#C85A3E",
          600: "#A84832",
          700: "#863828",
          800: "#642A1E",
          900: "#421C14",
        },
        cream: {
          50:  "#FDFCFA",
          100: "#F8F6F3",
          200: "#EDE9E3",
          300: "#DDD6CC",
          400: "#C4BAB0",
          500: "#A89E94",
          600: "#8A8178",
          700: "#6B645C",
          800: "#4D4842",
          900: "#2E2B28",
          950: "#1A1917",
        },
        danger: "#C0392B",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.0625rem",
        md: "0.25rem",
        lg: "0.375rem",
        xl: "0.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(26,25,23,0.08), 0 4px 12px rgba(26,25,23,0.06)",
        lift: "0 4px 16px rgba(13,110,110,0.12), 0 1px 4px rgba(26,25,23,0.06)",
        inset: "inset 0 1px 2px rgba(26,25,23,0.06)",
      },
      keyframes: {
        "pulse-ring": {
          "0%":   { boxShadow: "0 0 0 0 rgba(13,110,110,0.45)" },
          "70%":  { boxShadow: "0 0 0 10px rgba(13,110,110,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(13,110,110,0)" },
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
