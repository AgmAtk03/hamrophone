import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { cloneElement, FormEvent, isValidElement, useId, useState, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { formatAud, formatOrderId, validMobile } from "@/lib/format";
import { t } from "@/lib/i18n";
import {
  cartLines,
  cartSubtotal,
  shippingFor,
  useShop,
  type Fulfilment,
  type PayMethod,
} from "@/lib/store";
import { cn } from "@/lib/cn";
import { useHydrated } from "@/lib/use-hydrated";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const lang = useShop((s) => s.lang);
  const cart = useShop((s) => s.cart);
  const creditBalance = useShop((s) => s.creditBalance);
  const newsletter = useShop((s) => s.newsletter);
  const placeOrder = useShop((s) => s.placeOrder);
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const lines = cartLines(cart);
  const subtotal = cartSubtotal(cart);

  const [fulfilment, setFulfilment] = useState<Fulfilment>("pickup");
  const [payMethod, setPayMethod] = useState<PayMethod>("pickup");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = shippingFor(subtotal, fulfilment);
  const signupDiscount = hydrated && newsletter ? Math.round(subtotal * 0.1) : 0;
  const gross = subtotal + shipping - signupDiscount;
  const credit = hydrated ? Math.min(creditBalance, Math.max(0, gross)) : 0;
  const total = Math.max(0, gross - credit);

  if (lines.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl">{t(lang, "checkoutTitle")}</h1>
        <p className="mt-3 text-muted">{t(lang, "cartEmpty")}</p>
        <Button asChild className="mt-6">
          <Link to="/shop">{t(lang, "cartEmptyCta")}</Link>
        </Button>
      </main>
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const mobile = String(fd.get("mobile") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const suburb = String(fd.get("suburb") || "").trim();
    const postcode = String(fd.get("postcode") || "").trim();
    const notes = String(fd.get("notes") || "").trim();
    const next: Record<string, string> = {};
    if (!name) next.name = t(lang, "required");
    if (!mobile || !validMobile(mobile)) next.mobile = t(lang, "invalidMobile");
    if (!email) next.email = t(lang, "required");
    if (fulfilment === "post") {
      if (!suburb) next.suburb = t(lang, "required");
      if (!postcode) next.postcode = t(lang, "required");
    }
    if (fulfilment === "nepal" && !suburb) next.suburb = t(lang, "required");
    setErrors(next);
    if (Object.keys(next).length) return;

    const id = formatOrderId();
    placeOrder({
      id,
      createdAt: new Date().toISOString(),
      items: lines.map((l) => ({
        productId: l.productId,
        qty: l.qty,
        price: l.product.price,
        name: lang === "ne" ? l.product.nameNe : l.product.name,
      })),
      fulfilment,
      payMethod,
      name,
      mobile,
      email,
      suburb,
      postcode,
      notes,
      subtotal,
      shipping,
      credit,
      signupDiscount,
      total,
    });
    navigate({ to: "/order/$id", params: { id } });
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <h1 className="font-display text-3xl">{t(lang, "checkoutTitle")}</h1>
          <p className="mt-1 text-sm text-muted">{t(lang, "checkoutLead")}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t(lang, "fullName")} error={errors.name}>
            <Input name="name" autoComplete="name" />
          </Field>
          <Field label={t(lang, "mobile")} error={errors.mobile}>
            <Input name="mobile" autoComplete="tel" placeholder="04xx xxx xxx" />
          </Field>
          <Field label={t(lang, "email")} error={errors.email} className="col-span-2">
            <Input name="email" type="email" autoComplete="email" />
          </Field>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t(lang, "fulfilment")}</legend>
          <div className="grid gap-2">
            <Choice
              active={fulfilment === "pickup"}
              onClick={() => setFulfilment("pickup")}
              title={t(lang, "pickup")}
              hint={t(lang, "pickupHint")}
            />
            <Choice
              active={fulfilment === "post"}
              onClick={() => setFulfilment("post")}
              title={t(lang, "post")}
              hint={t(lang, "postHint")}
            />
            <Choice
              active={fulfilment === "nepal"}
              onClick={() => {
                setFulfilment("nepal");
                setPayMethod("card");
              }}
              title={t(lang, "shipNepal")}
              hint={t(lang, "shipNepalHint")}
            />
          </div>
        </fieldset>

        {(fulfilment === "post" || fulfilment === "nepal") && (
          <div className="grid grid-cols-2 gap-4">
            <Field
              label={fulfilment === "nepal" ? t(lang, "cityNepal") : t(lang, "suburb")}
              error={errors.suburb}
            >
              <Input
                name="suburb"
                autoComplete="address-level2"
                placeholder={fulfilment === "nepal" ? t(lang, "cityNepalPh") : undefined}
              />
            </Field>
            {fulfilment === "post" && (
              <Field label={t(lang, "postcode")} error={errors.postcode}>
                <Input name="postcode" autoComplete="postal-code" inputMode="numeric" />
              </Field>
            )}
          </div>
        )}

        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t(lang, "payMethod")}</legend>
          <div className="grid gap-2">
            {fulfilment !== "nepal" && (
              <Choice
                active={payMethod === "pickup"}
                onClick={() => setPayMethod("pickup")}
                title={t(lang, "payPickup")}
              />
            )}
            <Choice
              active={payMethod === "card"}
              onClick={() => setPayMethod("card")}
              title={t(lang, "payCard")}
            />
          </div>
        </fieldset>

        <Field label={t(lang, "notes")}>
          <Textarea name="notes" placeholder={t(lang, "notesPh")} />
        </Field>

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {t(lang, "placeOrder")}
        </Button>
      </form>

      <aside className="h-fit rounded-2xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <ul className="space-y-3">
          {lines.map((l) => (
            <li key={l.productId} className="flex justify-between gap-3 text-sm">
              <span className="min-w-0 truncate">
                {lang === "ne" ? l.product.nameNe : l.product.name} × {l.qty}
              </span>
              <span className="tabular-nums">{formatAud(l.product.price * l.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
          <Row label={t(lang, "subtotal")} value={formatAud(subtotal)} />
          <Row
            label={t(lang, "shipping")}
            value={shipping === 0 ? t(lang, "free") : formatAud(shipping)}
          />
          {signupDiscount > 0 && (
            <Row label={t(lang, "newsDiscount")} value={`−${formatAud(signupDiscount)}`} />
          )}
          {credit > 0 && <Row label={t(lang, "creditApplied")} value={`−${formatAud(credit)}`} />}
          <Row label={t(lang, "total")} value={formatAud(total)} strong />
        </div>
      </aside>
    </main>
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
        "rounded-xl border px-4 py-3 text-left transition-colors duration-150",
        active ? "border-primary bg-primary/5" : "border-border bg-surface",
      )}
    >
      <p className="text-sm font-medium">{title}</p>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
    </button>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={cn("flex justify-between", strong && "pt-2 text-base font-medium")}>
      <span className={strong ? "text-fg" : "text-muted"}>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
