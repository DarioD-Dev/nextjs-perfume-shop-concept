"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("Header");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount-detection guard: the server can't know the stored theme, so we
    // render a neutral placeholder for the first client render and swap in
    // the real icon once hydration is done.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoids a hydration mismatch — the server can't know the stored theme.
    return <div className={cn("h-10 w-10", className)} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      label={isDark ? t("themeToggleToLight") : t("themeToggleToDark")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={className}
    >
      {isDark ? (
        <Sun size={18} className="transition-transform duration-500 ease-out group-hover:rotate-90" />
      ) : (
        <Moon size={18} className="transition-transform duration-500 ease-out group-hover:-rotate-45" />
      )}
    </IconButton>
  );
}
