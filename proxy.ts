import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const ProtectedRoutes = ["/dashboard", "/transaksi"];

export async function proxy(request: NextRequest) {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    const role = session?.user.role;
    const { pathname } = request.nextUrl;

    if (!isLoggedIn && ProtectedRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isLoggedIn && role !== "user" && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (isLoggedIn && pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ['/((?!api/payment/notification|_next/static|_next/image|.*\\.png$).*)'],
}