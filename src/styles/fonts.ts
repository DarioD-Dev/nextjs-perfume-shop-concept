import { Cormorant_Garamond, Jost } from "next/font/google";

export const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const sansUi = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-ui",
});
