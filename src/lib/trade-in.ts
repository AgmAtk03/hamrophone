import type { Brand } from "@/lib/products";

export type ScreenWear = "clean" | "hairline" | "cracked";
export type BodyWear = "like-new" | "light" | "dents";
export type BatteryBand = "90" | "80" | "low" | "unknown";
export type AccountLock = "clear" | "locked";
export type NetworkLock = "unlocked" | "locked";
export type Payout = "cash" | "credit" | "exchange";
export type TradeHandoff = "dropoff" | "post";

export type TradeDevice = {
  id: string;
  brand: Brand;
  name: string;
  nameNe: string;
  image: string;
  storages: { size: string; maxQuote: number }[];
};

export const TRADE_DEVICES: TradeDevice[] = [
  {
    id: "iphone-16-pro-max",
    brand: "Apple",
    name: "iPhone 16 Pro Max",
    nameNe: "आइफोन १६ प्रो म्याक्स",
    image: "/products/phone-titanium.jpg",
    storages: [
      { size: "256 GB", maxQuote: 820 },
      { size: "512 GB", maxQuote: 890 },
      { size: "1 TB", maxQuote: 960 },
    ],
  },
  {
    id: "iphone-16-pro",
    brand: "Apple",
    name: "iPhone 16 Pro",
    nameNe: "आइफोन १६ प्रो",
    image: "/products/phone-black.jpg",
    storages: [
      { size: "128 GB", maxQuote: 720 },
      { size: "256 GB", maxQuote: 780 },
      { size: "512 GB", maxQuote: 840 },
    ],
  },
  {
    id: "iphone-16",
    brand: "Apple",
    name: "iPhone 16",
    nameNe: "आइफोन १६",
    image: "/products/phone-blue.jpg",
    storages: [
      { size: "128 GB", maxQuote: 540 },
      { size: "256 GB", maxQuote: 590 },
    ],
  },
  {
    id: "iphone-15-pro-max",
    brand: "Apple",
    name: "iPhone 15 Pro Max",
    nameNe: "आइफोन १५ प्रो म्याक्स",
    image: "/products/phone-blue.jpg",
    storages: [
      { size: "256 GB", maxQuote: 620 },
      { size: "512 GB", maxQuote: 680 },
    ],
  },
  {
    id: "iphone-15-pro",
    brand: "Apple",
    name: "iPhone 15 Pro",
    nameNe: "आइफोन १५ प्रो",
    image: "/products/phone-black.jpg",
    storages: [
      { size: "128 GB", maxQuote: 480 },
      { size: "256 GB", maxQuote: 530 },
    ],
  },
  {
    id: "iphone-15",
    brand: "Apple",
    name: "iPhone 15",
    nameNe: "आइफोन १५",
    image: "/products/phone-pink.jpg",
    storages: [
      { size: "128 GB", maxQuote: 380 },
      { size: "256 GB", maxQuote: 420 },
    ],
  },
  {
    id: "iphone-14-pro",
    brand: "Apple",
    name: "iPhone 14 Pro",
    nameNe: "आइफोन १४ प्रो",
    image: "/products/phone-purple.jpg",
    storages: [
      { size: "128 GB", maxQuote: 340 },
      { size: "256 GB", maxQuote: 380 },
    ],
  },
  {
    id: "iphone-14",
    brand: "Apple",
    name: "iPhone 14",
    nameNe: "आइफोन १४",
    image: "/products/phone-white.jpg",
    storages: [
      { size: "128 GB", maxQuote: 250 },
      { size: "256 GB", maxQuote: 280 },
    ],
  },
  {
    id: "iphone-13",
    brand: "Apple",
    name: "iPhone 13",
    nameNe: "आइफोन १३",
    image: "/products/phone-pink.jpg",
    storages: [
      { size: "128 GB", maxQuote: 180 },
      { size: "256 GB", maxQuote: 200 },
    ],
  },
  {
    id: "iphone-12",
    brand: "Apple",
    name: "iPhone 12",
    nameNe: "आइफोन १२",
    image: "/products/phone-white.jpg",
    storages: [
      { size: "64 GB", maxQuote: 110 },
      { size: "128 GB", maxQuote: 130 },
    ],
  },
  {
    id: "s25-ultra",
    brand: "Samsung",
    name: "Galaxy S25 Ultra",
    nameNe: "ग्यालेक्सी S25 अल्ट्रा",
    image: "/products/phone-samsung.jpg",
    storages: [
      { size: "256 GB", maxQuote: 720 },
      { size: "512 GB", maxQuote: 790 },
    ],
  },
  {
    id: "s24-ultra",
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    nameNe: "ग्यालेक्सी S24 अल्ट्रा",
    image: "/products/phone-samsung.jpg",
    storages: [
      { size: "256 GB", maxQuote: 480 },
      { size: "512 GB", maxQuote: 530 },
    ],
  },
  {
    id: "s24",
    brand: "Samsung",
    name: "Galaxy S24",
    nameNe: "ग्यालेक्सी S24",
    image: "/products/phone-compact.jpg",
    storages: [
      { size: "128 GB", maxQuote: 310 },
      { size: "256 GB", maxQuote: 350 },
    ],
  },
  {
    id: "s23",
    brand: "Samsung",
    name: "Galaxy S23",
    nameNe: "ग्यालेक्सी S23",
    image: "/products/phone-compact.jpg",
    storages: [
      { size: "128 GB", maxQuote: 210 },
      { size: "256 GB", maxQuote: 240 },
    ],
  },
  {
    id: "pixel-9-pro",
    brand: "Google",
    name: "Pixel 9 Pro",
    nameNe: "पिक्सेल ९ प्रो",
    image: "/products/phone-pixel.jpg",
    storages: [
      { size: "128 GB", maxQuote: 420 },
      { size: "256 GB", maxQuote: 470 },
    ],
  },
  {
    id: "pixel-8-pro",
    brand: "Google",
    name: "Pixel 8 Pro",
    nameNe: "पिक्सेल ८ प्रो",
    image: "/products/phone-pixel.jpg",
    storages: [
      { size: "128 GB", maxQuote: 280 },
      { size: "256 GB", maxQuote: 320 },
    ],
  },
  {
    id: "pixel-8",
    brand: "Google",
    name: "Pixel 8",
    nameNe: "पिक्सेल ८",
    image: "/products/phone-compact.jpg",
    storages: [
      { size: "128 GB", maxQuote: 200 },
      { size: "256 GB", maxQuote: 230 },
    ],
  },
];

