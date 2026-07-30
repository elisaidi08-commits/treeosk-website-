// Next.js 16 : "middleware" est renommé "proxy" (même fonctionnement).
// next-intl gère la négociation de langue et le préfixe /[locale].
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tout sauf api, assets internes et fichiers avec extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
