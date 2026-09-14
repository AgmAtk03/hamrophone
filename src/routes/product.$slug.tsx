import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, Shield, Smartphone, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";
import { SellBanner } from "@/components/sell-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatAud, savingsPercent } from "@/lib/format";
import { t, type CopyKey } from "@/lib/i18n";
import { getProduct, relatedProducts, type Product } from "@/lib/products";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
});

const condKey: Record<Product["condition"], CopyKey> = {
  "like-new": "condLikeNew",
  excellent: "condExcellent",
  good: "condGood",
  fair: "condFair",
};

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const lang = useShop((s) => s.lang);
  const addToCart = useShop((s) => s.addToCart);
  const toggle = useShop((s) => s.toggleWishlist);
  const wishlist = useShop((s) => s.wishlist);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl">{t(lang, "noResults")}</h1>
        <Button asChild className="mt-6">
          <Link to="/shop">{t(lang, "browse")}</Link>
        </Button>
      </main>
    );
  }

  const name = lang === "ne" ? product.nameNe : product.name;
  const color = lang === "ne" ? product.colorNe : product.color;
  const desc = lang === "ne" ? product.descriptionNe : product.description;
  const includes = lang === "ne" ? product.includesNe : product.includes;
  const save = savingsPercent(product.price, product.originalPrice);
  const saved = wishlist.includes(product.id);
  const related = relatedProducts(product);
  const productId = product.id;

  function add() {
    addToCart(productId);
    toast.success(t(lang, "added"));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-sm text-muted">
        <Link to="/shop" className="hover:text-fg">
          {t(lang, "navShop")}
        </Link>
        <span className="mx-2">/</span>
        <span>{name}</span>
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 md:gap-8">
        <div>
          <div className="overflow-hidden rounded-2xl bg-surface p-1 shadow-[var(--shadow-border)] md:p-2">
            <img
              src={product.gallery[active] ?? product.image}
              alt={name}
              className="aspect-square w-full rounded-xl object-cover md:aspect-portrait"
            />
          </div>
          {product.gallery.length > 1 && (
            <div className="mt-2 flex gap-1.5 md:mt-3 md:gap-2">
              {product.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${name} ${i + 1}`}
                  aria-current={i === active}
                  className={cn(
                    "size-11 overflow-hidden rounded-lg p-0.5 md:size-16",
                    i === active ? "bg-primary" : "bg-border",
                  )}
                >
                  <img src={src} alt="" className="size-full rounded-md object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted">
            {product.brand} · {t(lang, condKey[product.condition])}
          </p>
          <h1 className="mt-1 font-display text-lg leading-tight text-fg md:mt-2 md:text-4xl">{name}</h1>
          <p className="mt-1 text-xs text-muted md:text-base">
            {color}
            {product.storage ? ` · ${product.storage}` : ""}
          </p>

          <div className="mt-3 flex flex-wrap items-baseline gap-2 md:mt-5 md:gap-3">
            <span className="font-display text-2xl tabular-nums md:text-4xl">{formatAud(product.price)}</span>
            <span className="text-sm text-muted line-through tabular-nums md:text-base">
              {formatAud(product.originalPrice)}
            </span>
            {save > 0 && (
              <Badge tone="primary">
                {t(lang, "save")} {save}%
              </Badge>
            )}
          </div>
          <p className="mt-1 text-xs text-muted md:mt-2">{t(lang, "gstNote")}</p>

          <div className="mt-4 flex flex-col gap-2 md:mt-6 md:flex-row md:gap-3">
            <Button className="flex-1" size="lg" onClick={add} disabled={product.stock === 0}>
              {product.stock === 0 ? t(lang, "soldOut") : t(lang, "addToCart")}
            </Button>
            <Button
              className="flex-1"
              size="lg"
              variant="secondary"
              onClick={() => {
                add();
                navigate({ to: "/checkout" });
              }}
              disabled={product.stock === 0}
            >
              {t(lang, "buyNow")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              aria-pressed={saved}
              aria-label={t(lang, "navWishlist")}
              onClick={() => toggle(product.id)}
            >
              <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
            </Button>
          </div>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
        {product.batteryHealth != null && (
          <div className="rounded-xl bg-surface px-2 py-3 shadow-[var(--shadow-border)]">
            <dt className="text-xs text-muted">{t(lang, "battery")}</dt>
            <dd className="mt-1 font-display text-lg tabular-nums">{product.batteryHealth}%</dd>
          </div>
        )}
        <div className="rounded-xl bg-surface px-2 py-3 shadow-[var(--shadow-border)]">
          <dt className="text-xs text-muted">{t(lang, "warranty")}</dt>
          <dd className="mt-1 font-display text-lg tabular-nums">
            {product.warrantyMonths} {t(lang, "months")}
          </dd>
        </div>
        <div className="rounded-xl bg-surface px-2 py-3 shadow-[var(--shadow-border)]">
          <dt className="text-xs text-muted">{t(lang, "inStock")}</dt>
          <dd className="mt-1 font-display text-lg tabular-nums">
            {product.stock} {t(lang, "left")}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-sm leading-relaxed text-fg">{desc}</p>

      <ul className="mt-6 space-y-2 text-sm text-muted">
        <li className="flex items-center gap-2">
          <Shield className="size-4 text-primary" />
          {t(lang, "trustWarranty")}
        </li>
        <li className="flex items-center gap-2">
          <Truck className="size-4 text-primary" />
          {t(lang, "trustPost")}
        </li>
        <li className="flex items-center gap-2">
          <Smartphone className="size-4 text-primary" />
          {t(lang, "trustImei")}
        </li>
      </ul>

      <div className="mt-8">
        <h2 className="text-xs uppercase tracking-widest text-muted">{t(lang, "includes")}</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl">{t(lang, "related")}</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-16">
        <SellBanner />
      </div>
    </main>
  );
}
