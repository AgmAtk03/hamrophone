import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { formatAud } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useShop } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/trade/$id")({ component: TradePage });

function TradePage() {
  const { id } = Route.useParams();
  const lang = useShop((s) => s.lang);
  const tradeIns = useShop((s) => s.tradeIns);
  const hydrated = useHydrated();
  const trade = hydrated ? tradeIns.find((o) => o.id === id) : undefined;

  if (!hydrated) {
    return <main className="mx-auto max-w-lg px-4 py-16" />;
  }

  if (!trade) {
    return (
      <main className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl">{t(lang, "noResults")}</h1>
        <Button asChild className="mt-6">
          <Link to="/sell">{t(lang, "getQuote")}</Link>
        </Button>
      </main>
    );
  }

  const payoutLabel =
    trade.payout === "cash"
      ? t(lang, "tradeCash")
      : trade.payout === "credit"
        ? t(lang, "tradeCredit")
        : t(lang, "tradeExchange");

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <p className="text-xs uppercase tracking-widest text-muted">{t(lang, "tradeId")}</p>
      <h1 className="mt-1 font-display text-4xl tabular-nums">{trade.id}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">{t(lang, "tradeBody")}</p>

      <div className="mt-8 rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <p className="text-sm font-medium">
          {lang === "ne" ? trade.deviceNameNe : trade.deviceName} · {trade.storage}
        </p>
        <div className="mt-4 flex justify-between border-t border-border pt-4">
          <span className="text-sm text-muted">{t(lang, "tradePayout")}</span>
          <span className="text-sm">{payoutLabel}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-sm text-muted">{t(lang, "total")}</span>
          <span className="font-display text-2xl tabular-nums">{formatAud(trade.amount)}</span>
        </div>
        <p className="mt-3 text-xs text-muted">
          {trade.handoff === "dropoff" ? t(lang, "sellDropoff") : t(lang, "sellPostIn")}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {trade.payout !== "cash" && (
          <Button asChild>
            <Link to="/shop">{t(lang, "useCredit")}</Link>
          </Button>
        )}
        <Button asChild variant={trade.payout === "cash" ? "default" : "outline"}>
          <Link to="/">{t(lang, "backHome")}</Link>
        </Button>
      </div>
    </main>
  );
}
