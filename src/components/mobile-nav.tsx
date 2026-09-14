import { Link } from "@tanstack/react-router";
import { ArrowLeftRight, Heart, Home, ShoppingBag, Store } from "lucide-react";
import { t } from "@/lib/i18n";
import { cartCount, useShop } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";

export function MobileNav() {
  const lang = useShop((s) => s.lang);
  const cart = useShop((s) => s.cart);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(cart) : 0;

  const items = [
    { to: "/", icon: Home, label: t(lang, "navHome") },
    { to: "/shop", icon: Store, label: t(lang, "navShop") },
    { to: "/sell", icon: ArrowLeftRight, label: t(lang, "navSell") },
    { to: "/wishlist", icon: Heart, label: t(lang, "navWishlist") },
    { to: "/cart", icon: ShoppingBag, label: t(lang, "navCart"), badge: count },
  ] as const;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-muted [&.active]:text-fg"
              activeOptions={{ exact: item.to === "/" }}
            >
              <item.icon className="size-5" />
              <span className="text-xs">{item.label}</span>
              {"badge" in item && item.badge > 0 && (
                <span className="absolute right-1/4 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-xs font-semibold leading-none text-primary-foreground tabular-nums">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
