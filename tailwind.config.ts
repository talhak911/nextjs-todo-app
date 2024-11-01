import type { Config } from "tailwindcss";
import { COLORS } from "./src/constants/colors";

const safelist = Object.keys(COLORS).flatMap((color) => [
  `bg-${color}`,
  `text-${color}`,
  `border-${color}`,
  `placeholder-${color}`,
  `accent-${color}`,
]);

const config: Config = {
  safelist,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vintageGardenPrimary: "#2D4659",
        vintageGardenBackground: "#FDFBDA",
        vintageGardenAccent: "#819F7F",
        cosmicSymphonyPrimary: "#F0EB8D",
        cosmicSymphonyBackground: "#413543",
        cosmicSymphonyAccent: "#8F43EE",
        rusticCharmPrimary: "#EA5455",
        rusticCharmBackground: "#F9F5EB",
        rusticCharmAccent: "#E4BD7D",
        sunsetSerenadePrimary: "#210062",
        sunsetSerenadeBackground: "#009FBD",
        sunsetSerenadeAccent: "#77037B",
        industrialChicPrimary: "#F45050",
        industrialChicBackground: "#F0F0F0",
        industrialChicAccent: "#F9D949",
        blackoutNeutralsPrimary: "#F3EFE0",
        blackoutNeutralsBackground: "#222222",
        blackoutNeutralsAccent: "#22A39F",
        vibrantSpectrumPrimary: "#4A0E5C",
        vibrantSpectrumBackground: "#CCF0C3",
        vibrantSpectrumAccent: "#BCA3CA",
        coastalSunrisePrimary: "#005874",
        coastalSunriseBackground: "#E6E6D4",
        coastalSunriseAccent: "#FFBE00",
        oceanicSerenityPrimary: "#CBE4DE",
        oceanicSerenityBackground: "#2C3333",
        oceanicSerenityAccent: "#2E4F4F",
      },

      backgroundImage: {
        "dotted-pattern":
          "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 3px)",
      },
      backgroundSize: {
        "dotted-size": "20px 20px",
      },
      fontFamily: {
        stint: ["Stint Ultra Condensed", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
