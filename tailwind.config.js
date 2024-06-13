/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "scale-down-center":
          "scale-down-center 0.4s cubic-bezier(0.190, 1.000, 0.220, 1.000) both",
        "flip-horizontal-bottom":
          "flip-horizontal-bottom 0.3s cubic-bezier(0.455, 0.030, 0.515, 0.955) forwards",
      },
      keyframes: {
        "scale-down-center": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.5)" },
        },
        "flip-horizontal-bottom": {
          "0%": { transform: "rotateX(0)" },
          "100%": { transform: "rotateX(-180deg)" },
        },
      },
    },
  },
  plugins: [],
};
