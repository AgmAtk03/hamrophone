import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/lib/products";
import { formatAud, savingsPercent } from "@/lib/format";
import { t, type CopyKey } from "@/lib/i18n";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/cn";

const condKey: Record<Product["condition"], CopyKey> = {
  "like-new": "condLikeNew",
  excellent: "condExcellent",
  good: "condGood",
  fair: "condFair",
};

export function ProductCard({ product }: { product: Product }) {
  const lang = useShop((s) => s.lang);
  const wishlist = useShop((s) => s.wishlist);
  const toggle = useShop((s) => s.toggleWishlist);
  const saved = wishlist.includes(product.id);
  const save = savingsPercent(product.price, product.originalPrice);
  const name = lang === "ne" ? product.nameNe : product.name;
  const color = lang === "ne" ? product.colorNe : product.color;

  return (
    <article className="group relative flex flex-col rounded-2xl bg-surface p-2 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[var(--shadow-border-hover)]">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative overflow-hidden rounded-xl bg-bg aspect-portrait">
          <img
            src={product.image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          {save > 0 && (
            <Badge tone="primary" className="absolute left-2 top-2 tabular-nums">
              {t(lang, "save")} {save}%
            </Badge>
          )}
        </div>
      </Link>
      <button
        type="button"
        aria-label={t(lang, "navWishlist")}
        aria-pressed={saved}
        onClick={() => toggle(product.id)}
        className="absolute right-3 top-3 z-10 flex size-11 items-center justify-center rounded-full bg-surface/90 text-fg shadow-[var(--shadow-border)]"
      >
        <Heart className={cn("size-4", saved && "fill-primary text-primary")} />
      </button>
      <div className="flex flex-1 flex-col gap-1 px-2 pb-3 pt-3">
        <p className="text-xs uppercase tracking-wider text-muted">
          {t(lang, condKey[product.condition])}
          {product.storage ? ` · ${product.storage}` : ""}
        </p>
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="font-medium text-fg leading-snug"
        >
          {name}
        </Link>
        <p className="text-sm text-muted">{color}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="font-display text-xl tabular-nums text-fg">
            {formatAud(product.price)}
          </span>
          <span className="text-sm text-muted line-through tabular-nums">
            {formatAud(product.originalPrice)}
          </span>
        </div>
      </div>
    </article>
  );
}
