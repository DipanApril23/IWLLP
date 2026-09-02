import Link from "next/link";
import { Container } from "./Container";
import { footerContent, footerCopyright, mainNav, siteConfig } from "@/data";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-slate-900">
            {siteConfig.shortName}
          </p>
          <p className="mt-3 text-sm text-slate-600">{siteConfig.tagline}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">
            {footerContent.navTitle}
          </p>
          <ul className="mt-3 space-y-2">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">
            {footerContent.contactTitle}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">
            {footerContent.addressTitle}
          </p>
          <p className="mt-3 text-sm text-slate-600">
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.line2}
            <br />
            {siteConfig.address.city}, {siteConfig.address.state}
          </p>
        </div>
      </Container>

      <div className="border-t border-slate-200 py-6">
        <Container>
          <p className="text-xs text-slate-500">
            {footerCopyright(new Date().getFullYear())}
          </p>
        </Container>
      </div>
    </footer>
  );
}
