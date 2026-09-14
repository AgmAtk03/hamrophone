export type Condition = "like-new" | "excellent" | "good" | "fair";
export type Brand = "Apple" | "Samsung" | "Google";
export type Category = "iphone" | "android" | "audio" | "watch" | "tablet";

export type Product = {
  id: string;
  slug: string;
  brand: Brand;
  category: Category;
  name: string;
  nameNe: string;
  storage?: string;
  color: string;
  colorNe: string;
  condition: Condition;
  price: number;
  originalPrice: number;
  batteryHealth?: number;
  warrantyMonths: number;
  image: string;
  gallery: string[];
  stock: number;
  featured?: boolean;
  description: string;
  descriptionNe: string;
  includes: string[];
  includesNe: string[];
};

export const CONDITIONS: Condition[] = ["like-new", "excellent", "good", "fair"];
export const BRANDS: Brand[] = ["Apple", "Samsung", "Google"];
export const CATEGORIES: Category[] = ["iphone", "android", "audio", "watch", "tablet"];

export const products: Product[] = [
  {
    id: "p1",
    slug: "iphone-16-pro-max-256-natural",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 16 Pro Max",
    nameNe: "आइफोन १६ प्रो म्याक्स",
    storage: "256 GB",
    color: "Natural Titanium",
    colorNe: "नेचुरल टाइटानियम",
    condition: "excellent",
    price: 1249,
    originalPrice: 1899,
    batteryHealth: 96,
    warrantyMonths: 12,
    image: "/products/phone-titanium.jpg",
    gallery: ["/products/phone-titanium.jpg", "/products/phone-black.jpg", "/products/hero-table.jpg"],
    stock: 4,
    featured: true,
    description:
      "Light desk use only. Screen is clean, frame has a faint hairline on the lower rail. Battery tested at 96%. IMEI clear, Face ID working, both cameras sharp.",
    descriptionNe:
      "हल्का प्रयोग मात्र। स्क्रिन सफा, फ्रेममा तलतिर एक हल्का रेखा। ब्याट्री ९६%। IMEI सफा, Face ID र क्यामेरा दुवै ठीक।",
    includes: ["Phone", "USB-C cable", "Sim tool", "12-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "USB-C केबल", "सिम टुल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p2",
    slug: "iphone-16-pro-128-black",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 16 Pro",
    nameNe: "आइफोन १६ प्रो",
    storage: "128 GB",
    color: "Black Titanium",
    colorNe: "कालो टाइटानियम",
    condition: "like-new",
    price: 1099,
    originalPrice: 1699,
    batteryHealth: 99,
    warrantyMonths: 12,
    image: "/products/phone-black.jpg",
    gallery: ["/products/phone-black.jpg", "/products/phone-titanium.jpg"],
    stock: 3,
    featured: true,
    description:
      "Opened, barely used. Looks new in hand. Battery 99%, original box, no marks under raking light.",
    descriptionNe:
      "खोलेर थोरै मात्र चलाइएको। हातमा नयाँ जस्तै। ब्याट्री ९९%, मौलिक बक्स, कुनै दाग छैन।",
    includes: ["Phone", "Original box", "USB-C cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "मौलिक बक्स", "USB-C केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p3",
    slug: "iphone-16-128-ultramarine",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 16",
    nameNe: "आइफोन १६",
    storage: "128 GB",
    color: "Ultramarine",
    colorNe: "अल्ट्रामरीन",
    condition: "excellent",
    price: 849,
    originalPrice: 1399,
    batteryHealth: 94,
    warrantyMonths: 12,
    image: "/products/phone-blue.jpg",
    gallery: ["/products/phone-blue.jpg", "/products/phone-white.jpg"],
    stock: 6,
    featured: true,
    description:
      "A clean daily driver. Camera bump has a tiny fleck; screen is unmarked. Battery 94%, fully tested.",
    descriptionNe:
      "दैनिक प्रयोगका लागि सफा फोन। क्यामेरा नजिक सानो दाग, स्क्रिनमा केही छैन। ब्याट्री ९४%。",
    includes: ["Phone", "USB-C cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "USB-C केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p4",
    slug: "iphone-15-pro-max-256-blue",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 15 Pro Max",
    nameNe: "आइफोन १५ प्रो म्याक्स",
    storage: "256 GB",
    color: "Blue Titanium",
    colorNe: "नीलो टाइटानियम",
    condition: "good",
    price: 999,
    originalPrice: 1899,
    batteryHealth: 89,
    warrantyMonths: 6,
    image: "/products/phone-blue.jpg",
    gallery: ["/products/phone-blue.jpg", "/products/phone-titanium.jpg"],
    stock: 5,
    featured: true,
    description:
      "Honest wear on the corners, screen is glass-perfect after a new protector. Battery 89%. Camera and Action button tested.",
    descriptionNe:
      "कुनामा सामान्य घिसार, स्क्रिनमा नयाँ प्रोटेक्टर। ब्याट्री ८९%। क्यामेरा र Action बटन जाँच गरिएको।",
    includes: ["Phone", "USB-C cable", "Screen protector", "6-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "USB-C केबल", "स्क्रिन प्रोटेक्टर", "६ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p5",
    slug: "iphone-15-pro-128-natural",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 15 Pro",
    nameNe: "आइफोन १५ प्रो",
    storage: "128 GB",
    color: "Natural Titanium",
    colorNe: "नेचुरल टाइटानियम",
    condition: "excellent",
    price: 899,
    originalPrice: 1599,
    batteryHealth: 93,
    warrantyMonths: 12,
    image: "/products/phone-titanium.jpg",
    gallery: ["/products/phone-titanium.jpg", "/products/phone-black.jpg"],
    stock: 4,
    featured: true,
    description:
      "Quiet office phone. One micro-mark on the titanium band. Battery 93%, speakers and mics clean.",
    descriptionNe:
      "अफिसमा प्रयोग भएको। टाइटानियम ब्यान्डमा एक सूक्ष्म दाग। ब्याट्री ९३%。",
    includes: ["Phone", "USB-C cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "USB-C केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p6",
    slug: "iphone-15-128-pink",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 15",
    nameNe: "आइफोन १५",
    storage: "128 GB",
    color: "Pink",
    colorNe: "गुलाबी",
    condition: "like-new",
    price: 749,
    originalPrice: 1349,
    batteryHealth: 98,
    warrantyMonths: 12,
    image: "/products/phone-pink.jpg",
    gallery: ["/products/phone-pink.jpg", "/products/phone-white.jpg"],
    stock: 7,
    featured: true,
    description:
      "Gifted and unused after a week. Battery 98%, no wear, Dynamic Island and cameras as they should be.",
    descriptionNe:
      "उपहारमा आएर एक हप्ता मात्र चलाइएको। ब्याट्री ९८%, घिसार छैन।",
    includes: ["Phone", "Original box", "USB-C cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "मौलिक बक्स", "USB-C केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p7",
    slug: "iphone-14-pro-128-purple",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 14 Pro",
    nameNe: "आइफोन १४ प्रो",
    storage: "128 GB",
    color: "Deep Purple",
    colorNe: "गाढा बैजनी",
    condition: "good",
    price: 649,
    originalPrice: 1699,
    batteryHealth: 87,
    warrantyMonths: 6,
    image: "/products/phone-purple.jpg",
    gallery: ["/products/phone-purple.jpg", "/products/phone-black.jpg"],
    stock: 8,
    description:
      "A workhorse with honest edge wear. Screen is clean. Always-On display and 48MP camera tested. Battery 87%.",
    descriptionNe:
      "काममा धेरै चलाइएको, किनारामा घिसार। स्क्रिन सफा। ब्याट्री ८७%。",
    includes: ["Phone", "USB-C cable", "6-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "USB-C केबल", "६ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p8",
    slug: "iphone-14-128-midnight",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 14",
    nameNe: "आइफोन १४",
    storage: "128 GB",
    color: "Midnight",
    colorNe: "मिडनाइट",
    condition: "excellent",
    price: 549,
    originalPrice: 1299,
    batteryHealth: 91,
    warrantyMonths: 12,
    image: "/products/phone-midnight.jpg",
    gallery: ["/products/phone-midnight.jpg", "/products/phone-black.jpg"],
    stock: 9,
    featured: true,
    description:
      "The family spare, barely out of the drawer. Battery 91%, no cracks, Face ID and haptics solid.",
    descriptionNe:
      "घरको स्पेयर फोन, थोरै चलाइएको। ब्याट्री ९१%, कुनै चर्को छैन।",
    includes: ["Phone", "Lightning/USB-C cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p9",
    slug: "iphone-13-128-starlight",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 13",
    nameNe: "आइफोन १३",
    storage: "128 GB",
    color: "Starlight",
    colorNe: "स्टारलाइट",
    condition: "good",
    price: 429,
    originalPrice: 1199,
    batteryHealth: 86,
    warrantyMonths: 6,
    image: "/products/phone-white.jpg",
    gallery: ["/products/phone-white.jpg", "/products/phone-pink.jpg"],
    stock: 11,
    featured: true,
    description:
      "Still a fast daily phone. Light scuffs on the aluminium, screen replaced with genuine-spec glass. Battery 86%.",
    descriptionNe:
      "अझै छिटो दैनिक फोन। फ्रेममा हल्का scratch, स्क्रिन फेरेको। ब्याट्री ८६%。",
    includes: ["Phone", "Cable", "6-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "केबल", "६ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p10",
    slug: "iphone-13-pro-256-graphite",
    brand: "Apple",
    category: "iphone",
    name: "iPhone 13 Pro",
    nameNe: "आइफोन १३ प्रो",
    storage: "256 GB",
    color: "Graphite",
    colorNe: "ग्रेफाइट",
    condition: "fair",
    price: 499,
    originalPrice: 1699,
    batteryHealth: 82,
    warrantyMonths: 3,
    image: "/products/phone-black.jpg",
    gallery: ["/products/phone-black.jpg", "/products/phone-midnight.jpg"],
    stock: 3,
    description:
      "Visible wear, priced honestly. Screen is intact, ProMotion works, battery 82%. Fine as a second phone or for the kids.",
    descriptionNe:
      "देखिने घिसार, इमानदार मूल्य। स्क्रिन ठीक, ब्याट्री ८२%। दोस्रो फोन वा बच्चाका लागि राम्रो।",
    includes: ["Phone", "Cable", "3-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "केबल", "३ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p11",
    slug: "iphone-se-64-midnight",
    brand: "Apple",
    category: "iphone",
    name: "iPhone SE (3rd gen)",
    nameNe: "आइफोन एसई",
    storage: "64 GB",
    color: "Midnight",
    colorNe: "मिडनाइट",
    condition: "excellent",
    price: 299,
    originalPrice: 679,
    batteryHealth: 92,
    warrantyMonths: 12,
    image: "/products/phone-midnight.jpg",
    gallery: ["/products/phone-midnight.jpg"],
    stock: 10,
    featured: true,
    description:
      "Small, fast, cheap. Touch ID and A15 tested. A clean first iPhone for parents who want something simple.",
    descriptionNe:
      "सानो, छिटो, सस्तो। Touch ID ठीक। अभिभावकका लागि सजिलो पहिलो आइफोन।",
    includes: ["Phone", "Cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p12",
    slug: "galaxy-s24-ultra-256",
    brand: "Samsung",
    category: "android",
    name: "Galaxy S24 Ultra",
    nameNe: "ग्यालेक्सी एस२४ अल्ट्रा",
    storage: "256 GB",
    color: "Titanium Gray",
    colorNe: "टाइटानियम ग्रे",
    condition: "excellent",
    price: 899,
    originalPrice: 1999,
    batteryHealth: 94,
    warrantyMonths: 12,
    image: "/products/phone-samsung.jpg",
    gallery: ["/products/phone-samsung.jpg", "/products/phone-black.jpg"],
    stock: 3,
    featured: true,
    description:
      "S Pen in the silo, no screen burn, 94% battery. Unlocked, ready for Optus, Telstra or Vodafone.",
    descriptionNe:
      "S Pen सहित, स्क्रिनमा burn छैन, ब्याट्री ९४%। अनलक, सबै AU नेटवर्कमा चल्छ।",
    includes: ["Phone", "S Pen", "USB-C cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "S Pen", "USB-C केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p13",
    slug: "galaxy-s23-128",
    brand: "Samsung",
    category: "android",
    name: "Galaxy S23",
    nameNe: "ग्यालेक्सी एस२३",
    storage: "128 GB",
    color: "Phantom Black",
    colorNe: "फ्यान्टम ब्ल्याक",
    condition: "good",
    price: 449,
    originalPrice: 1299,
    batteryHealth: 88,
    warrantyMonths: 6,
    image: "/products/phone-black.jpg",
    gallery: ["/products/phone-black.jpg", "/products/phone-samsung.jpg"],
    stock: 6,
    description:
      "Compact flagship. Light frame rub, screen unmarked. Battery 88%, 120Hz panel smooth.",
    descriptionNe:
      "सानो फ्ल्यागशिप। फ्रेममा हल्का rub, स्क्रिन सफा। ब्याट्री ८८%。",
    includes: ["Phone", "USB-C cable", "6-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "USB-C केबल", "६ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p14",
    slug: "pixel-8-pro-128",
    brand: "Google",
    category: "android",
    name: "Pixel 8 Pro",
    nameNe: "पिक्सेल ८ प्रो",
    storage: "128 GB",
    color: "Obsidian",
    colorNe: "अब्सिडियन",
    condition: "excellent",
    price: 549,
    originalPrice: 1499,
    batteryHealth: 93,
    warrantyMonths: 12,
    image: "/products/phone-pixel.jpg",
    gallery: ["/products/phone-pixel.jpg", "/products/phone-black.jpg"],
    stock: 5,
    featured: true,
    description:
      "Camera phone of the lot. Battery 93%, no dead pixels, Tensor and modem tested on Telstra.",
    descriptionNe:
      "क्यामेराका लागि उत्तम। ब्याट्री ९३%। Telstra मा जाँच गरिएको।",
    includes: ["Phone", "USB-C cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "USB-C केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p15",
    slug: "pixel-8-128",
    brand: "Google",
    category: "android",
    name: "Pixel 8",
    nameNe: "पिक्सेल ८",
    storage: "128 GB",
    color: "Hazel",
    colorNe: "हेजल",
    condition: "good",
    price: 399,
    originalPrice: 999,
    batteryHealth: 88,
    warrantyMonths: 6,
    image: "/products/phone-pixel.jpg",
    gallery: ["/products/phone-pixel.jpg"],
    stock: 7,
    description:
      "Smooth, small, honest scuffs on the camera bar. Battery 88%. A strong under-$400 daily.",
    descriptionNe:
      "सजिलो सानो फोन। क्यामेरा बारमा scratch। ब्याट्री ८८%। $४०० मुनि राम्रो रोजाइ।",
    includes: ["Phone", "USB-C cable", "6-month हाम्रो Phone warranty"],
    includesNe: ["फोन", "USB-C केबल", "६ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p16",
    slug: "airpods-pro-2",
    brand: "Apple",
    category: "audio",
    name: "AirPods Pro (2nd gen)",
    nameNe: "एयरपड्स प्रो",
    color: "White",
    colorNe: "सेतो",
    condition: "like-new",
    price: 249,
    originalPrice: 399,
    warrantyMonths: 12,
    image: "/products/earbuds-pro.jpg",
    gallery: ["/products/earbuds-pro.jpg", "/products/earbuds-ivory.jpg"],
    stock: 12,
    featured: true,
    description:
      "Case and buds cleaned, foam tips fresh, ANC and transparency tested. Find My works.",
    descriptionNe:
      "केस र बड सफा, नयाँ टिप, ANC जाँच गरिएको। Find My चल्छ।",
    includes: ["Buds", "Case", "USB-C cable", "Ear tips", "12-month हाम्रो Phone warranty"],
    includesNe: ["बड", "केस", "USB-C केबल", "इयर टिप", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p17",
    slug: "airpods-4",
    brand: "Apple",
    category: "audio",
    name: "AirPods 4",
    nameNe: "एयरपड्स ४",
    color: "Ivory",
    colorNe: "आইभरी",
    condition: "excellent",
    price: 169,
    originalPrice: 249,
    warrantyMonths: 12,
    image: "/products/earbuds-ivory.jpg",
    gallery: ["/products/earbuds-ivory.jpg"],
    stock: 9,
    description:
      "Open-ear buds with light case rub. Sound and stem controls tested. A cheap commute pair.",
    descriptionNe:
      "केसमा हल्का rub। आवाज र कन्ट्रोल ठीक। दैनिक बाटोका लागि सस्तो जोडी।",
    includes: ["Buds", "Case", "Cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["बड", "केस", "केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p18",
    slug: "watch-se-44-starlight",
    brand: "Apple",
    category: "watch",
    name: "Apple Watch SE",
    nameNe: "एपल वाच एसई",
    storage: "44 mm",
    color: "Starlight",
    colorNe: "स्टारलाइट",
    condition: "excellent",
    price: 229,
    originalPrice: 399,
    batteryHealth: 91,
    warrantyMonths: 12,
    image: "/products/watch-silver.jpg",
    gallery: ["/products/watch-silver.jpg", "/products/watch-graphite.jpg"],
    stock: 6,
    featured: true,
    description:
      "GPS model, sport band included. Battery 91%, screen uncracked, pairable with any recent iPhone.",
    descriptionNe:
      "GPS मोडेल, स्पोर्ट ब्यान्ड सहित। ब्याट्री ९१%। आइफोनसँग जोडिन्छ।",
    includes: ["Watch", "Sport band", "Charger", "12-month हाम्रो Phone warranty"],
    includesNe: ["वाच", "स्पोर्ट ब्यान्ड", "चार्जर", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p19",
    slug: "watch-series-9-45",
    brand: "Apple",
    category: "watch",
    name: "Apple Watch Series 9",
    nameNe: "एपल वाच सिरिज ९",
    storage: "45 mm",
    color: "Graphite",
    colorNe: "ग्रेफाइट",
    condition: "good",
    price: 329,
    originalPrice: 649,
    batteryHealth: 88,
    warrantyMonths: 6,
    image: "/products/watch-graphite.jpg",
    gallery: ["/products/watch-graphite.jpg", "/products/watch-silver.jpg"],
    stock: 4,
    description:
      "Always-On screen with light band scratches on the case. Double Tap works. Battery 88%.",
    descriptionNe:
      "Always-On स्क्रिन, केसमा हल्का scratch। Double Tap चल्छ। ब्याट्री ८८%。",
    includes: ["Watch", "Sport band", "Charger", "6-month हाम्रो Phone warranty"],
    includesNe: ["वाच", "स्पोर्ट ब्यान्ड", "चार्जर", "६ महिना हाम्रो Phone वारेन्टी"],
  },
  {
    id: "p20",
    slug: "ipad-10-64-silver",
    brand: "Apple",
    category: "tablet",
    name: "iPad (10th gen)",
    nameNe: "आइप्याड",
    storage: "64 GB",
    color: "Silver",
    colorNe: "सिल्भर",
    condition: "excellent",
    price: 399,
    originalPrice: 649,
    batteryHealth: 95,
    warrantyMonths: 12,
    image: "/products/tablet.jpg",
    gallery: ["/products/tablet.jpg"],
    stock: 5,
    description:
      "Wi-Fi model for school and Zoom. Battery 95%, no screen marks, USB-C charging.",
    descriptionNe:
      "स्कुल र Zoom का लागि Wi-Fi मोडेल। ब्याट्री ९५%, स्क्रिन सफा।",
    includes: ["iPad", "USB-C cable", "12-month हाम्रो Phone warranty"],
    includesNe: ["आइप्याड", "USB-C केबल", "१२ महिना हाम्रो Phone वारेन्टी"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit);
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}
