import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 min-h-11">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-sans text-lg font-extrabold leading-none">
        ह
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-sans text-xl font-extrabold text-fg">हाम्रो</span>
        <span className="mt-0.5 text-xs font-bold tracking-widest text-muted">Phone</span>
      </span>
    </Link>
  );
}
