import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { t } from "@/lib/i18n";
import { useShop } from "@/lib/store";
import { useHydrated } from "@/lib/use-hydrated";

const EMAIL = /^\S+@\S+\.\S+$/;

export function Newsletter() {
  const lang = useShop((s) => s.lang);
  const subscriber = useShop((s) => s.newsletter);
  const join = useShop((s) => s.joinNewsletter);
  const hydrated = useHydrated();
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const next: { name?: string; email?: string } = {};
    if (!name) next.name = t(lang, "required");
    if (!email || !EMAIL.test(email)) next.email = t(lang, "newsInvalidEmail");
    setErrors(next);
    if (Object.keys(next).length) return;
    join(name, email);
  }

  const done = hydrated && subscriber;

  return (
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-2 md:items-end md:gap-10 md:py-10">
        <div>
          <h2 className="font-sans text-2xl font-extrabold md:text-3xl">{t(lang, "newsTitle")}</h2>
          <p className="mt-2 text-sm leading-relaxed opacity-90 md:text-base">{t(lang, "newsBody")}</p>
        </div>
        {done ? (
          <p className="rounded-2xl bg-primary-foreground/10 px-4 py-4 text-sm font-bold md:text-base">
            {t(lang, "newsDone")}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="news-name" className="text-primary-foreground">
                {t(lang, "newsName")}
              </Label>
              <Input
                id="news-name"
                name="name"
                autoComplete="name"
                className="border-transparent bg-surface text-fg"
              />
              {errors.name && <p className="mt-1 text-xs">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="news-email" className="text-primary-foreground">
                {t(lang, "email")}
              </Label>
              <Input
                id="news-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className="border-transparent bg-surface text-fg"
              />
              {errors.email && <p className="mt-1 text-xs">{errors.email}</p>}
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="min-h-11 sm:col-span-2"
            >
              {t(lang, "newsCta")}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
