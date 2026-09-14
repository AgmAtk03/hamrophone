import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SellBanner } from "@/components/sell-banner";
import { Button } from "@/components/ui/button";
import { featuredProducts, type Category } from "@/lib/products";
import { t, type CopyKey } from "@/lib/i18n";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

const cats: { key: CopyKey; category: Category; image: string }[] = [
  { key: "catIphone", category: "iphone", image: "/products/phone-titanium.jpg" },
  { key: "catAndroid", category: "android", image: "/products/phone-samsung.jpg" },
  { key: "catAudio", category: "audio", image: "/products/earbuds-pro.jpg" },
  { key: "catWatch", category: "watch", image: "/products/watch-silver.jpg" },
];

const steps: { t: CopyKey; b: CopyKey }[] = [
  { t: "how1t", b: "how1" },
  { t: "how2t", b: "how2" },
  { t: "how3t", b: "how3" },
];

function Home() {
  const lang = useShop((s) => s.lang);
  const deals = featuredProducts().slice(0, 8);

  return (
    <main>
      <h1 className="sr-only">{t(lang, "storeName")}</h1>





      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2">
          <Link
            to="/shop"
            search={{ sort: "save" }}
            className="flex min-h-14 items-center justify-center bg-primary px-3 py-3 text-center text-primary-foreground transition-opacity duration-200 hover:opacity-90 md:min-h-16"
          >
            <span className="font-sans text-sm font-extrabold md:text-xl">{t(lang, "shopBargains")}</span>
          </Link>
          <Link
            to="/sell"
            className="flex min-h-14 items-center justify-center bg-secondary px-3 py-3 text-center text-secondary-foreground transition-opacity duration-200 hover:opacity-80 md:min-h-16"
          >
            <span className="font-sans text-sm font-extrabold md:text-xl">{t(lang, "sellYours")}</span>
          </Link>
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-4 py-8 md:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-fg md:text-3xl">{t(lang, "featured")}</h2>
            <p className="mt-1 text-sm text-muted">{t(lang, "featuredSub")}</p>
          </div>
          <Button asChild variant="link">
            <Link to="/shop">
              {t(lang, "viewAll")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-4 md:gap-5">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:pb-14">
        <h2 className="font-display text-2xl text-fg md:text-3xl">{t(lang, "categories")}</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:mt-6 md:grid-cols-4">
          {cats.map((c) => (
            <Link
              key={c.category}
              to="/shop"
              search={{ category: c.category }}
              className="group overflow-hidden rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]"
            >
              <div className="overflow-hidden rounded-xl bg-bg">
                <img
                  src={c.image}
                  alt=""
                  className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-44"
                />
              </div>
              <p className="px-2 py-3 text-sm font-medium">{t(lang, c.key)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <h2 className="font-display text-2xl md:text-3xl">{t(lang, "howTitle")}</h2>
          <ol className="mt-5 grid grid-cols-3 gap-3 md:mt-8 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.t}>
                <p className="text-xs uppercase tracking-widest opacity-70">
                  {t(lang, "step")} {i + 1}
                </p>
                <h3 className="mt-2 font-display text-base md:text-2xl">{t(lang, s.t)}</h3>
                <p className="mt-2 hidden text-sm leading-relaxed opacity-85 md:block">{t(lang, s.b)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 md:grid-cols-2 md:gap-10 md:py-14">
        <div className="overflow-hidden rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)]">
          <img
            src="/products/shop-interior.jpg"
            alt=""
            className="h-40 w-full rounded-xl object-cover md:h-80"
          />
        </div>
        <div>
          <h2 className="font-display text-2xl text-fg md:text-3xl">{t(lang, "communityTitle")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:mt-4 md:text-base">{t(lang, "communityBody")}</p>
          <Button asChild className="mt-5 md:mt-6">
            <Link to="/about">{t(lang, "navAbout")}</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:pb-14">
        <SellBanner />
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
          <h2 className="font-display text-2xl text-fg md:text-3xl">{t(lang, "stories")}</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 md:mt-8">
            {(
              [
                ["quote1", "quote1n"],
                ["quote2", "quote2n"],
                ["quote3", "quote3n"],
              ] as const
            ).map(([q, n]) => (
              <blockquote key={q} className="rounded-2xl border border-border bg-bg p-5">
                <p className="text-sm leading-relaxed text-fg">{t(lang, q)}</p>
                <footer className="mt-4 text-xs uppercase tracking-widest text-muted">
                  {t(lang, n)}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
