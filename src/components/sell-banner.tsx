import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { useShop } from "@/lib/store";

export function SellBanner() {
  const lang = useShop((s) => s.lang);
  return (
    <aside className="flex flex-col gap-4 rounded-2xl bg-primary px-5 py-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-display text-2xl">{t(lang, "sellBannerTitle")}</h2>
        <p className="mt-1 text-sm opacity-85">{t(lang, "sellBannerBody")}</p>
      </div>
      <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
        <Link to="/sell">
          {t(lang, "getQuote")}
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </aside>
  );
}
