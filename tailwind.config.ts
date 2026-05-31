import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0D1F12",
        surface: "#111E14",
        surface2: "#142018",
        border: "#1A3020",
        border2: "#2A4A30",
        green: {
          primary: "#4A7C59",
          light: "#7DC48A",
          muted: "#3A5C40",
          dim: "#1A3020",
        },
        coral: "#E8826A",
        text: {
          primary: "#E8F2EA",
          secondary: "#D4E8D6",
          muted: "#6B8F72",
          dim: "#3A5C40",
        },
      },
    },
  },
  plugins: [],
};
export default config;
