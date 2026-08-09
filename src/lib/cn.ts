import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Without this, tailwind-merge classifies our custom text-* size tokens
// (display-lg/display-md/eyebrow) as text-color utilities and silently
// drops them whenever a text-color class is merged alongside them.
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-lg", "display-md", "eyebrow"] }],
      // Same issue as above but for our custom --spacing-section /
      // --spacing-section-lg tokens: without this, tailwind-merge doesn't
      // know py-section conflicts with py-12 etc., so overriding a
      // Section's default padding via className silently fails to merge
      // (both classes end up in the DOM, source order decides, not us).
      py: [{ py: ["section", "section-lg"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
