"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "./navItems";

export function Nav({ className }: { className?: string }) {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  return (
    <nav className={className}>
      <ul className="flex items-center gap-8 font-sans text-sm uppercase tracking-wide">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="group relative inline-block py-1 text-text transition-colors hover:text-accent-gold"
              >
                {t(item.labelKey)}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent-gold transition-transform duration-300 ease-out",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
