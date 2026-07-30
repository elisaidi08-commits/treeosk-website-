"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export default function LocaleSwitcher({ onDark = false }: { onDark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const active = onDark ? "text-white" : "text-fg";
  const inactive = onDark
    ? "text-steel-400 hover:text-white"
    : "text-fg-subtle hover:text-fg";

  return (
    <div className="flex items-center text-[12px] font-medium tracking-wide">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1 text-chrome-300">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-current={l === locale ? "true" : undefined}
            className={cn(
              "uppercase transition-colors",
              l === locale ? active : inactive,
            )}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
