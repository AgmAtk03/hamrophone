import type { ReactNode } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { OfferTicker } from "@/components/offer-ticker";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <SiteHeader />
      <OfferTicker />
      <div className="flex-1 pb-20 md:pb-0">{children}</div>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}
