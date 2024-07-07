import type { Config } from "tailwindcss";
import {COLORS} from "./src/constants/colors"
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        ...COLORS
      },
      backgroundImage: {
        'dotted-pattern': 'radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dotted-size': '10px 10px',
      },
    },
  },
  plugins: [],
};
export default config;
