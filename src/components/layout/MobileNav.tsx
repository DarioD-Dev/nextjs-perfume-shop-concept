"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@/components/ui/IconButton";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "./navItems";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    // Background siblings (header, main, footer) stay in the DOM behind the
    // portalled dialog — without `inert` they're still reachable by Tab and
    // by screen readers, despite the dialog's aria-modal="true".
    const siblings = Array.from(document.body.children).filter((el) => el !== panelRef.current);
    siblings.forEach((el) => el.setAttribute("inert", ""));

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      siblings.forEach((el) => el.removeAttribute("inert"));
      // Der Auslöser ist beim Schließen aus dem DOM verschwunden; ohne diese
      // Rückgabe fällt der Fokus auf <body> und der nächste Tabulator beginnt
      // wieder ganz oben auf der Seite.
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <IconButton
        label={tHeader("openMenu")}
        onClick={(event) => {
          triggerRef.current = event.currentTarget;
          setOpen(true);
        }}
      >
        <Menu size={22} />
      </IconButton>

      {/* Portaled to document.body: nested inside <header>, which sometimes
          gets backdrop-blur (see HeaderScrollState) — backdrop-filter creates
          a new containing block for fixed-position descendants, so without
          the portal this drawer gets trapped inside the header's own small
          box instead of covering the viewport. */}
      {open &&
        createPortal(
          <div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex flex-col bg-surface outline-none"
          >
            <div className="flex items-center justify-between p-6">
              <ThemeToggle />
              <IconButton label={tHeader("closeMenu")} onClick={() => setOpen(false)}>
                <X size={22} />
              </IconButton>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl text-text transition-colors hover:text-accent-gold"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
