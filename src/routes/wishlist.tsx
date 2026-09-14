import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/products";
import { t } from "@/lib/i18n";
import { useShop } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/wishlist")({ component: WishlistPage });

function WishlistPage() {
  const lang = useShop((s) => s.lang);
  const wishlist = useShop((s) => s.wishlist);
  const hydrated = useHydrated();
  const items = hydrated
    ? wishlist.map(getProductById).filter((p): p is NonNullable<typeof p> => Boolean(p))
    : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-3xl">{t(lang, "navWishlist")}</h1>
      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-16 text-center">
          <p className="text-muted">{t(lang, "savedEmpty")}</p>
          <Button asChild className="mt-6">
            <Link to="/shop">{t(lang, "browse")}</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
