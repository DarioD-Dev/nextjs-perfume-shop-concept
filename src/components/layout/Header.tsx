import { Container } from "@/components/ui/Container";
import { AnnouncementBar } from "./AnnouncementBar";
import { HeaderScrollState } from "./HeaderScrollState";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { Nav } from "./Nav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <>
      <AnnouncementBar />
      <HeaderScrollState>
        <Container className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-4 sm:gap-4">
          <Logo className="col-start-1 mr-auto" />
          <Nav className="col-start-2 hidden md:block justify-self-center" />
          {/* col-start-3 pinned explicitly: Nav uses display:none below md:,
              and a display:none grid item is removed from the grid's
              auto-placement entirely — without a fixed column, this div
              would slide into Nav's empty "auto" track on mobile, leaving
              the actual right-hand 1fr track empty and the icons stranded
              short of the true right edge. */}
          <div className="col-start-3 flex items-center justify-end gap-0 sm:gap-2">
            <LocaleSwitcher />
            <ThemeToggle className="hidden md:flex" />
            <MobileNav />
          </div>
        </Container>
      </HeaderScrollState>
    </>
  );
}
