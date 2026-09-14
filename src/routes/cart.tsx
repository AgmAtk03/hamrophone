import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAud } from "@/lib/format";
import { t } from "@/lib/i18n";
import { cartLines, cartSubtotal, useShop } from "@/lib/store";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const lang = useShop((s) => s.lang);
  const cart = useShop((s) => s.cart);
  const setQty = useShop((s) => s.setQty);
  const remove = useShop((s) => s.removeFromCart);
  const lines = cartLines(cart);
  const subtotal = cartSubtotal(cart);

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl">{t(lang, "cartTitle")}</h1>
        <p className="mt-3 text-muted">{t(lang, "cartEmpty")}</p>
        <Button asChild className="mt-6">
          <Link to="/shop">{t(lang, "cartEmptyCta")}</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="font-display text-3xl">{t(lang, "cartTitle")}</h1>
        <ul className="mt-6 divide-y divide-border">
          {lines.map(({ product, qty }) => {
            const name = lang === "ne" ? product.nameNe : product.name;
            return (
              <li key={product.id} className="flex gap-4 py-5">
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="size-24 shrink-0 overflow-hidden rounded-xl bg-surface"
                >
                  <img src={product.image} alt={name} className="size-full object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="font-medium text-fg"
                  >
                    {name}
                  </Link>
                  <p className="text-sm text-muted">
                    {lang === "ne" ? product.colorNe : product.color}
                    {product.storage ? ` · ${product.storage}` : ""}
                  </p>
                  <p className="mt-1 font-display tabular-nums">{formatAud(product.price)}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        className="flex size-11 items-center justify-center"
                        onClick={() => setQty(product.id, qty - 1)}
                        aria-label="-"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
                      <button
                        type="button"
                        className="flex size-11 items-center justify-center"
                        onClick={() => setQty(product.id, Math.min(product.stock, qty + 1))}
                        aria-label="+"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="flex size-11 items-center justify-center text-muted hover:text-fg"
                      onClick={() => remove(product.id)}
                      aria-label={t(lang, "remove")}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <p className="hidden font-display tabular-nums sm:block">
                  {formatAud(product.price * qty)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="h-fit rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <div className="flex justify-between text-sm">
          <span className="text-muted">{t(lang, "subtotal")}</span>
          <span className="tabular-nums">{formatAud(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-muted">{t(lang, "gstNote")}</p>
        <Button asChild className="mt-5 w-full" size="lg">
          <Link to="/checkout">{t(lang, "checkout")}</Link>
        </Button>
        <Button asChild variant="ghost" className="mt-2 w-full">
          <Link to="/shop">{t(lang, "continue")}</Link>
        </Button>
      </aside>
    </main>
  );
}
