"use client";

import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

// Subtle by design: only appears once the filters have scrolled out of
// view (IntersectionObserver on the filters section). Appears/disappears
// instantly (no fade/slide) — only the scroll itself is smooth.
export function BackToTopButton({ targetId }: { targetId: string }) {
  const t = useTranslations("Shop");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "-200px 0px 0px 0px",
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  function scrollToFilters() {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToFilters}
      aria-label={t("backToFilters")}
      className="fixed bottom-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface-raised text-text-secondary shadow-lg transition-colors hover:border-accent-gold hover:text-accent-gold"
    >
      <ArrowUp size={16} strokeWidth={1.5} />
    </button>
  );
}
