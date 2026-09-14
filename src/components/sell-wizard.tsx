import { useNavigate } from "@tanstack/react-router";
import { cloneElement, FormEvent, isValidElement, useId, useMemo, useState, type ReactElement, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { formatAud, formatTradeId, validMobile } from "@/lib/format";
import { t, type CopyKey } from "@/lib/i18n";
import { useShop } from "@/lib/store";
import {
  TRADE_BRANDS,
  devicesByBrand,
  getTradeDevice,
  payoutAmount,
  quoteTradeIn,
  type AccountLock,
  type BatteryBand,
  type BodyWear,
  type NetworkLock,
  type Payout,
  type QuoteInput,
  type ScreenWear,
  type TradeHandoff,
} from "@/lib/trade-in";
import type { Brand } from "@/lib/products";

const STEPS: CopyKey[] = ["sellStepDevice", "sellStepCondition", "sellStepOffer", "sellStepBook"];

export function SellWizard() {
  const lang = useShop((s) => s.lang);
  const bookTradeIn = useShop((s) => s.bookTradeIn);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [deviceId, setDeviceId] = useState("");
  const [storage, setStorage] = useState("");
  const [working, setWorking] = useState<boolean | null>(null);
  const [screen, setScreen] = useState<ScreenWear | null>(null);
  const [body, setBody] = useState<BodyWear | null>(null);
  const [battery, setBattery] = useState<BatteryBand | null>(null);
  const [accountLock, setAccountLock] = useState<AccountLock | null>(null);
  const [network, setNetwork] = useState<NetworkLock | null>(null);
  const [payout, setPayout] = useState<Payout>("exchange");
  const [handoff, setHandoff] = useState<TradeHandoff>("dropoff");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const device = deviceId ? getTradeDevice(deviceId) : undefined;
  const models = brand ? devicesByBrand(brand) : [];

  const input: QuoteInput | null =
    device && storage && working !== null && screen && body && battery && accountLock && network
      ? { deviceId, storage, working, screen, body, battery, accountLock, network }
      : null;

  const quote = useMemo(() => (input ? quoteTradeIn(input) : null), [input]);

  const deviceReady = Boolean(brand && deviceId && storage);
  const conditionReady = working !== null && screen && body && battery && accountLock && network;

  function onBrand(next: Brand) {
    setBrand(next);
    setDeviceId("");
    setStorage("");
  }

  function onDevice(id: string) {
    setDeviceId(id);
    setStorage("");
  }

  function onBook(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!quote || !input || !device || quote.locked) return;
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const mobile = String(fd.get("mobile") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const payId = String(fd.get("payId") || "").trim();
    const suburb = String(fd.get("suburb") || "").trim();
    const postcode = String(fd.get("postcode") || "").trim();
    const notes = String(fd.get("notes") || "").trim();
    const next: Record<string, string> = {};
    if (!name) next.name = t(lang, "required");
    if (!mobile || !validMobile(mobile)) next.mobile = t(lang, "invalidMobile");
    if (!email) next.email = t(lang, "required");
    if (payout === "cash" && !payId) next.payId = t(lang, "required");
    if (handoff === "post") {
      if (!suburb) next.suburb = t(lang, "required");
      if (!postcode) next.postcode = t(lang, "required");
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    const id = formatTradeId();
    const createdAt = new Date();
    const expires = new Date(createdAt);
    expires.setDate(expires.getDate() + 7);
    bookTradeIn({
      ...input,
      id,
      createdAt: createdAt.toISOString(),
      expiresAt: expires.toISOString(),
      deviceName: device.name,
      deviceNameNe: device.nameNe,
      quote,
      payout,
      amount: payoutAmount(quote, payout),
      handoff,
      name,
      mobile,
      email,
      payId,
      suburb,
      postcode,
      notes,
    });
    navigate({ to: "/trade/$id", params: { id } });
  }

  return (
    <div className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-6">
      <ol className="mb-6 grid grid-cols-4 gap-1">
        {STEPS.map((key, i) => (
          <li key={key} className="min-w-0">
            <p
              className={cn(
                "truncate text-xs uppercase tracking-widest",
                i === step ? "text-primary" : "text-muted",
              )}
            >
              {i + 1} {t(lang, key)}
            </p>
            <div className={cn("mt-1 h-0.5 rounded-full", i <= step ? "bg-primary" : "bg-border")} />
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="space-y-6">
          <fieldset>
            <legend className="mb-2 text-sm font-medium">{t(lang, "sellBrand")}</legend>
            <div className="grid grid-cols-3 gap-2">
              {TRADE_BRANDS.map((b) => (
                <Choice key={b} active={brand === b} onClick={() => onBrand(b)} title={b} />
              ))}
            </div>
          </fieldset>

          {brand && (
            <fieldset>
              <legend className="mb-2 text-sm font-medium">{t(lang, "sellModel")}</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {models.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onDevice(m.id)}
                    className={cn(
                      "overflow-hidden rounded-xl border text-left transition-colors duration-150",
                      deviceId === m.id ? "border-primary bg-primary/5" : "border-border bg-bg",
                    )}
                  >
                    <img src={m.image} alt="" className="h-28 w-full object-cover" />
                    <p className="px-3 py-2 text-sm font-medium">
                      {lang === "ne" ? m.nameNe : m.name}
                    </p>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {device && (
            <fieldset>
              <legend className="mb-2 text-sm font-medium">{t(lang, "storage")}</legend>
              <div className="flex flex-wrap gap-2">
                {device.storages.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setStorage(s.size)}
                    className={cn(
                      "h-11 min-h-11 rounded-full px-4 text-sm transition-colors duration-150",
                      storage === s.size
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-fg hover:bg-secondary/70",
                    )}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <Button size="lg" disabled={!deviceReady} onClick={() => setStep(1)}>
            {t(lang, "sellNext")}
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <ChoiceGroup legend={t(lang, "sellWorking")}>
            <Choice
              active={working === true}
              onClick={() => setWorking(true)}
              title={t(lang, "sellWorkingYes")}
            />
            <Choice
              active={working === false}
              onClick={() => setWorking(false)}
              title={t(lang, "sellWorkingNo")}
            />
          </ChoiceGroup>
          <ChoiceGroup legend={t(lang, "sellScreen")}>
            <Choice
              active={screen === "clean"}
              onClick={() => setScreen("clean")}
              title={t(lang, "sellScreenClean")}
            />
            <Choice
              active={screen === "hairline"}
              onClick={() => setScreen("hairline")}
              title={t(lang, "sellScreenHair")}
            />
            <Choice
              active={screen === "cracked"}
              onClick={() => setScreen("cracked")}
              title={t(lang, "sellScreenCrack")}
            />
          </ChoiceGroup>
          <ChoiceGroup legend={t(lang, "sellBody")}>
            <Choice
              active={body === "like-new"}
              onClick={() => setBody("like-new")}
              title={t(lang, "sellBodyNew")}
            />
            <Choice
              active={body === "light"}
              onClick={() => setBody("light")}
              title={t(lang, "sellBodyLight")}
            />
            <Choice
              active={body === "dents"}
              onClick={() => setBody("dents")}
              title={t(lang, "sellBodyDents")}
            />
          </ChoiceGroup>
          <ChoiceGroup legend={t(lang, "sellBatteryQ")}>
            <Choice active={battery === "90"} onClick={() => setBattery("90")} title={t(lang, "sellBat90")} />
            <Choice active={battery === "80"} onClick={() => setBattery("80")} title={t(lang, "sellBat80")} />
            <Choice active={battery === "low"} onClick={() => setBattery("low")} title={t(lang, "sellBatLow")} />
            <Choice
              active={battery === "unknown"}
              onClick={() => setBattery("unknown")}
              title={t(lang, "sellBatUnk")}
            />
          </ChoiceGroup>
          <ChoiceGroup legend={t(lang, "sellLock")}>
            <Choice
              active={accountLock === "clear"}
              onClick={() => setAccountLock("clear")}
              title={t(lang, "sellLockClear")}
            />
            <Choice
              active={accountLock === "locked"}
              onClick={() => setAccountLock("locked")}
              title={t(lang, "sellLockOn")}
            />
          </ChoiceGroup>
          <ChoiceGroup legend={t(lang, "sellNetwork")}>
            <Choice
              active={network === "unlocked"}
              onClick={() => setNetwork("unlocked")}
              title={t(lang, "sellNetUnlock")}
            />
            <Choice
              active={network === "locked"}
              onClick={() => setNetwork("locked")}
              title={t(lang, "sellNetLock")}
            />
          </ChoiceGroup>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setStep(0)}>
              {t(lang, "sellBack")}
            </Button>
            <Button size="lg" disabled={!conditionReady} onClick={() => setStep(2)}>
              {t(lang, "sellSeeOffer")}
            </Button>
          </div>
        </div>
      )}

      {step === 2 && quote && device && (
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted">
              {lang === "ne" ? device.nameNe : device.name}
              {storage ? ` · ${storage}` : ""}
            </p>
            {quote.locked ? (
              <>
                <h2 className="mt-2 font-display text-3xl text-fg">{t(lang, "sellLockedTitle")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, "sellLockedBody")}</p>
              </>
            ) : (
              <>
                <h2 className="mt-2 font-display text-3xl text-fg">{t(lang, "sellQuoteTitle")}</h2>
                <p className="mt-1 text-sm text-muted">{t(lang, "sellQuoteHold")}</p>
                {quote.parts && (
                  <p className="mt-2 text-sm text-danger">{t(lang, "sellPartsNote")}</p>
                )}
              </>
            )}
          </div>

          {!quote.locked && (
            <fieldset className="grid gap-2">
              <legend className="sr-only">{t(lang, "sellQuoteTitle")}</legend>
              <PayoutCard
                active={payout === "cash"}
                onClick={() => setPayout("cash")}
                title={t(lang, "payoutCash")}
                hint={t(lang, "payoutCashHint")}
                amount={quote.cash}
              />
              <PayoutCard
                active={payout === "credit"}
                onClick={() => setPayout("credit")}
                title={t(lang, "payoutCredit")}
                hint={t(lang, "payoutCreditHint")}
                amount={quote.credit}
              />
              <PayoutCard
                active={payout === "exchange"}
                onClick={() => setPayout("exchange")}
                title={t(lang, "payoutExchange")}
                hint={t(lang, "payoutExchangeHint")}
                amount={quote.exchange}
                badge={t(lang, "payoutBest")}
              />
            </fieldset>
          )}

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              {t(lang, "sellBack")}
            </Button>
            <Button size="lg" disabled={quote.locked} onClick={() => setStep(3)}>
              {t(lang, "sellNext")}
            </Button>
          </div>
        </div>
      )}

      {step === 3 && quote && device && (
        <form onSubmit={onBook} className="space-y-5">
          <div>
            <h2 className="font-display text-2xl text-fg">{t(lang, "sellBookTitle")}</h2>
            <p className="mt-1 text-sm text-muted">{t(lang, "sellBookLead")}</p>
            <p className="mt-3 font-display text-3xl tabular-nums text-primary">
              {formatAud(payoutAmount(quote, payout))}
            </p>
            <p className="text-xs uppercase tracking-widest text-muted">
              {payout === "cash"
                ? t(lang, "tradeCash")
                : payout === "credit"
                  ? t(lang, "tradeCredit")
                  : t(lang, "tradeExchange")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t(lang, "fullName")} error={errors.name}>
              <Input name="name" autoComplete="name" />
            </Field>
            <Field label={t(lang, "mobile")} error={errors.mobile}>
              <Input name="mobile" autoComplete="tel" placeholder="04xx xxx xxx" />
            </Field>
            <Field label={t(lang, "email")} error={errors.email} className="sm:col-span-2">
              <Input name="email" type="email" autoComplete="email" />
            </Field>
            {payout === "cash" && (
              <Field label={t(lang, "sellPayId")} error={errors.payId} className="sm:col-span-2">
                <Input name="payId" autoComplete="email" />
              </Field>
            )}
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium">{t(lang, "tradeHandoff")}</legend>
            <div className="grid gap-2">
              <Choice
                active={handoff === "dropoff"}
                onClick={() => setHandoff("dropoff")}
                title={t(lang, "sellDropoff")}
                hint={t(lang, "sellDropoffHint")}
              />
              <Choice
                active={handoff === "post"}
                onClick={() => setHandoff("post")}
                title={t(lang, "sellPostIn")}
                hint={t(lang, "sellPostInHint")}
              />
            </div>
          </fieldset>

          {handoff === "post" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t(lang, "suburb")} error={errors.suburb}>
                <Input name="suburb" autoComplete="address-level2" />
              </Field>
              <Field label={t(lang, "postcode")} error={errors.postcode}>
                <Input name="postcode" autoComplete="postal-code" inputMode="numeric" />
              </Field>
            </div>
          )}

          <Field label={t(lang, "notes")}>
            <Textarea name="notes" placeholder={t(lang, "notesPh")} />
          </Field>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>
              {t(lang, "sellBack")}
            </Button>
            <Button type="submit" size="lg">
              {t(lang, "sellBookCta")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function ChoiceGroup({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <div className="grid gap-2">{children}</div>
    </fieldset>
  );
}

function Choice({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-xl border px-4 py-3 text-left transition-colors duration-150",
        active ? "border-primary bg-primary/5" : "border-border bg-bg",
      )}
    >
      <p className="text-sm font-medium">{title}</p>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
    </button>
  );
}

function PayoutCard({
  active,
  onClick,
  title,
  hint,
  amount,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint: string;
  amount: number;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-start justify-between gap-4 rounded-xl border px-4 py-4 text-left transition-colors duration-150",
        active ? "border-primary bg-primary/5" : "border-border bg-bg",
      )}
    >
      <span>
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          {badge && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-1 block text-xs text-muted">{hint}</span>
      </span>
      <span className="shrink-0 font-display text-2xl tabular-nums text-fg">{formatAud(amount)}</span>
    </button>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactElement;
}) {
  const id = useId();
  const control = isValidElement(children)
    ? cloneElement(children, { id } as { id: string })
    : children;
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      {control}
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  );
}
