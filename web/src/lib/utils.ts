/** cn — concat de classes conditionnelles (léger, sans dépendance clsx/tailwind-merge). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
