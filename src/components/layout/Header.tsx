import Link from "next/link";
import { Container } from "./Container";
import { headerCta, mainNav, siteConfig } from "@/data";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-slate-900"
        >
          {siteConfig.shortName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button href={headerCta.href} className="hidden md:inline-flex">
          {headerCta.label}
        </Button>

        {/* TODO: add a mobile menu (sheet/drawer) once the design is finalised */}
      </Container>
    </header>
  );
}
