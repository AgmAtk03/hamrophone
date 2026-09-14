import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SellBanner } from "@/components/sell-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BRANDS,
  CATEGORIES,
  CONDITIONS,
  products,
  type Brand,
  type Category,
  type Condition,
} from "@/lib/products";
import { savingsPercent } from "@/lib/format";
import { t, type CopyKey } from "@/lib/i18n";
import { useShop } from "@/lib/store";
import { cn } from "@/lib/cn";

type Sort = "featured" | "new" | "price-asc" | "price-desc" | "save";

type ShopSearch = {
  q?: string;
  category?: Category;
  brand?: Brand;
  condition?: Condition;
  sort?: Sort;
};

const catKey: Record<Category, CopyKey> = {
  iphone: "catIphone",
  android: "catAndroid",
  audio: "catAudio",
  watch: "catWatch",
  tablet: "catTablet",
};
const condKey: Record<Condition, CopyKey> = {
  "like-new": "condLikeNew",
  excellent: "condExcellent",
  good: "condGood",
  fair: "condFair",
};

function parseSearch(s: Record<string, unknown>): ShopSearch {
  const cat = s.category;
  const brand = s.brand;
  const condition = s.condition;
  const sort = s.sort;
  return {
    q: typeof s.q === "string" ? s.q : undefined,
    category: CATEGORIES.includes(cat as Category) ? (cat as Category) : undefined,
    brand: BRANDS.includes(brand as Brand) ? (brand as Brand) : undefined,
    condition: CONDITIONS.includes(condition as Condition) ? (condition as Condition) : undefined,
    sort:
      sort === "featured" ||
      sort === "new" ||
      sort === "price-asc" ||
      sort === "price-desc" ||
      sort === "save"
        ? sort
        : undefined,
  };
}

export const Route = createFileRoute("/shop")({
  validateSearch: parseSearch,
  component: ShopPage,
});

function ShopPage() {
  const lang = useShop((s) => s.lang);
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);

  function patch(next: Partial<ShopSearch>) {
    navigate({
      search: (prev) => {
        const merged = { ...prev, ...next };
        for (const k of Object.keys(merged) as (keyof ShopSearch)[]) {
          if (merged[k] === undefined) delete merged[k];
        }
        return merged;
      },
    });
  }

  const list = useMemo(() => {
    let rows = [...products];
    if (search.q) {
      const q = search.q.toLowerCase();
      rows = rows.filter((p) =>
        `${p.name} ${p.nameNe} ${p.color} ${p.storage ?? ""} ${p.brand}`.toLowerCase().includes(q),
      );
    }
    if (search.category) rows = rows.filter((p) => p.category === search.category);
    if (search.brand) rows = rows.filter((p) => p.brand === search.brand);
    if (search.condition) rows = rows.filter((p) => p.condition === search.condition);
    const sort = search.sort ?? "featured";
    rows.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "save")
        return (
          savingsPercent(b.price, b.originalPrice) - savingsPercent(a.price, a.originalPrice)
        );
      if (sort === "new") return b.id.localeCompare(a.id);
      return Number(!!b.featured) - Number(!!a.featured) || a.price - b.price;
    });
    return rows;
  }, [search]);

  const hasFilters = Boolean(search.q || search.category || search.brand || search.condition);

  const filterBody = (
    <div className="flex flex-col gap-6">
      <FilterGroup label={t(lang, "category")}>
        {CATEGORIES.map((c) => (
          <Chip
            key={c}
            active={search.category === c}
            onClick={() => patch({ category: search.category === c ? undefined : c })}
          >
            {t(lang, catKey[c])}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label={t(lang, "brand")}>
        {BRANDS.map((b) => (
          <Chip
            key={b}
            active={search.brand === b}
            onClick={() => patch({ brand: search.brand === b ? undefined : b })}
          >
            {b}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup label={t(lang, "condition")}>
        {CONDITIONS.map((c) => (
          <Chip
            key={c}
            active={search.condition === c}
            onClick={() => patch({ condition: search.condition === c ? undefined : c })}
          >
            {t(lang, condKey[c])}
          </Chip>
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-fg">{t(lang, "navShop")}</h1>
          <p className="mt-1 text-sm text-muted tabular-nums">
            {list.length} {t(lang, "results")}
          </p>
        </div>
        <form
          className="flex w-full max-w-sm gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            patch({ q: String(fd.get("q") || "") || undefined });
          }}
        >
          <Input
            name="q"
            defaultValue={search.q ?? ""}
            placeholder={t(lang, "searchPlaceholder")}
            aria-label={t(lang, "search")}
          />
        </form>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={() => setFiltersOpen((v) => !v)}
        >
          <SlidersHorizontal className="size-4" />
          {t(lang, "filters")}
        </Button>
        <label className="flex items-center gap-2 text-sm text-muted">
          <span>{t(lang, "sort")}</span>
          <select
            className="h-11 rounded-full border border-border bg-surface px-3 text-sm text-fg"
            value={search.sort ?? "featured"}
            onChange={(e) => patch({ sort: e.target.value as Sort })}
          >
            <option value="featured">{t(lang, "sortFeatured")}</option>
            <option value="new">{t(lang, "sortNew")}</option>
            <option value="price-asc">{t(lang, "sortPriceAsc")}</option>
            <option value="price-desc">{t(lang, "sortPriceDesc")}</option>
            <option value="save">{t(lang, "sortSave")}</option>
          </select>
        </label>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={() => navigate({ search: {} })}>
            <X className="size-4" />
            {t(lang, "clearFilters")}
          </Button>
        )}
      </div>

      {filtersOpen && <div className="mt-4 rounded-2xl bg-surface p-4 md:hidden">{filterBody}</div>}

      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">{filterBody}</aside>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <p className="text-fg">{t(lang, "noResults")}</p>
            <Button className="mt-4" variant="outline" onClick={() => navigate({ search: {} })}>
              {t(lang, "clearFilters")}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12">
        <SellBanner />
      </div>
    </main>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-widest text-muted">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 min-h-9 rounded-full px-3 text-sm transition-colors duration-150",
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-fg hover:bg-secondary/70",
      )}
    >
      {children}
    </button>
  );
}

