import { cn } from "@/lib/cn";

type Variant = "primary" | "brass" | "chrome" | "secondary" | "onDark" | "ghost";
type Size = "default" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "leading-none transition-[background-color,color,filter,border-color] duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-canvas select-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  default: "text-[15px] h-11 px-6 md:h-[54px] md:px-7",
  sm: "text-[14px] h-10 px-5",
};

const variants: Record<Variant, string> = {
  // Inverse du canvas (noir sur clair / clair sur sombre) — thémable.
  primary: "bg-inverse text-inverse-fg hover:opacity-90",
  // CTA principal — contour laiton (jamais d'aplat).
  brass: "border border-brass text-brass bg-transparent hover:border-brass-hover hover:text-brass-hover hover:bg-brass/[0.06]",
  // Signature premium : gradient chrome. 1 seul par vue (identique dans les 2 thèmes).
  chrome:
    "bg-chrome text-ink border border-chrome-300 hover:brightness-[0.94] shadow-sh1",
  // Surface bordée hairline — thémable.
  secondary:
    "bg-surface text-fg border border-hairline hover:border-chrome-300",
  // Sur fond sombre (fenêtres immersives, thème dark).
  onDark:
    "bg-transparent text-white border border-chrome-300 hover:bg-white/10",
  // Lien souligné (garde la hauteur pour l'alignement vertical avec un CTA voisin).
  ghost:
    "text-fg underline underline-offset-4 decoration-1 decoration-chrome-300 hover:text-fg-muted hover:decoration-fg-muted",
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  size = "default",
  href,
  className,
  children,
  ...props
}: Props) {
  const classes = cn(base, sizes[size], variants[variant], className);
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
