import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

const serviceSlugs = new Set(["website-development", "landing-pages", "seo-optimization"]);
const legalDocuments = new Set(["privacy", "terms", "cookies"]);

function resolveLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (acceptLanguage.includes("ka")) return "ka";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    const segments = pathname.split("/").filter(Boolean);
    if (
      segments.length === 3 &&
      ((segments[1] === "services" && !serviceSlugs.has(segments[2])) ||
        (segments[1] === "legal" && !legalDocuments.has(segments[2])))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/__flevio_not_found__";
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  if (pathname.includes(".")) return NextResponse.next();

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|videos|favicon.ico|__flevio_not_found__).*)"],
};
