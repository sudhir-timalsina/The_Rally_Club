import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        cream: "#F7F1E8",
        bone: "#FCFAF6",
        beige: "#E5D5C5",
        taupe: {
          DEFAULT: "#B5A092",
          light: "#CBBBAF",
          dark: "#8C7A6C",
        },
        chocolate: {
          DEFAULT: "#3D2A22",
          light: "#4A3028",
          soft: "#6B5145",
        },
        blush: {
          DEFAULT: "#F3DDE2",
          deep: "#E8BFC8",
        },
        line: "rgba(61, 42, 34, 0.14)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-work-sans)", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 6vw, 5.75rem)", { lineHeight: "0.98", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.5rem, 4.6vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem, 3.2vw, 3rem)", { lineHeight: "1.08" }],
        "display-sm": ["clamp(1.5rem, 2.2vw, 2.15rem)", { lineHeight: "1.15" }],
      },
      letterSpacing: {
        wideish: "0.04em",
        label: "0.14em",
      },
      maxWidth: {
        prose: "62ch",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "6px",
        lg: "10px",
        xl: "16px",
        pill: "999px",
      },
      boxShadow: {
        none_: "none",
        card: "0 1px 2px rgba(61, 42, 34, 0.06)",
        lifted: "0 12px 32px -12px rgba(61, 42, 34, 0.22)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal": {
          "0%": { clipPath: "inset(0 0 100% 0)" },
          "100%": { clipPath: "inset(0 0 0% 0)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "kenburns": {
          "0%": { transform: "scale(1.0) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-1%, -1%)" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "reveal": "reveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "marquee": "marquee 32s linear infinite",
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "marquee-x": "marquee-x 26s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
