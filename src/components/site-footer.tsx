import { Link } from "@tanstack/react-router";
import { Newsletter } from "@/components/newsletter";
import { t } from "@/lib/i18n";
import { useShop } from "@/lib/store";

export function SiteFooter() {
  const lang = useShop((s) => s.lang);
  return (
    <footer className="mt-auto bg-surface">
      <Newsletter />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl text-fg">{t(lang, "storeName")}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            {t(lang, "footerTag")}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">{t(lang, "address")}</p>
          <p className="mt-2 text-sm text-fg">{t(lang, "addressBody")}</p>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted">{t(lang, "hours")}</p>
          <p className="mt-2 text-sm text-fg">{t(lang, "hoursBody")}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">{t(lang, "contact")}</p>
          <p className="mt-2 text-sm text-fg">hello@sastophone.com.au</p>
          <p className="mt-1 text-sm text-fg">04 8123 4400</p>
          <nav className="mt-4 flex flex-col gap-2 text-sm">
            <Link to="/shop" className="text-fg hover:underline">
              {t(lang, "navShop")}
            </Link>
            <Link to="/sell" className="text-fg hover:underline">
              {t(lang, "navSell")}
            </Link>
            <Link to="/about" className="text-fg hover:underline">
              {t(lang, "navAbout")}
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted sm:flex-row sm:justify-between">
          <span>{t(lang, "footerRights")}</span>
          <span>{t(lang, "gstNote")}</span>
        </div>
      </div>
    </footer>
  );
}
