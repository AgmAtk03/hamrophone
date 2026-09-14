import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { formatAud } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useShop } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/order/$id")({ component: OrderPage });

function OrderPage() {
  const { id } = Route.useParams();
  const lang = useShop((s) => s.lang);
  const orders = useShop((s) => s.orders);
  const hydrated = useHydrated();
  const order = hydrated ? orders.find((o) => o.id === id) : undefined;

  if (!hydrated) {
    return <main className="mx-auto max-w-lg px-4 py-16" />;
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl">{t(lang, "noResults")}</h1>
        <Button asChild className="mt-6">
          <Link to="/">{t(lang, "backHome")}</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-muted">{t(lang, "orderId")}</p>
      <h1 className="mt-1 font-display text-4xl tabular-nums">{order.id}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">{t(lang, "orderBody")}</p>

      <div className="mt-8 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <ul className="space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-3">
              <span>
                {item.name} × {item.qty}
              </span>
              <span className="tabular-nums">{formatAud(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
          {(order.signupDiscount ?? 0) > 0 && (
            <div className="flex justify-between text-muted">
              <span>{t(lang, "newsDiscount")}</span>
              <span className="tabular-nums">−{formatAud(order.signupDiscount ?? 0)}</span>
            </div>
          )}
          {(order.credit ?? 0) > 0 && (
            <div className="flex justify-between text-muted">
              <span>{t(lang, "creditApplied")}</span>
              <span className="tabular-nums">−{formatAud(order.credit ?? 0)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium">
            <span>{t(lang, "total")}</span>
            <span className="tabular-nums">{formatAud(order.total)}</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          {order.fulfilment === "pickup"
            ? t(lang, "pickup")
            : order.fulfilment === "nepal"
              ? t(lang, "shipNepal")
              : t(lang, "post")}
          {" · "}
          {order.payMethod === "pickup" ? t(lang, "payPickup") : t(lang, "payCard")}
        </p>
      </div>

      <Button asChild className="mt-8">
        <Link to="/">{t(lang, "backHome")}</Link>
      </Button>
    </main>
  );
}
