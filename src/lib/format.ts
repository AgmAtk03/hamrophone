export function formatAud(amount: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function savingsPercent(price: number, original: number) {
  if (original <= price) return 0;
  return Math.round((1 - price / original) * 100);
}

export function formatOrderId() {
  const n = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SI-${n}`;
}

export function formatTradeId() {
  const n = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `RP-${n}`;
}

export function validMobile(raw: string) {
  const n = raw.replace(/[\s-]/g, "");
  return /^(\+?61|0)4\d{8}$/.test(n) || /^(\+?977)?9[78]\d{8}$/.test(n);
}
