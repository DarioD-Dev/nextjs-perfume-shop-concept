import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const LOGO_TEXT = "MAISON AURELLE";
const NBSP = " ";

// Pure CSS, no client JS: each letter is its own span with a staggered
// animationDelay, so `animate-[logo-wave...]` ripples left to right once
// on load. Load-only, deliberately no hover repeat (see Logo.tsx history).
//
// Spaces render as the NBSP constant (an explicit   escape), not a
// literal " " — a lone plain space as the sole content of an inline-block
// span collapses to nothing, silently gluing the words together. Spelling
// it as an escape keeps it visible/greppable in the source instead of an
// invisible character that's easy to accidentally retype as a plain space.
// size="compact" for contexts that already sit next to a full header logo
// (currently just the footer) — repeating the same large wordmark+tagline
// treatment there read as redundant, so this drops back to a single small
// line with no tagline.
export async function Logo({ className, size = "default" }: { className?: string; size?: "default" | "compact" }) {
    const t = await getTranslations("Header");

    return (
        <Link
            href="/"
            className={cn(
                "inline-flex flex-col items-start gap-0 text-text transition-colors hover:text-accent-gold",
                className,
            )}
        >
            <span
                className={cn(
                    "inline-flex font-display tracking-[0.15em]",
                    size === "compact" ? "text-lg" : "text-lg sm:text-2xl",
                )}
            >
                {LOGO_TEXT.split("").map((char, index) => (
                    <span
                        key={index}
                        style={{ animationDelay: `${index * 40}ms` }}
                        className="inline-block animate-[logo-wave_0.6s_ease-out_both]"
                    >
                        {char === " " ? NBSP : char}
                    </span>
                ))}
            </span>
            {size === "default" && (
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-text-secondary">
                    {t("logoTagline")}
                </span>
            )}
        </Link>
    );
}
