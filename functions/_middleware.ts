/* functions/_middleware.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/*
 * Cloudflare Pages port of src/proxy.ts. Static export disables Next's `proxy`,
 * so the locale routing runs here at the edge instead:
 *
 *   1. Prefixed request  -> rewrites to the flat static route (/en/discord
 *      serves the /discord page) and records the language in the `lang` cookie.
 *   2. Bare request      -> redirects to the visitor's language: the saved
 *      cookie if present, otherwise their Accept-Language, otherwise default.
 *
 * The locale helpers are imported from the same source of truth the app uses,
 * so there is no duplicated language logic.
 */

import {
  LOCALE_PREFIXES,
  isLanguage,
  localeFromPathname,
  matchLanguage,
  parseAcceptLanguage,
  stripLocalePrefix,
} from "../src/i18n/config";

const LANG_COOKIE = "lang";

// A year, in seconds.
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Minimal shape of the Pages Functions context. Avoids a build-time dependency
// on @cloudflare/workers-types; the runtime provides the real object.
interface EventContext {
  request: Request;
  next: (
    input?: Request | string,
    init?: RequestInit,
  ) => Promise<Response>;
}

export const onRequest = async (
  context: EventContext,
): Promise<Response> => {
  const { request, next } = context;

  const url = new URL(request.url);
  const pathname = url.pathname;
  const search = url.search;

  // Pass through Next internals, the API, and any path with a file extension
  // (favicon.png, images, /_next/*, …) — same exclusions as the old matcher.
  const lastSegment = pathname.split("/").pop() ?? "";
  const isAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    lastSegment.includes(".");

  if (isAsset) {
    return next();
  }

  const language = localeFromPathname(pathname);

  // Already localized: serve the flat route, keep the cookie in sync.
  if (language) {
    const flatUrl = new URL(request.url);
    flatUrl.pathname = stripLocalePrefix(pathname);

    const rewritten = await next(new Request(flatUrl.toString(), request));

    const response = new Response(rewritten.body, rewritten);
    response.headers.append(
      "Set-Cookie",
      `${LANG_COOKIE}=${language}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
    );
    return response;
  }

  // Bare path: pick the visitor's language and redirect to the prefixed URL.
  const savedLang = readCookie(request.headers.get("cookie"), LANG_COOKIE);

  const preferred =
    savedLang && isLanguage(savedLang)
      ? savedLang
      : matchLanguage(
          parseAcceptLanguage(request.headers.get("accept-language")),
        );

  const suffix = pathname === "/" ? "" : pathname;

  const target = new URL(request.url);
  target.pathname = `/${LOCALE_PREFIXES[preferred]}${suffix}`;
  target.search = search;

  return Response.redirect(target.toString(), 307);
};

// Reads one cookie value from a raw Cookie header, or null if absent.
function readCookie(
  header: string | null,
  name: string,
): string | null {
  if (!header) return null;

  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}
