import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { FormEvent, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatAud } from "@/lib/format";
import { t } from "@/lib/i18n";
import { cartCount, useShop } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";
import { cn } from "@/lib/cn";

const nav = [
  { to: "/", key: "navHome" as const },
  { to: "/shop", key: "navShop" as const },
  { to: "/sell", key: "navSell" as const },
] as const;

export function SiteHeader() {
  const lang = useShop((s) => s.lang);
  const setLang = useShop((s) => s.setLang);
  const cart = useShop((s) => s.cart);
  const wishlist = useShop((s) => s.wishlist);
  const credit = useShop((s) => s.creditBalance);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(cart) : 0;
  const saved = hydrated ? wishlist.length : 0;
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Logo />
        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              className="flex h-11 items-center rounded-full px-3 text-sm font-medium text-muted hover:text-fg"
            >
              {t(lang, item.key)}
            </Link>
          ))}
          <Link
            to="/shop"
            search={{ sort: "save" }}
            className="flex h-11 items-center rounded-full px-3 text-sm font-medium text-muted hover:text-fg"
          >
            {t(lang, "navDeals")}
          </Link>
          <Link
            to="/about"
            className="flex h-11 items-center rounded-full px-3 text-sm font-medium text-muted hover:text-fg"
          >
            {t(lang, "navAbout")}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          {hydrated && credit > 0 && (
            <Link
              to="/shop"
              className="mr-1 hidden h-11 items-center rounded-full bg-secondary px-3 text-xs font-medium tabular-nums lg:flex"
            >
              {formatAud(credit)} {t(lang, "creditLeft")}
            </Link>
          )}
          <button
            type="button"
            className="hidden h-11 items-center gap-1 rounded-full px-2 text-xs font-medium text-muted sm:flex"
            onClick={() => setLang(lang === "en" ? "ne" : "en")}
            aria-label={lang === "en" ? t(lang, "langNe") : t(lang, "langEn")}
          >
            <span className={cn(lang === "en" && "text-fg")}>{t(lang, "langEn")}</span>
            <span className="text-border">/</span>
            <span className={cn(lang === "ne" && "text-fg")}>{t(lang, "langNe")}</span>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setLang(lang === "en" ? "ne" : "en")}
            aria-label={lang === "en" ? t(lang, "langNe") : t(lang, "langEn")}
          >
            <span className="text-xs font-semibold">{lang === "en" ? "ने" : "EN"}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t(lang, "search")}
            onClick={() => setOpen((v) => !v)}
          >
            <Search className="size-5" />
          </Button>
          <Link
            to="/wishlist"
            className="relative flex size-11 items-center justify-center rounded-full text-fg hover:bg-secondary"
            aria-label={t(lang, "navWishlist")}
          >
            <Heart className="size-5" />
            {saved > 0 && (
              <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-xs font-semibold leading-none text-primary-foreground tabular-nums">
                {saved}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative flex size-11 items-center justify-center rounded-full text-fg hover:bg-secondary"
            aria-label={t(lang, "navCart")}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-xs font-semibold leading-none text-primary-foreground tabular-nums">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
      {open && (
        <form
          onSubmit={onSearch}
          className="mx-auto flex max-w-6xl items-center gap-2 border-t border-border px-4 py-3"
        >
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t(lang, "searchPlaceholder")}
            aria-label={t(lang, "search")}
          />
          <Button type="submit">{t(lang, "search")}</Button>
        </form>
      )}
    </header>
  );
}
