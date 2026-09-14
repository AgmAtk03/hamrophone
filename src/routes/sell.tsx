import { createFileRoute } from "@tanstack/react-router";
import { Banknote, RefreshCw, Repeat, Shield } from "lucide-react";
import { SellWizard } from "@/components/sell-wizard";
import { t, type CopyKey } from "@/lib/i18n";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/sell")({ component: SellPage });

const how: { t: CopyKey; b: CopyKey }[] = [
  { t: "sellHow1t", b: "sellHow1" },
  { t: "sellHow2t", b: "sellHow2" },
  { t: "sellHow3t", b: "sellHow3" },
  { t: "sellHow4t", b: "sellHow4" },
];

const payouts: { icon: typeof Banknote; t: CopyKey; b: CopyKey }[] = [
  { icon: Banknote, t: "payoutCash", b: "payoutCashHint" },
  { icon: RefreshCw, t: "payoutCredit", b: "payoutCreditHint" },
  { icon: Repeat, t: "payoutExchange", b: "payoutExchangeHint" },
];

const faqs: { t: CopyKey; b: CopyKey }[] = [
  { t: "sellFaq1t", b: "sellFaq1" },
  { t: "sellFaq2t", b: "sellFaq2" },
  { t: "sellFaq3t", b: "sellFaq3" },
  { t: "sellFaq4t", b: "sellFaq4" },
];

const prep: CopyKey[] = ["sellPrep1", "sellPrep2", "sellPrep3", "sellPrep4"];

function SellPage() {
  const lang = useShop((s) => s.lang);

  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-6 md:grid-cols-2 md:gap-8 md:py-14">
        <div className="order-2 md:order-1">
          <p className="text-xs uppercase tracking-widest text-muted">{t(lang, "sellKicker")}</p>
          <h1 className="mt-3 font-display text-3xl text-fg md:text-5xl">{t(lang, "sellTitle")}</h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{t(lang, "sellLead")}</p>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1">
            {payouts.map((p) => (
              <li key={p.t} className="flex gap-3">
                <p.icon className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">{t(lang, p.t)}</p>
                  <p className="mt-0.5 text-sm text-muted">{t(lang, p.b)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <SellWizard />
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl text-fg">{t(lang, "sellHowTitle")}</h2>
          <ol className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 md:mt-8 md:gap-8">
            {how.map((s, i) => (
              <li key={s.t}>
                <p className="text-xs uppercase tracking-widest text-muted">
                  {t(lang, "step")} {i + 1}
                </p>
                <h3 className="mt-2 font-display text-xl">{t(lang, s.t)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, s.b)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-fg">{t(lang, "sellPrepTitle")}</h2>
          <ol className="mt-6 space-y-3">
            {prep.map((k, i) => (
              <li key={k} className="flex gap-3 text-sm leading-relaxed">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                  {i + 1}
                </span>
                <span>{t(lang, k)}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-display text-3xl text-fg">{t(lang, "sellFaqTitle")}</h2>
          <dl className="mt-6 space-y-5">
            {faqs.map((f) => (
              <div key={f.t}>
                <dt className="flex items-start gap-2 text-sm font-medium">
                  <Shield className="mt-0.5 size-4 shrink-0 text-primary" />
                  {t(lang, f.t)}
                </dt>
                <dd className="mt-1 pl-6 text-sm leading-relaxed text-muted">{t(lang, f.b)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
