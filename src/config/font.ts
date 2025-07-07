import { Outfit, Inter, Lobster } from "next/font/google";

// Type for our font configuration objects
type FontConfig = {
  variable: string;
};

const outfit: FontConfig = Outfit({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-outfit",
});

const inter: FontConfig = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lobster: FontConfig = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lobster",
  display: "swap",
});

// Explicit return type for better type safety
export const fontVariables: string = `${outfit.variable} ${inter.variable} ${lobster.variable}`;