/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  /* 🔥 IMPORTANT: SAFELIST DYNAMIC CLASSES */
  safelist: [
    "lesson-code-wrapper",
    "lesson-code",
    "lesson-content",
    "lesson-block",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },

      colors: {
        primary: "#4f46e5",     // Indigo
        secondary: "#22d3ee",   // Cyan
        accent: "#a78bfa",      // Violet
        background: "#0f172a",  // Dark slate
        glass: "rgba(255, 255, 255, 0.15)",
        glassBorder: "rgba(255, 255, 255, 0.25)",
      },

      backdropBlur: {
        xs: "2px",
        sm: "6px",
        md: "12px",
      },

      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },

  plugins: [],
};
