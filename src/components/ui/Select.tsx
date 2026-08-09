"use client";

import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type SelectOption = { value: string; label: string; icon?: ReactNode };

// Custom listbox instead of a native <select> — the native dropdown popup
// is OS-rendered and can't be restyled (shape, hover colour) to match the
// site's pill filters. This gives full control at the cost of building our
// own keyboard/click-outside handling.
export function Select({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  ariaLabel: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm transition-colors",
          open || (selected && selected.value)
            ? "border-accent-gold text-accent-gold"
            : "border-border-strong text-text hover:border-accent-gold hover:text-accent-gold",
        )}
      >
        {selected?.icon}
        {selected ? selected.label : placeholder}
        <ChevronDown size={14} strokeWidth={1.5} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 top-full z-20 mt-2 max-h-64 min-w-full overflow-auto rounded-xl border border-border-strong bg-surface-raised py-1 shadow-lg"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 whitespace-nowrap px-4 py-2 text-left font-sans text-sm transition-colors hover:bg-surface-muted hover:text-accent-gold",
                    isSelected && "text-accent-gold",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </span>
                  {isSelected && <Check size={14} strokeWidth={1.5} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
