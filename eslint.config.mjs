import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message:
                "Use { Link } from '@/i18n/navigation' — preserves locale prefix and localised pathnames.",
            },
          ],
        },
      ],
      // Only the next/link import was banned before — this catches the other
      // way to accidentally bypass locale-aware routing: a raw <a href="/...">
      // instead of @/i18n/navigation's <Link>. Scoped to JSXOpeningElement
      // named "a" specifically (native tag, lowercase) so it doesn't also
      // flag custom components with an unrelated `href` prop (e.g. ButtonLink).
      // External/mailto/tel/anchor links are unaffected — only string literals
      // starting with a single "/" match.
      "no-restricted-syntax": [
        "error",
        {
          selector: 'JSXOpeningElement[name.name="a"] > JSXAttribute[name.name="href"] > Literal[value=/^\\/(?!\\/)/]',
          message:
            "Use { Link } from '@/i18n/navigation' for internal routes instead of a raw <a href=\"/...\"> — preserves locale prefix and localised pathnames.",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
