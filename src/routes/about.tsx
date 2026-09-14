import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t, type CopyKey } from "@/lib/i18n";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/about")({ component: AboutPage });

const grades: { k: CopyKey; h: CopyKey }[] = [
  { k: "condLikeNew", h: "condLikeNewHint" },
  { k: "condExcellent", h: "condExcellentHint" },
  { k: "condGood", h: "condGoodHint" },
  { k: "condFair", h: "condFairHint" },
];

function AboutPage() {
  const lang = useShop((s) => s.lang);
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">{t(lang, "kicker")}</p>
          <h1 className="mt-3 font-display text-4xl text-fg md:text-5xl">{t(lang, "aboutTitle")}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{t(lang, "aboutLead")}</p>
        </div>
        <div className="overflow-hidden rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]">
          <img
            src="/products/shop-interior.jpg"
            alt=""
            className="h-64 w-full rounded-xl object-cover md:h-80"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-base leading-relaxed text-fg">{t(lang, "aboutP1")}</p>
          <p className="text-base leading-relaxed text-fg">{t(lang, "aboutP2")}</p>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-3xl">{t(lang, "howWeGrade")}</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {grades.map((g, i) => (
              <li key={g.k} className="rounded-2xl border border-border bg-bg p-5">
                <p className="text-xs uppercase tracking-widest text-muted">
                  {t(lang, "step")} {i + 1}
                </p>
                <h3 className="mt-2 font-display text-xl">{t(lang, g.k)}</h3>
                <p className="mt-2 text-sm text-muted">{t(lang, g.h)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <MapPin className="size-5 text-primary" />
          <h2 className="mt-3 font-display text-xl">{t(lang, "address")}</h2>
          <p className="mt-2 text-sm text-muted">{t(lang, "addressBody")}</p>
        </div>
        <div>
          <Shield className="size-5 text-primary" />
          <h2 className="mt-3 font-display text-xl">{t(lang, "hours")}</h2>
          <p className="mt-2 text-sm text-muted">{t(lang, "hoursBody")}</p>
        </div>
        <div>
          <Truck className="size-5 text-primary" />
          <h2 className="mt-3 font-display text-xl">{t(lang, "contact")}</h2>
          <p className="mt-2 text-sm text-muted">hello@sastophone.com.au</p>
          <p className="text-sm text-muted">04 8123 4400</p>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BadgeCheck className="size-6" />
            <p className="font-display text-2xl">
              {t(lang, "storeName")}
              <span className="mx-2 opacity-50">·</span>
              {t(lang, "tagline")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link to="/shop">{t(lang, "shopBargains")}</Link>
            </Button>
            <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/sell">{t(lang, "sellYours")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
