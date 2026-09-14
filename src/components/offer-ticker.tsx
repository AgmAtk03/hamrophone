import { ChevronLeft, ChevronRight, BadgeCheck, MapPin, Shield, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { t, type CopyKey } from "@/lib/i18n";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/cn";

const SLIDES: { key: CopyKey; src: string }[] = [
  { key: "tickerDashain", src: "/promo/dashain.jpg" },
  { key: "tickerOffers", src: "/promo/bargains.jpg" },
  { key: "tickerTrade", src: "/promo/trade.jpg" },
  { key: "tickerNepal", src: "/promo/nepal.jpg" },
];

const TRUST = [
  { icon: Shield, k: "trustWarranty" as const },
  { icon: BadgeCheck, k: "trustImei" as const },
  { icon: MapPin, k: "trustPickup" as const },
  { icon: Truck, k: "trustPost" as const },
];

export function OfferTicker() {
  const lang = useShop((s) => s.lang);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % SLIDES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  function go(delta: number) {
    setIndex((n) => (n + delta + SLIDES.length) % SLIDES.length);
  }

  return (
    <section
      className="relative overflow-hidden bg-fg"
      aria-roledescription="carousel"
      aria-label={t(lang, "ourOffer")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-56 sm:h-64 md:h-80">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide) => (
            <div key={slide.key} className="relative h-full w-full shrink-0 basis-full">
              <img
                src={slide.src}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-3/5 items-center bg-gradient-to-r from-fg/80 via-fg/40 to-transparent pb-16 pl-4 pr-6 md:w-1/2 md:pl-8">
          <div className="text-left text-primary-foreground">
            <p className="text-xs font-bold uppercase tracking-widest">{t(lang, "ourOffer")}</p>
            <p className="mt-1 font-sans text-2xl font-extrabold leading-tight md:text-4xl">
              {t(lang, SLIDES[index].key)}
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-fg/75 to-transparent px-3 pb-3 pt-8 md:px-6 md:pb-4">
          <div className="mb-1 flex items-center justify-between">
            <button
              type="button"
              className="flex size-11 items-center justify-center text-primary-foreground"
              aria-label={t(lang, "sellBack")}
              onClick={() => go(-1)}
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex items-center gap-1">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.key}
                  type="button"
                  aria-label={t(lang, slide.key)}
                  aria-current={i === index}
                  className="flex size-11 items-center justify-center"
                  onClick={() => setIndex(i)}
                >
                  <span
                    className={cn(
                      "block size-2 rounded-full transition-opacity duration-150",
                      i === index ? "bg-primary-foreground opacity-100" : "bg-primary-foreground opacity-40",
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flex size-11 items-center justify-center text-primary-foreground"
              aria-label={t(lang, "sellNext")}
              onClick={() => go(1)}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
          <ul className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-3">
            {TRUST.map((item) => (
              <li
                key={item.k}
                className="flex min-h-11 items-center gap-2 px-1 text-primary-foreground md:justify-center"
              >
                <item.icon className="size-4 shrink-0" />
                <span className="text-xs font-bold leading-tight md:text-sm">{t(lang, item.k)}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
