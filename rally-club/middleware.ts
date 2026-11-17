import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * TEMPORARY SITE MODE
 * ---------------------------------------------------------------------
 * While true, every public page except /events (and its sub-pages, e.g.
 * /events/some-event and its /confirmation page) redirects to /events.
 * /admin and /api are always left alone regardless of this flag, so the
 * admin dashboard and Stripe webhook keep working normally.
 *
 * /legal is also always left alone — the booking form links to
 * /legal/terms as part of its required "I agree to the terms" checkbox,
 * so that page has to stay reachable for the checkbox to mean anything.
 *
 * To bring the rest of the site back, set this to false (or delete this
 * block) and redeploy. Nothing else needs to change.
 */
const EVENTS_ONLY_MODE = true;

const ALWAYS_ALLOWED_PREFIXES = ["/events", "/admin", "/api", "/legal"];

function isAlwaysAllowed(pathname: string): boolean {
  return ALWAYS_ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (EVENTS_ONLY_MODE && !isAlwaysAllowed(pathname)) {
    return NextResponse.redirect(new URL("/events", request.url));
  }

  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAdminRoute =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");

  if (isAdminRoute && !session) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|images/|sitemap.xml|robots.txt).*)"],
};
