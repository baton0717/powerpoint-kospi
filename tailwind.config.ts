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
        ppt: {
          ribbon: "#E7E6E6",
          sidebar: "#F3F2F1",
          canvas: "#FFFFFF",
          accent: "#C43E1C",
          text: "#323130",
          border: "#EDEBE9",
        },
      },
    },
  },
  plugins: [],
};
export default config;
