import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { baseOne, inter } from "../fonts";
import "../globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ThemeProvider from "@/components/providers/ThemeProvider";
import GrainOverlay from "@/components/providers/GrainOverlay";
import CustomCursor from "@/components/providers/CustomCursor";
import ScrollProgress from "@/components/providers/ScrollProgress";
import RouteTransition from "@/components/providers/RouteTransition";
import MotionToggle from "@/components/providers/MotionToggle";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Treeosk — Memorable experiences. Measurable impact.",
  description:
    "Treeosk designs premium in-store experiences — photobooth, engraving, gaming, scent, kiosks and virtual hostesses — for luxury & beauty brands. Attract, engage, convert.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${baseOne.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-fg antialiased">
        <ThemeProvider>
          <NextIntlClientProvider>
            <SmoothScroll>
              <Header />
              <ScrollProgress />
              {children}
              <GrainOverlay />
              <CustomCursor />
              <MotionToggle />
              <RouteTransition />
            </SmoothScroll>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