export const TRADE_BRANDS: Brand[] = ["Apple", "Samsung", "Google"];

export function devicesByBrand(brand: Brand) {
  return TRADE_DEVICES.filter((d) => d.brand === brand);
}

export function getTradeDevice(id: string) {
  return TRADE_DEVICES.find((d) => d.id === id);
}

function round5(n: number) {
  return Math.max(0, Math.round(n / 5) * 5);
}

export type QuoteInput = {
  deviceId: string;
  storage: string;
  working: boolean;
  screen: ScreenWear;
  body: BodyWear;
  battery: BatteryBand;
  accountLock: AccountLock;
  network: NetworkLock;
};

export type Quote = {
  cash: number;
  credit: number;
  exchange: number;
  locked: boolean;
  parts: boolean;
};

const SCREEN_F: Record<ScreenWear, number> = { clean: 1, hairline: 0.9, cracked: 0.42 };
const BODY_F: Record<BodyWear, number> = { "like-new": 1, light: 0.93, dents: 0.8 };
const BATT_F: Record<BatteryBand, number> = { "90": 1, "80": 0.9, low: 0.72, unknown: 0.88 };

export function quoteTradeIn(input: QuoteInput): Quote | null {
  const device = getTradeDevice(input.deviceId);
  const storage = device?.storages.find((s) => s.size === input.storage);
  if (!device || !storage) return null;

  if (input.accountLock === "locked") {
    return { cash: 0, credit: 0, exchange: 0, locked: true, parts: false };
  }

  let n = storage.maxQuote;
  let parts = false;
  if (!input.working) {
    n *= 0.18;
    parts = true;
  } else {
    n *= SCREEN_F[input.screen] * BODY_F[input.body] * BATT_F[input.battery];
    if (input.screen === "cracked") parts = true;
    if (input.network === "locked") n *= 0.82;
  }

  const cash = round5(n);
  return {
    cash,
    credit: round5(cash * 1.15),
    exchange: round5(cash * 1.22),
    locked: false,
    parts,
  };
}

export function payoutAmount(quote: Quote, payout: Payout) {
  if (payout === "cash") return quote.cash;
  if (payout === "credit") return quote.credit;
  return quote.exchange;
}
